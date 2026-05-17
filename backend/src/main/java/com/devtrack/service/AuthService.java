package com.devtrack.service;

import com.devtrack.dto.AuthResponse;
import com.devtrack.dto.LoginRequest;
import com.devtrack.dto.RegisterRequest;
import com.devtrack.exception.BadRequestException;
import com.devtrack.model.Role;
import com.devtrack.model.User;
import com.devtrack.repository.UserRepository;
import com.devtrack.security.JwtService;
import com.devtrack.util.MapperUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtService jwtService;

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        if (userRepository.existsByEmail(normalizedEmail)) {
            throw new BadRequestException("Email is already registered");
        }

        User user = User.builder()
                .name(request.name().trim())
                .email(normalizedEmail)
                .password(passwordEncoder.encode(request.password()))
                .role(request.role() == null ? Role.USER : request.role())
                .build();
        User saved = userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(saved.getEmail());
        String token = jwtService.generateToken(userDetails);
        return AuthResponse.bearer(token, MapperUtil.toUserResponse(saved));
    }

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.email().trim().toLowerCase();
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(normalizedEmail, request.password())
        );

        User user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new BadRequestException("Invalid email or password"));
        UserDetails userDetails = userDetailsService.loadUserByUsername(normalizedEmail);
        String token = jwtService.generateToken(userDetails);
        return AuthResponse.bearer(token, MapperUtil.toUserResponse(user));
    }
}

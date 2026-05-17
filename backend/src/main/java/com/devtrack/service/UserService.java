package com.devtrack.service;

import com.devtrack.dto.UserResponse;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.model.User;
import com.devtrack.repository.UserRepository;
import com.devtrack.util.MapperUtil;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    @Transactional(readOnly = true)
    public User getCurrentUser(Authentication authentication) {
        return userRepository.findByEmail(authentication.getName())
                .orElseThrow(() -> new ResourceNotFoundException("Current user not found"));
    }

    @Transactional(readOnly = true)
    public UserResponse getProfile(Authentication authentication) {
        return MapperUtil.toUserResponse(getCurrentUser(authentication));
    }

    @Transactional(readOnly = true)
    public List<UserResponse> findAllUsers() {
        return userRepository.findAll()
                .stream()
                .map(MapperUtil::toUserResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public User findById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + id));
    }
}

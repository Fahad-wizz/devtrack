package com.devtrack.dto;

import com.devtrack.model.Role;
import java.time.Instant;

public record UserResponse(
        Long id,
        String name,
        String email,
        Role role,
        Instant createdAt
) {
}

package com.devtrack.dto;

import java.time.Instant;

public record ApiResponse(
        boolean success,
        String message,
        Instant timestamp
) {
    public static ApiResponse of(boolean success, String message) {
        return new ApiResponse(success, message, Instant.now());
    }
}

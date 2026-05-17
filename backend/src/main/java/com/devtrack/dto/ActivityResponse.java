package com.devtrack.dto;

import com.devtrack.model.TaskStatus;
import java.time.Instant;

public record ActivityResponse(
        Long taskId,
        String title,
        TaskStatus status,
        Instant updatedAt
) {
}

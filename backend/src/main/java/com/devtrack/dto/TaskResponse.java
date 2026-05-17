package com.devtrack.dto;

import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import java.time.Instant;
import java.time.LocalDate;

public record TaskResponse(
        Long id,
        String title,
        String description,
        TaskPriority priority,
        TaskStatus status,
        LocalDate dueDate,
        UserResponse assignedUser,
        Instant createdAt,
        Instant updatedAt
) {
}

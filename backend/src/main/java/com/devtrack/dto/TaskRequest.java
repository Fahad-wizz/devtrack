package com.devtrack.dto;

import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;

public record TaskRequest(
        @NotBlank @Size(max = 180) String title,
        @Size(max = 5000) String description,
        @NotNull TaskPriority priority,
        @NotNull TaskStatus status,
        LocalDate dueDate,
        Long assignedUserId
) {
}

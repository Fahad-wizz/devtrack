package com.devtrack.util;

import com.devtrack.dto.ActivityResponse;
import com.devtrack.dto.TaskResponse;
import com.devtrack.dto.UserResponse;
import com.devtrack.model.Task;
import com.devtrack.model.User;

public final class MapperUtil {

    private MapperUtil() {
    }

    public static UserResponse toUserResponse(User user) {
        if (user == null) {
            return null;
        }
        return new UserResponse(user.getId(), user.getName(), user.getEmail(), user.getRole(), user.getCreatedAt());
    }

    public static TaskResponse toTaskResponse(Task task) {
        return new TaskResponse(
                task.getId(),
                task.getTitle(),
                task.getDescription(),
                task.getPriority(),
                task.getStatus(),
                task.getDueDate(),
                toUserResponse(task.getAssignedUser()),
                task.getCreatedAt(),
                task.getUpdatedAt()
        );
    }

    public static ActivityResponse toActivityResponse(Task task) {
        return new ActivityResponse(task.getId(), task.getTitle(), task.getStatus(), task.getUpdatedAt());
    }
}

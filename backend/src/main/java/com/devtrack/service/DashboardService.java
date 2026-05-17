package com.devtrack.service;

import com.devtrack.dto.DashboardStatsResponse;
import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import com.devtrack.repository.TaskRepository;
import com.devtrack.util.MapperUtil;
import java.util.Arrays;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final TaskRepository taskRepository;

    @Transactional(readOnly = true)
    public DashboardStatsResponse getStats() {
        Map<String, Long> priorities = Arrays.stream(TaskPriority.values())
                .collect(Collectors.toMap(Enum::name, taskRepository::countByPriority));

        return new DashboardStatsResponse(
                taskRepository.count(),
                taskRepository.countByStatus(TaskStatus.COMPLETED),
                taskRepository.countByStatus(TaskStatus.PENDING),
                taskRepository.countByStatus(TaskStatus.IN_PROGRESS),
                priorities,
                taskRepository.findTop6ByOrderByUpdatedAtDesc().stream()
                        .map(MapperUtil::toActivityResponse)
                        .toList()
        );
    }
}

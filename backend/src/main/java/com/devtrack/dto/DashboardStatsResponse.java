package com.devtrack.dto;

import java.util.List;
import java.util.Map;

public record DashboardStatsResponse(
        long totalTasks,
        long completedTasks,
        long pendingTasks,
        long inProgressTasks,
        Map<String, Long> tasksByPriority,
        List<ActivityResponse> recentActivities
) {
}

package com.devtrack.repository;

import com.devtrack.model.Task;
import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

public interface TaskRepository extends JpaRepository<Task, Long>, JpaSpecificationExecutor<Task> {
    long countByStatus(TaskStatus status);

    long countByPriority(TaskPriority priority);

    List<Task> findTop6ByOrderByUpdatedAtDesc();
}

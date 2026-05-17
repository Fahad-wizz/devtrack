package com.devtrack.service;

import com.devtrack.dto.TaskRequest;
import com.devtrack.dto.TaskResponse;
import com.devtrack.exception.ResourceNotFoundException;
import com.devtrack.model.Task;
import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import com.devtrack.model.User;
import com.devtrack.repository.TaskRepository;
import com.devtrack.util.MapperUtil;
import jakarta.persistence.criteria.Predicate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserService userService;

    @Transactional(readOnly = true)
    public Page<TaskResponse> findTasks(
            String search,
            TaskStatus status,
            TaskPriority priority,
            Long assignedUserId,
            Pageable pageable
    ) {
        return taskRepository.findAll(buildSpecification(search, status, priority, assignedUserId), pageable)
                .map(MapperUtil::toTaskResponse);
    }

    @Transactional(readOnly = true)
    public TaskResponse findById(Long id) {
        return MapperUtil.toTaskResponse(findTask(id));
    }

    @Transactional
    public TaskResponse create(TaskRequest request) {
        Task task = Task.builder()
                .title(request.title().trim())
                .description(request.description())
                .priority(request.priority())
                .status(request.status())
                .dueDate(request.dueDate())
                .assignedUser(resolveAssignedUser(request.assignedUserId()))
                .build();

        Task saved = taskRepository.save(task);
        log.info("Created task {} assigned to {}", saved.getId(), assignedEmail(saved));
        return MapperUtil.toTaskResponse(saved);
    }

    @Transactional
    public TaskResponse update(Long id, TaskRequest request) {
        Task task = findTask(id);
        task.setTitle(request.title().trim());
        task.setDescription(request.description());
        task.setPriority(request.priority());
        task.setStatus(request.status());
        task.setDueDate(request.dueDate());
        task.setAssignedUser(resolveAssignedUser(request.assignedUserId()));

        Task saved = taskRepository.save(task);
        log.info("Updated task {}", saved.getId());
        return MapperUtil.toTaskResponse(saved);
    }

    @Transactional
    public void delete(Long id) {
        Task task = findTask(id);
        taskRepository.delete(task);
        log.info("Deleted task {}", id);
    }

    private Task findTask(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id " + id));
    }

    private User resolveAssignedUser(Long assignedUserId) {
        return assignedUserId == null ? null : userService.findById(assignedUserId);
    }

    private Specification<Task> buildSpecification(
            String search,
            TaskStatus status,
            TaskPriority priority,
            Long assignedUserId
    ) {
        return (root, query, criteriaBuilder) -> {
            List<Predicate> predicates = new ArrayList<>();

            if (StringUtils.hasText(search)) {
                String pattern = "%" + search.toLowerCase().trim() + "%";
                predicates.add(criteriaBuilder.or(
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("title")), pattern),
                        criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), pattern)
                ));
            }

            if (status != null) {
                predicates.add(criteriaBuilder.equal(root.get("status"), status));
            }

            if (priority != null) {
                predicates.add(criteriaBuilder.equal(root.get("priority"), priority));
            }

            if (assignedUserId != null) {
                predicates.add(criteriaBuilder.equal(root.get("assignedUser").get("id"), assignedUserId));
            }

            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
        };
    }

    private String assignedEmail(Task task) {
        return task.getAssignedUser() == null ? "unassigned" : task.getAssignedUser().getEmail();
    }
}

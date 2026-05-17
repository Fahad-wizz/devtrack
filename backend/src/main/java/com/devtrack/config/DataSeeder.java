package com.devtrack.config;

import com.devtrack.model.Role;
import com.devtrack.model.Task;
import com.devtrack.model.TaskPriority;
import com.devtrack.model.TaskStatus;
import com.devtrack.model.User;
import com.devtrack.repository.TaskRepository;
import com.devtrack.repository.UserRepository;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;

    @Value("${devtrack.seed.enabled:true}")
    private boolean seedEnabled;

    @Override
    public void run(String... args) {
        if (!seedEnabled || userRepository.count() > 0) {
            return;
        }

        User admin = userRepository.save(User.builder()
                .name("DevTrack Admin")
                .email("admin@devtrack.local")
                .password(passwordEncoder.encode("admin123"))
                .role(Role.ADMIN)
                .build());

        User user = userRepository.save(User.builder()
                .name("Alex Developer")
                .email("user@devtrack.local")
                .password(passwordEncoder.encode("user123"))
                .role(Role.USER)
                .build());

        taskRepository.saveAll(List.of(
                Task.builder()
                        .title("Design authentication flow")
                        .description("Wire JWT login, refresh-safe storage, and protected routes.")
                        .priority(TaskPriority.HIGH)
                        .status(TaskStatus.IN_PROGRESS)
                        .dueDate(LocalDate.now().plusDays(2))
                        .assignedUser(admin)
                        .build(),
                Task.builder()
                        .title("Create dashboard analytics")
                        .description("Show task counts, priority spread, and recent activity.")
                        .priority(TaskPriority.MEDIUM)
                        .status(TaskStatus.PENDING)
                        .dueDate(LocalDate.now().plusDays(5))
                        .assignedUser(user)
                        .build(),
                Task.builder()
                        .title("Document API endpoints")
                        .description("Publish run instructions and Postman-friendly examples.")
                        .priority(TaskPriority.LOW)
                        .status(TaskStatus.COMPLETED)
                        .dueDate(LocalDate.now().minusDays(1))
                        .assignedUser(admin)
                        .build()
        ));

        log.info("Seeded DevTrack demo users: admin@devtrack.local/admin123 and user@devtrack.local/user123");
    }
}

# DevTrack

DevTrack is a production-style full-stack task and workflow management system built with Spring Boot, Spring Security, JWT, MySQL, React, Tailwind CSS, and Axios.

## Features

- User registration and login with JWT authentication
- BCrypt password encryption
- Role-based access with `ADMIN` and `USER`
- Task CRUD with priority, status, assignee, due date, search, filters, and pagination
- Dashboard analytics and recent activity
- Responsive React UI with dark/light theme, sidebar navigation, loading states, and toast notifications
- Global backend exception handling, validation, logging, Swagger/OpenAPI, Docker support, and seed data

## Tech Stack

Backend: Java 17, Spring Boot, Spring Security, Spring Data JPA, Hibernate, MySQL, Maven, Lombok, Validation, Springdoc OpenAPI.

Frontend: React, Vite, Tailwind CSS, Axios, React Router DOM, Context API, React Hot Toast, Lucide icons.

## Project Structure

```text
src/main/java/com/devtrack
├── config
├── controller
├── dto
├── exception
├── model
├── repository
├── security
├── service
└── util

frontend/src
├── components
├── context
├── pages
├── routes
├── services
└── utils
```

## Run Locally

1. Create the database:

```sql
CREATE DATABASE devtrack;
```

2. Configure backend environment variables or edit `src/main/resources/application.properties`.

```bash
DB_USERNAME=root
DB_PASSWORD=password
JWT_SECRET=replace-with-a-strong-256-bit-secret
```

3. Start the backend:

```bash
./mvnw spring-boot:run
```

Backend runs at `http://localhost:8080`.

4. Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at `http://localhost:3000`.

Seeded accounts:

- `admin@devtrack.local` / `admin123`
- `user@devtrack.local` / `user123`

## Docker

```bash
docker compose up --build
```

Frontend: `http://localhost:3000`

Backend: `http://localhost:8080`

Swagger: `http://localhost:8080/swagger-ui.html`

## API Documentation

See [docs/API.md](docs/API.md) or open Swagger UI after starting the backend.

## Database

The JPA entities create/update the schema automatically by default. A manual schema is available in [schema.sql](schema.sql).

## Useful Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/users/me`
- `GET /api/tasks`
- `POST /api/tasks`
- `PUT /api/tasks/{id}`
- `DELETE /api/tasks/{id}`
- `GET /api/dashboard/stats`

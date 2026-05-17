# DevTrack API

Base URL: `http://localhost:8080/api`

Swagger UI: `http://localhost:8080/swagger-ui.html`

## Authentication

### Register

`POST /auth/register`

```json
{
  "name": "Taylor Admin",
  "email": "taylor@example.com",
  "password": "secret123",
  "role": "ADMIN"
}
```

### Login

`POST /auth/login`

```json
{
  "email": "admin@devtrack.local",
  "password": "admin123"
}
```

Use the returned token as `Authorization: Bearer <token>`.

## Users

`GET /users/me` returns the current profile.

`GET /users` returns all users and requires the `ADMIN` role.

## Tasks

`GET /tasks?page=0&size=10&search=api&status=PENDING&priority=HIGH`

`GET /tasks/{id}`

`POST /tasks`

```json
{
  "title": "Fix login validation",
  "description": "Return meaningful validation errors to the frontend.",
  "priority": "HIGH",
  "status": "PENDING",
  "dueDate": "2026-05-30",
  "assignedUserId": 1
}
```

`PUT /tasks/{id}` uses the same body as create.

`DELETE /tasks/{id}` requires the `ADMIN` role.

## Dashboard

`GET /dashboard/stats`

Returns total, completed, pending, in-progress counts, task counts by priority, and recent activity.

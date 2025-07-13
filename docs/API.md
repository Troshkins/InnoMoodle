# InnoMoodle API Documentation

## Overview

InnoMoodle is a learning management system API that provides endpoints for managing users, courses, quizzes, and study groups.

**Base URL**: `http://localhost:8080/api`

## Authentication

The API uses JWT (JSON Web Token) authentication. Most endpoints require authentication via the `Authorization` header.

### Login

**POST** `/api/login`

Authenticate a user and receive a JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Usage:**
```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "password": "password123"}'
```

### Using Authentication

Include the JWT token in the `Authorization` header for protected endpoints:

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  http://localhost:8080/api/users/1
```

## Users

### Create User

**POST** `/api/users`

Create a new user account.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "student"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "status": "active",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Get User

**GET** `/api/users/{id}`

Retrieve a user by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "status": "active",
  "avatar": "https://example.com/avatar.jpg",
  "bio": "Student bio",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Update User

**PUT** `/api/users/{id}`

Update an existing user.

**Request Body:**
```json
{
  "name": "John Updated",
  "email": "john.updated@example.com",
  "bio": "Updated bio"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "John Updated",
  "email": "john.updated@example.com",
  "role": "student",
  "status": "active",
  "bio": "Updated bio",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T11:00:00Z"
}
```

### Delete User

**DELETE** `/api/users/{id}`

Delete a user account.

**Response:** `204 No Content`

## Courses

### Create Course

**POST** `/api/courses`

Create a new course.

**Request Body:**
```json
{
  "name": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "completeness": 0,
  "status": "draft"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "completeness": 0,
  "status": "draft",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Get Course

**GET** `/api/courses/{id}`

Retrieve a course by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Introduction to Programming",
  "description": "Learn the basics of programming",
  "completeness": 75,
  "status": "published",
  "image_url": "https://example.com/course-image.jpg",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Update Course

**PUT** `/api/courses/{id}`

Update an existing course.

**Request Body:**
```json
{
  "name": "Advanced Programming",
  "description": "Advanced programming concepts",
  "completeness": 100,
  "status": "published"
}
```

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Advanced Programming",
  "description": "Advanced programming concepts",
  "completeness": 100,
  "status": "published",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T11:00:00Z"
}
```

### Delete Course

**DELETE** `/api/courses/{id}`

Delete a course.

**Response:** `204 No Content`

## Quizzes

### Create Quiz

**POST** `/api/quizzes`

Create a new quiz.

**Request Body:**
```json
{
  "name": "Programming Quiz",
  "description": "Test your programming knowledge",
  "start": "2024-01-01T10:00:00Z",
  "end": "2024-01-01T12:00:00Z",
  "returnable": true,
  "random": false,
  "time_limit": 60,
  "results_shown": true,
  "try_count": 3,
  "filling_id": 1,
  "status": "draft"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Programming Quiz",
  "description": "Test your programming knowledge",
  "start": "2024-01-01T10:00:00Z",
  "end": "2024-01-01T12:00:00Z",
  "returnable": true,
  "random": false,
  "time_limit": 60,
  "results_shown": true,
  "try_count": 3,
  "filling_id": 1,
  "status": "draft",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

### Get Quiz

**GET** `/api/quizzes/{id}`

Retrieve a quiz by ID.

**Response:** `200 OK`
```json
{
  "id": 1,
  "name": "Programming Quiz",
  "description": "Test your programming knowledge",
  "start": "2024-01-01T10:00:00Z",
  "end": "2024-01-01T12:00:00Z",
  "returnable": true,
  "random": false,
  "time_limit": 60,
  "results_shown": true,
  "try_count": 3,
  "filling_id": 1,
  "status": "active",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

## Study Groups

### Create Study Group

**POST** `/api/groups`

Create a new study group.

**Request Body:**
```json
{
  "name": "Programming Study Group",
  "description": "Group for programming students",
  "status": "active"
}
```

**Response:** `201 Created`
```json
{
  "id": 1,
  "name": "Programming Study Group",
  "description": "Group for programming students",
  "status": "active",
  "created_at": "2024-01-01T10:00:00Z",
  "updated_at": "2024-01-01T10:00:00Z"
}
```

## Data Models

### User Model
```json
{
  "id": "integer",
  "name": "string",
  "email": "string",
  "password": "string (hidden in responses)",
  "role": "student|teacher|admin",
  "status": "active|inactive|suspended",
  "avatar": "string (optional)",
  "bio": "string (optional)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Course Model
```json
{
  "id": "integer",
  "name": "string",
  "description": "string (optional)",
  "completeness": "integer (0-100)",
  "status": "draft|published|archived",
  "image_url": "string (optional)",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Quiz Model
```json
{
  "id": "integer",
  "name": "string",
  "description": "string (optional)",
  "start": "datetime (optional)",
  "end": "datetime (optional)",
  "returnable": "boolean",
  "random": "boolean",
  "time_limit": "integer (minutes)",
  "results_shown": "boolean",
  "try_count": "integer",
  "filling_id": "integer",
  "status": "draft|active|inactive|archived",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Study Group Model
```json
{
  "id": "integer",
  "name": "string",
  "description": "string (optional)",
  "status": "active|inactive|archived",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid request payload"
}
```

### 401 Unauthorized
```json
{
  "error": "Missing or invalid Authorization header"
}
```

### 403 Forbidden
```json
{
  "error": "Forbidden"
}
```

### 404 Not Found
```json
{
  "error": "User not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Internal server error"
}
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created successfully
- `204 No Content` - Request successful, no content returned
- `400 Bad Request` - Invalid request data
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Insufficient permissions
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

## Rate Limiting

Currently, no rate limiting is implemented. Consider implementing rate limiting for production use.

## Versioning

This is version 1.0 of the API. Future versions will be available at `/api/v2/`, etc.
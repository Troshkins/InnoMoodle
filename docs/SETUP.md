# InnoMoodle Setup and Usage Guide

## Prerequisites

Before setting up InnoMoodle, ensure you have the following installed:

- **Go** (version 1.24.4 or higher)
- **PostgreSQL** (version 12 or higher)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd InnoMoodle
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=innomoodle

# Server Configuration
SERVER_PORT=8080

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Database Setup

#### Option A: Using Docker (Recommended)

```bash
# Start PostgreSQL with Docker
docker run --name innomoodle-postgres \
  -e POSTGRES_DB=innomoodle \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=your_password \
  -p 5432:5432 \
  -d postgres:15

# Wait for the database to be ready
sleep 10
```

#### Option B: Local PostgreSQL Installation

1. Install PostgreSQL on your system
2. Create a database:
   ```sql
   CREATE DATABASE innomoodle;
   ```

#### Initialize Database Schema

```bash
# Run the database initialization script
psql -h localhost -U postgres -d innomoodle -f db/init/init.sql
```

### 4. Install Dependencies

```bash
# Install Go dependencies
cd backend
go mod tidy
```

### 5. Run the Application

```bash
# From the backend directory
go run main.go
```

The server will start on `http://localhost:8080`

## Project Structure

```
InnoMoodle/
├── backend/                 # Go backend application
│   ├── handlers/           # HTTP handlers
│   ├── models/             # Data models
│   ├── repository/         # Data access layer
│   ├── services/           # Business logic layer
│   ├── db/                 # Database connection
│   ├── main.go             # Application entry point
│   └── go.mod              # Go dependencies
├── frontend/               # Frontend application
├── docs/                   # Documentation
├── db/                     # Database scripts
└── docker-compose.yml      # Docker configuration
```

## API Testing

### Using curl

#### 1. Create a User

```bash
curl -X POST http://localhost:8080/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

#### 2. Login

```bash
curl -X POST http://localhost:8080/api/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

#### 3. Create a Course (with authentication)

```bash
# Replace YOUR_JWT_TOKEN with the token from login
curl -X POST http://localhost:8080/api/courses \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "name": "Introduction to Programming",
    "description": "Learn the basics of programming",
    "completeness": 0,
    "status": "draft"
  }'
```

### Using Postman

1. Import the following collection:

```json
{
  "info": {
    "name": "InnoMoodle API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Create User",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"John Doe\",\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\",\n  \"role\": \"student\"\n}"
        },
        "url": {
          "raw": "http://localhost:8080/api/users",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8080",
          "path": ["api", "users"]
        }
      }
    },
    {
      "name": "Login",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"john@example.com\",\n  \"password\": \"password123\"\n}"
        },
        "url": {
          "raw": "http://localhost:8080/api/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "8080",
          "path": ["api", "login"]
        }
      }
    }
  ]
}
```

## Development

### Running in Development Mode

```bash
# Enable Go modules
export GO111MODULE=on

# Run with hot reload (requires air)
go install github.com/cosmtrek/air@latest
air
```

### Database Migrations

For database schema changes, create migration files in `db/migrations/`:

```sql
-- db/migrations/001_add_user_avatar.sql
ALTER TABLE "Moodle".users ADD COLUMN avatar VARCHAR(255);
```

### Testing

```bash
# Run all tests
go test ./...

# Run tests with coverage
go test -cover ./...

# Run specific test
go test ./handlers -v
```

## Production Deployment

### Environment Variables

Set the following environment variables for production:

```bash
# Database
DB_HOST=your_db_host
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_secure_password
DB_NAME=innomoodle

# Server
SERVER_PORT=8080

# Security
JWT_SECRET=your_very_long_random_secret_key
```

### Using Docker

```bash
# Build the application
docker build -t innomoodle .

# Run with Docker Compose
docker-compose up -d
```

### Using Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Troubleshooting

### Common Issues

#### 1. Database Connection Error

**Error**: `DB connection failed: dial tcp [::1]:5432: connect: connection refused`

**Solution**: Ensure PostgreSQL is running and accessible on the configured port.

#### 2. JWT Token Issues

**Error**: `Invalid token`

**Solution**: Check that the JWT_SECRET environment variable is set correctly.

#### 3. Port Already in Use

**Error**: `listen tcp :8080: bind: address already in use`

**Solution**: Change the SERVER_PORT in your .env file or stop the process using port 8080.

### Logs

Check application logs for debugging:

```bash
# If running with go run
go run main.go

# If running with Docker
docker-compose logs -f backend
```

## Security Considerations

1. **JWT Secret**: Use a strong, random secret key in production
2. **Database**: Use strong passwords and limit database access
3. **HTTPS**: Use HTTPS in production
4. **Rate Limiting**: Implement rate limiting for production use
5. **Input Validation**: Validate all user inputs
6. **SQL Injection**: Use parameterized queries (already implemented)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Submit a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
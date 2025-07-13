# InnoMoodle Documentation

Welcome to the InnoMoodle documentation! This directory contains comprehensive documentation for the InnoMoodle learning management system.

## 📚 Documentation Index

### Getting Started
- **[Setup Guide](SETUP.md)** - Complete setup and installation instructions
- **[API Documentation](API.md)** - Comprehensive API reference with examples

### Architecture & Design
- **[Architecture Overview](../docs/architecture/architecture.md)** - System architecture and design principles
- **[Component Diagram](../docs/architecture/static-view/component-diagram.png)** - Visual representation of system components
- **[Deployment Diagram](../docs/architecture/deployment-view/deployment-diagram.png)** - Deployment architecture
- **[Sequence Diagram](../docs/architecture/dynamic-view/sequence-diagram.png)** - System interaction flows

### Development
- **[Contributing Guidelines](../docs/CONTRIBUTING.md)** - How to contribute to the project
- **[Quality Assurance](../docs/quality-assurance/)** - Testing and quality guidelines
- **[Continuous Integration](../docs/automation/continious-integration.md)** - CI/CD pipeline documentation

### User Guides
- **[User Acceptance Tests](../docs/quality-assurance/user-acceptance-tests.md)** - User testing scenarios
- **[Demo Videos](../docs/demos/)** - Application demonstrations

## 🚀 Quick Start

1. **Setup**: Follow the [Setup Guide](SETUP.md) to get InnoMoodle running locally
2. **API**: Check the [API Documentation](API.md) to understand available endpoints
3. **Testing**: Use the provided examples to test the API

## 📋 API Overview

InnoMoodle provides a RESTful API with the following main resources:

- **Users** - User management (students, teachers, admins)
- **Courses** - Course creation and management
- **Quizzes** - Assessment and testing functionality
- **Study Groups** - Group management for collaborative learning

### Authentication

The API uses JWT (JSON Web Token) authentication. Most endpoints require authentication via the `Authorization` header.

### Base URL

- **Development**: `http://localhost:8080/api`
- **Production**: `https://your-domain.com/api`

## 🛠️ Development

### Prerequisites

- Go 1.24.4+
- PostgreSQL 12+
- Git

### Key Features

- **RESTful API** - Clean, consistent API design
- **JWT Authentication** - Secure user authentication
- **Role-based Access Control** - Different permissions for different user types
- **Service Layer Architecture** - Clean separation of concerns
- **Database Abstraction** - Repository pattern for data access

### Project Structure

```
backend/
├── handlers/     # HTTP request handlers
├── models/       # Data models and business logic
├── repository/   # Data access layer
├── services/     # Business logic services
└── db/          # Database connection and utilities
```

## 🔧 Configuration

Key environment variables:

```bash
# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=innomoodle

# Server
SERVER_PORT=8080

# Security
JWT_SECRET=your_jwt_secret
```

## 📖 Additional Resources

- **[License](../docs/LICENCE.md)** - Project license information
- **[Demo Videos](../docs/demos/)** - Application walkthroughs
- **[Architecture Details](../docs/architecture/)** - Detailed system design

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](../docs/CONTRIBUTING.md) for details on how to get started.

## 📞 Support

If you need help or have questions:

1. Check the documentation above
2. Review the [Setup Guide](SETUP.md) for common issues
3. Open an issue on the project repository

---

**InnoMoodle** - A modern learning management system built with Go and PostgreSQL.
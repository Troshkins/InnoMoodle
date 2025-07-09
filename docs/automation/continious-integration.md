# Continuous Integration Pipeline

This document describes the CI/CD workflow implemented for our project using GitHub Actions.

## Workflow File
`.github/workflows/ci.yml`

## Pipeline Overview
The CI pipeline performs the following actions:
1. Runs unit and integration tests with PostgreSQL
2. Builds and pushes Docker images to Docker Hub
3. Performs security scans on code and dependencies

## Key Components

### 1. Testing Stage
**Dependencies:**
- PostgreSQL 15 database
- Go 1.24.4

**Test Execution:**
```yaml
- name: Run unit tests
  run: go test -v -short ./tests/unit/...

- name: Run integration tests
  run: go test -v -tags=integration ./tests/integration/...

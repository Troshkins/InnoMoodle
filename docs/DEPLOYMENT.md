# InnoMoodle Deployment Guide

This guide covers deploying InnoMoodle to various environments using Docker and other deployment methods.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Configuration](#environment-configuration)
- [Docker Deployment](#docker-deployment)
- [Production Deployment](#production-deployment)
- [Monitoring and Health Checks](#monitoring-and-health-checks)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying InnoMoodle, ensure you have:

- **Docker** (version 20.10+) and **Docker Compose** (version 2.0+)
- **PostgreSQL** (version 12+) or access to a PostgreSQL service
- **Domain name** (for production)
- **SSL certificates** (for HTTPS in production)

## Environment Configuration

### 1. Copy Environment Template

```bash
cp env.example .env
```

### 2. Configure Environment Variables

Edit the `.env` file with your specific values:

```bash
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_secure_password
DB_NAME=innomoodle

# Server Configuration
SERVER_PORT=8080

# JWT Configuration (IMPORTANT: Change in production!)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Generate Secure JWT Secret

For production, generate a secure JWT secret:

```bash
# Generate a secure random string
openssl rand -base64 32
```

## Docker Deployment

### Development Environment

For development with hot reload:

```bash
# Start development environment
docker-compose -f docker-compose.dev.yml up -d

# View logs
docker-compose -f docker-compose.dev.yml logs -f

# Stop services
docker-compose -f docker-compose.dev.yml down
```

### Production Environment

For production deployment:

```bash
# Build and start production services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### Docker Commands Reference

```bash
# Build images
docker-compose build

# Start services in background
docker-compose up -d

# Start specific service
docker-compose up -d app

# View running containers
docker-compose ps

# View logs
docker-compose logs -f app

# Execute commands in container
docker-compose exec app sh

# Stop and remove containers
docker-compose down

# Stop and remove containers + volumes
docker-compose down -v

# Rebuild and restart
docker-compose up -d --build
```

## Production Deployment

### 1. Production Environment Setup

Create a production-specific environment file:

```bash
cp env.example .env.production
```

Configure production settings:

```bash
# Production environment variables
NODE_ENV=production
DEBUG=false
HOT_RELOAD=false
AUTO_MIGRATE=false

# Database (use external database service)
DB_HOST=your-db-host.com
DB_PORT=5432
DB_USER=innomoodle_user
DB_PASSWORD=very_secure_password
DB_NAME=innomoodle_prod

# Security
JWT_SECRET=your_production_jwt_secret_here
ENABLE_HTTPS=true

# Monitoring
ENABLE_METRICS=true
LOG_LEVEL=info
LOG_FORMAT=json
```

### 2. Production Docker Compose

Use the production profile:

```bash
# Start with production profile (includes nginx)
docker-compose --profile production up -d

# Or start without nginx
docker-compose up -d
```

### 3. SSL/HTTPS Configuration

For HTTPS in production:

1. **Obtain SSL certificates** (Let's Encrypt, etc.)
2. **Configure nginx** with SSL certificates
3. **Update environment variables**:

```bash
ENABLE_HTTPS=true
SSL_CERT_PATH=/etc/nginx/ssl/cert.pem
SSL_KEY_PATH=/etc/nginx/ssl/key.pem
```

### 4. Database Migration

For production database setup:

```bash
# Run database initialization
docker-compose exec app psql -h db -U postgres -d innomoodle -f /app/db/init/init.sql

# Or use the mounted init scripts (automatic)
```

### 5. Backup Strategy

Set up regular database backups:

```bash
# Create backup script
#!/bin/bash
docker-compose exec -T db pg_dump -U postgres innomoodle > backup_$(date +%Y%m%d_%H%M%S).sql
```

## Monitoring and Health Checks

### Health Check Endpoints

The application includes health check endpoints:

- **Application Health**: `GET /api/health`
- **Database Health**: `GET /api/health/db`

### Docker Health Checks

Health checks are configured in Docker:

```yaml
healthcheck:
  test: ["CMD", "wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:8080/api/health"]
  interval: 30s
  timeout: 10s
  retries: 3
  start_period: 40s
```

### Monitoring with Prometheus

Enable metrics endpoint:

```bash
# Set environment variable
ENABLE_METRICS=true

# Access metrics
curl http://localhost:8080/metrics
```

### Logging

Configure logging for production:

```bash
# Environment variables
LOG_LEVEL=info
LOG_FORMAT=json

# View logs
docker-compose logs -f app
```

## Scaling

### Horizontal Scaling

Scale the application service:

```bash
# Scale to 3 instances
docker-compose up -d --scale app=3
```

### Load Balancer Configuration

For multiple instances, configure a load balancer:

```nginx
upstream innomoodle {
    server app1:8080;
    server app2:8080;
    server app3:8080;
}

server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://innomoodle;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

## Security Considerations

### 1. Environment Variables

- **Never commit `.env` files** to version control
- **Use strong passwords** for database and JWT
- **Rotate secrets** regularly

### 2. Network Security

- **Use internal Docker networks** for service communication
- **Expose only necessary ports**
- **Use reverse proxy** for SSL termination

### 3. Container Security

- **Run containers as non-root** (already configured)
- **Keep base images updated**
- **Scan images** for vulnerabilities

### 4. Database Security

- **Use strong database passwords**
- **Limit database access** to application only
- **Enable SSL** for database connections

## Troubleshooting

### Common Issues

#### 1. Database Connection Issues

```bash
# Check database connectivity
docker-compose exec app ping db

# Check database logs
docker-compose logs db

# Test database connection
docker-compose exec app psql -h db -U postgres -d innomoodle -c "SELECT 1;"
```

#### 2. Application Startup Issues

```bash
# Check application logs
docker-compose logs app

# Check environment variables
docker-compose exec app env | grep DB_

# Restart application
docker-compose restart app
```

#### 3. Port Conflicts

```bash
# Check port usage
netstat -tulpn | grep :8080

# Change port in .env
SERVER_PORT=8081
```

#### 4. Memory Issues

```bash
# Check container resource usage
docker stats

# Increase memory limits in docker-compose.yml
services:
  app:
    deploy:
      resources:
        limits:
          memory: 1G
```

### Debug Commands

```bash
# Enter container for debugging
docker-compose exec app sh

# Check application status
docker-compose exec app ps aux

# View application configuration
docker-compose exec app cat /app/.env

# Test API endpoints
docker-compose exec app wget -qO- http://localhost:8080/api/health
```

## Performance Optimization

### 1. Database Optimization

```sql
-- Add indexes for better performance
CREATE INDEX idx_users_email ON "Moodle".users(email);
CREATE INDEX idx_courses_status ON "Moodle".courses(status);
```

### 2. Application Optimization

```bash
# Enable connection pooling
DB_MAX_OPEN_CONNS=25
DB_MAX_IDLE_CONNS=5

# Enable caching
REDIS_HOST=redis
REDIS_PORT=6379
```

### 3. Container Optimization

```yaml
# Optimize container resources
services:
  app:
    deploy:
      resources:
        limits:
          cpus: '1.0'
          memory: 1G
        reservations:
          cpus: '0.5'
          memory: 512M
```

## Backup and Recovery

### Database Backup

```bash
# Create backup
docker-compose exec -T db pg_dump -U postgres innomoodle > backup.sql

# Restore backup
docker-compose exec -T db psql -U postgres innomoodle < backup.sql
```

### Application Backup

```bash
# Backup configuration
tar -czf config_backup.tar.gz .env docker-compose.yml

# Backup data volumes
docker run --rm -v innomoodle_db_data:/data -v $(pwd):/backup alpine tar czf /backup/db_backup.tar.gz -C /data .
```

## Support

For deployment issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Review application logs: `docker-compose logs -f`
3. Verify environment configuration
4. Check Docker and system resources

---

**InnoMoodle** - Production-ready deployment guide
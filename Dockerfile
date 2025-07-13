
# Build stage
FROM golang:1.24.4-alpine AS build

# Install git and ca-certificates for go mod download
RUN apk add --no-cache git ca-certificates

WORKDIR /usr/src/app

# Copy go mod files first for better caching
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy source code
COPY backend/. ./

# Build the application
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 \
    go build -ldflags="-w -s" -o innomoodle .

# Production stage
FROM alpine:latest

# Install ca-certificates for HTTPS requests
RUN apk --no-cache add ca-certificates

# Create non-root user for security
RUN addgroup -g 1001 -S innomoodle && \
    adduser -u 1001 -S innomoodle -G innomoodle

WORKDIR /app

# Copy binary from build stage
COPY --from=build /usr/src/app/innomoodle .

# Copy frontend assets
COPY frontend ./frontend

# Copy static files (if they exist)
COPY backend/static ./static

COPY .env ./

# Change ownership to non-root user
RUN chown -R innomoodle:innomoodle /app

# Switch to non-root user
USER innomoodle

# Expose port (will be overridden by environment variable)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:${SERVER_PORT:-8080}/api/health || exit 1

# Run the application
CMD ["./innomoodle"]


# Build stage
FROM golang:1.24.4-bullseye AS builder

# Install git and ca-certificates for go mod download
RUN apt-get update && apt-get install -y git ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy go mod files from backend directory
COPY backend/go.mod backend/go.sum ./

# Download dependencies
RUN go mod download

# Copy source code from backend directory
COPY backend/ ./

# Build the application
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

# Production stage
FROM ubuntu:22.04

# Install ca-certificates for HTTPS requests
RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

# Create non-root user for security
RUN groupadd -g 1001 innomoodle && \
    useradd -u 1001 -g innomoodle -s /bin/bash innomoodle

WORKDIR /root/

# Copy the binary from builder stage
COPY --from=builder /app/main .

# Copy frontend assets
COPY frontend/ ./frontend/

# Change ownership to non-root user
RUN chown -R innomoodle:innomoodle /root/

# Switch to non-root user
USER innomoodle

# Expose port
EXPOSE 8080

# Run the application
CMD ["./main"]

#!/bin/bash

echo "Stopping containers..."
docker-compose down

echo "Removing database volume to ensure clean slate..."
docker volume rm innomoodle_postgres_data 2>/dev/null || true

echo "Starting database..."
docker-compose up -d db

echo "Waiting for database to be ready..."
sleep 10

echo "Database reinitialized with updated schema!"
echo "You can now start the backend server with: cd backend && go run main.go"
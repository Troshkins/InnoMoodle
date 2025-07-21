#!/bin/bash

echo "Setting environment variables..."
export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=rootroot
export DB_NAME=innomoodle
export JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

echo "Environment variables set:"
echo "DB_HOST: $DB_HOST"
echo "DB_PORT: $DB_PORT"
echo "DB_USER: $DB_USER"
echo "DB_NAME: $DB_NAME"

echo "Starting backend server..."
cd backend
go run main.go
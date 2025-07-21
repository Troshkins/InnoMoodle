#!/bin/bash

export DB_HOST=localhost
export DB_PORT=5432
export DB_USER=postgres
export DB_PASSWORD=rootroot
export DB_NAME=innomoodle
export JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

cd backend
go run main.go
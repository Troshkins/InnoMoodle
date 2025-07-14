#!/bin/bash

# Database migration script for InnoMoodle
# This script adds unique constraints to prevent duplicate entries

echo "Running InnoMoodle database migration..."

# Check if environment variables are set
if [ -z "$DB_HOST" ] || [ -z "$DB_PORT" ] || [ -z "$DB_USER" ] || [ -z "$DB_NAME" ]; then
    echo "Error: Database environment variables not set."
    echo "Please set the following variables:"
    echo "  DB_HOST - Database host"
    echo "  DB_PORT - Database port"
    echo "  DB_USER - Database user"
    echo "  DB_NAME - Database name"
    echo "  DB_PASSWORD - Database password (will be prompted if not set)"
    exit 1
fi

# Prompt for password if not set
if [ -z "$DB_PASSWORD" ]; then
    echo -n "Enter database password: "
    read -s DB_PASSWORD
    echo
fi

# Run the migration
echo "Applying unique constraints migration..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f db/migrations/add_unique_constraints.sql

if [ $? -eq 0 ]; then
    echo "Migration completed successfully!"
else
    echo "Migration failed. Please check the error messages above."
    exit 1
fi
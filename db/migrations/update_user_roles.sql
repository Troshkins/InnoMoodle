-- Migration: Update user roles to use Russian names
-- This migration updates the user roles from English to Russian

-- First, let's create a function to safely update roles
CREATE OR REPLACE FUNCTION update_user_roles()
RETURNS void AS $$
BEGIN
    -- Update existing users with 'student' role to 'пользователь'
    UPDATE "Moodle".users
    SET role = 'пользователь'
    WHERE role = 'student';

    -- Update existing users with 'admin' role to 'админ'
    UPDATE "Moodle".users
    SET role = 'админ'
    WHERE role = 'admin';

    -- Update existing users with 'teacher' role to 'пользователь' (teachers are also users)
    UPDATE "Moodle".users
    SET role = 'пользователь'
    WHERE role = 'teacher';

    RAISE NOTICE 'Updated user roles to Russian names';
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT update_user_roles();

-- Drop the function after use
DROP FUNCTION update_user_roles();

-- Update the default value for the role column
ALTER TABLE "Moodle".users
ALTER COLUMN role SET DEFAULT 'пользователь';

-- Add a check constraint to ensure only valid roles are used
ALTER TABLE "Moodle".users
ADD CONSTRAINT check_user_role
CHECK (role IN ('пользователь', 'админ'));

-- Update the index on role column
DROP INDEX IF EXISTS "Moodle".idx_users_role;
CREATE INDEX idx_users_role ON "Moodle".users(role);
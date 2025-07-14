-- Migration: Add unique constraints to prevent duplicate entries
-- Run this script on existing databases to add the missing constraints

-- Add unique constraint to group_student table
DO $$
BEGIN
    -- Check if the unique index already exists
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE indexname = 'idx_group_student_unique'
        AND schemaname = 'Moodle'
    ) THEN
        -- Remove any duplicate entries first
        DELETE FROM "Moodle".group_student
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM "Moodle".group_student
            GROUP BY group_id, student_id
        );

        -- Add the unique constraint
        CREATE UNIQUE INDEX idx_group_student_unique ON "Moodle".group_student(group_id, student_id);
        RAISE NOTICE 'Added unique constraint to group_student table';
    ELSE
        RAISE NOTICE 'Unique constraint already exists on group_student table';
    END IF;
END $$;

-- Add unique constraint to course_student table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE indexname = 'idx_course_student_unique'
        AND schemaname = 'Moodle'
    ) THEN
        -- Remove any duplicate entries first
        DELETE FROM "Moodle".course_student
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM "Moodle".course_student
            GROUP BY course_id, student_id
        );

        -- Add the unique constraint
        CREATE UNIQUE INDEX idx_course_student_unique ON "Moodle".course_student(course_id, student_id);
        RAISE NOTICE 'Added unique constraint to course_student table';
    ELSE
        RAISE NOTICE 'Unique constraint already exists on course_student table';
    END IF;
END $$;

-- Add unique constraint to course_teacher table
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_indexes
        WHERE indexname = 'idx_course_teacher_unique'
        AND schemaname = 'Moodle'
    ) THEN
        -- Remove any duplicate entries first
        DELETE FROM "Moodle".course_teacher
        WHERE id NOT IN (
            SELECT MIN(id)
            FROM "Moodle".course_teacher
            GROUP BY course_id, teacher_id
        );

        -- Add the unique constraint
        CREATE UNIQUE INDEX idx_course_teacher_unique ON "Moodle".course_teacher(course_id, teacher_id);
        RAISE NOTICE 'Added unique constraint to course_teacher table';
    ELSE
        RAISE NOTICE 'Unique constraint already exists on course_teacher table';
    END IF;
END $$;
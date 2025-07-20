-- Migration: Add foreign key constraints with ON DELETE CASCADE to course_student and course_teacher

ALTER TABLE "Moodle".course_student
  DROP CONSTRAINT IF EXISTS course_student_fkey,
  DROP CONSTRAINT IF EXISTS course_student_course_fkey,
  DROP CONSTRAINT IF EXISTS fk_course_student_course,
  DROP CONSTRAINT IF EXISTS fk_course_student_student;

ALTER TABLE "Moodle".course_student
  ADD CONSTRAINT fk_course_student_course
    FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_course_student_student
    FOREIGN KEY (student_id) REFERENCES "Moodle".users(id) ON DELETE CASCADE;

ALTER TABLE "Moodle".course_teacher
  DROP CONSTRAINT IF EXISTS course_teacher_fkey,
  DROP CONSTRAINT IF EXISTS course_teacher_course_fkey,
  DROP CONSTRAINT IF EXISTS fk_course_teacher_course,
  DROP CONSTRAINT IF EXISTS fk_course_teacher_teacher;

ALTER TABLE "Moodle".course_teacher
  ADD CONSTRAINT fk_course_teacher_course
    FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) ON DELETE CASCADE,
  ADD CONSTRAINT fk_course_teacher_teacher
    FOREIGN KEY (teacher_id) REFERENCES "Moodle".users(id) ON DELETE CASCADE;
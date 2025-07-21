-- Schema creation for "Moodle" (without OWNER clauses)

CREATE SCHEMA "Moodle";

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Tables

CREATE TABLE "Moodle".admins (
    id         bigint NOT NULL,
    email      text   NOT NULL,
    password   text   NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".admins
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".admins_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".users (
    id         bigint NOT NULL,
    name       text   NOT NULL,
    email      text   NOT NULL,
    password   text   NOT NULL,
    role       text   DEFAULT 'user' NOT NULL,
    status     text   DEFAULT 'active' NOT NULL,
    avatar     text,
    bio        text,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".users
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".users_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".courses (
    id           bigint  NOT NULL,
    name         text    NOT NULL,
    description  text,
    completeness integer DEFAULT 0 NOT NULL,
    status       text    DEFAULT 'draft' NOT NULL,
    image_url    text,
    created_at   timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at   timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".courses
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".courses_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

ALTER TABLE "Moodle".courses
  ADD COLUMN short_name text,
  ADD COLUMN chat_link text,
  ADD COLUMN visibility text,
  ADD COLUMN allow_download text,
  ADD COLUMN start_date timestamp with time zone,
  ADD COLUMN show_dates text;

CREATE TABLE "Moodle".course_student (
    course_id   bigint NOT NULL,
    student_id  bigint NOT NULL,
    enrolled_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Moodle".course_teacher (
    teacher_id  bigint NOT NULL,
    course_id   bigint NOT NULL,
    assigned_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

CREATE TABLE "Moodle".course_blocks (
    id         bigint NOT NULL,
    name       text   NOT NULL,
    course_id  bigint NOT NULL,
    "order"    integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".course_blocks
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".course_blocks_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".announcements (
    id         bigint NOT NULL,
    name       text   NOT NULL,
    info       text,
    block_id   bigint NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".announcements
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".study_groups (
    id          bigint NOT NULL,
    name        text   NOT NULL,
    description text,
    status      text   DEFAULT 'active' NOT NULL,
    created_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".study_groups
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".study_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".group_student (
    id         bigint NOT NULL,
    student_id bigint NOT NULL,
    group_id   bigint NOT NULL,
    joined_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".group_student
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".group_student_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".fillings (
    id       bigint NOT NULL,
    block_id bigint NOT NULL
);

ALTER TABLE "Moodle".fillings
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".fillings_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".quizzes (
    id            bigint                  NOT NULL,
    name          text                    NOT NULL,
    description   text,
    start         timestamp with time zone,
    "end"         timestamp with time zone,
    returnable    boolean                 NOT NULL,
    random        boolean                 NOT NULL,
    "time"        integer                 NOT NULL,
    results_shown boolean                 NOT NULL,
    try_count     integer                 DEFAULT 1 NOT NULL,
    filling_id    bigint                  NOT NULL,
    status        text                    DEFAULT 'draft' NOT NULL,
    created_at    timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at    timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".quizzes
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".quizzes_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".tasks (
    id      bigint  NOT NULL,
    type    integer NOT NULL,
    quiz_id bigint  NOT NULL
);

ALTER TABLE "Moodle".tasks
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".one_ans_task (
    id       bigint NOT NULL,
    task_id  bigint NOT NULL,
    question text
);

ALTER TABLE "Moodle".one_ans_task
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".one_ans_task_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".multiple_ans_task (
    id       bigint NOT NULL,
    task_id  bigint NOT NULL,
    question text
);

ALTER TABLE "Moodle".multiple_ans_task
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".multiple_ans_task_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".open_ans_task (
    id       bigint NOT NULL,
    task_id  bigint NOT NULL,
    question text
);

ALTER TABLE "Moodle".open_ans_task
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".open_ans_task_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".pdf (
    filling_id bigint NOT NULL
);

-- Themes table for course content organization
CREATE TABLE "Moodle".themes (
    id          bigint NOT NULL,
    title       text   NOT NULL,
    description text,
    course_id   bigint NOT NULL,
    "order"     integer DEFAULT 0 NOT NULL,
    created_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".themes
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".themes_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

-- Assignments table for course assignments and quizzes
CREATE TABLE "Moodle".assignments (
    id          bigint NOT NULL,
    title       text   NOT NULL,
    description text,
    type        text   DEFAULT 'assignment' NOT NULL,
    theme_id    bigint NOT NULL,
    "order"     integer DEFAULT 0 NOT NULL,
    created_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at  timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);

ALTER TABLE "Moodle".assignments
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".assignments_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

-- Primary key constraints

ALTER TABLE ONLY "Moodle".admins            ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".users             ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".courses           ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".course_blocks     ADD CONSTRAINT course_blocks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".announcements     ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".study_groups      ADD CONSTRAINT study_groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".group_student     ADD CONSTRAINT group_student_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".fillings          ADD CONSTRAINT fillings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".quizzes           ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".tasks             ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".one_ans_task      ADD CONSTRAINT one_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".multiple_ans_task ADD CONSTRAINT multiple_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".open_ans_task     ADD CONSTRAINT open_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".themes            ADD CONSTRAINT themes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".assignments       ADD CONSTRAINT assignments_pkey PRIMARY KEY (id);

-- Foreign key constraints

ALTER TABLE ONLY "Moodle".course_blocks
  ADD CONSTRAINT block_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".fillings
  ADD CONSTRAINT block_fkey FOREIGN KEY (block_id) REFERENCES "Moodle".course_blocks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".announcements
  ADD CONSTRAINT announcement_block_fkey FOREIGN KEY (block_id) REFERENCES "Moodle".course_blocks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_student
  ADD CONSTRAINT course_student_fkey FOREIGN KEY (student_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_student
  ADD CONSTRAINT course_student_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_teacher
  ADD CONSTRAINT course_teacher_fkey FOREIGN KEY (teacher_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_teacher
  ADD CONSTRAINT course_teacher_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".group_student
  ADD CONSTRAINT group_student_student_fkey FOREIGN KEY (student_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".group_student
  ADD CONSTRAINT group_student_group_fkey FOREIGN KEY (group_id) REFERENCES "Moodle".study_groups(id) NOT VALID;

ALTER TABLE ONLY "Moodle".pdf
  ADD CONSTRAINT filling_fkey FOREIGN KEY (filling_id) REFERENCES "Moodle".fillings(id) NOT VALID;

ALTER TABLE ONLY "Moodle".quizzes
  ADD CONSTRAINT quiz_filling_fkey FOREIGN KEY (filling_id) REFERENCES "Moodle".fillings(id) NOT VALID;

ALTER TABLE ONLY "Moodle".tasks
  ADD CONSTRAINT task_quiz_fkey FOREIGN KEY (quiz_id) REFERENCES "Moodle".quizzes(id) NOT VALID;

ALTER TABLE ONLY "Moodle".one_ans_task
  ADD CONSTRAINT one_ans_task_task_fkey FOREIGN KEY (task_id) REFERENCES "Moodle".tasks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".multiple_ans_task
  ADD CONSTRAINT multiple_ans_task_task_fkey FOREIGN KEY (task_id) REFERENCES "Moodle".tasks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".open_ans_task
  ADD CONSTRAINT open_ans_task_task_fkey FOREIGN KEY (task_id) REFERENCES "Moodle".tasks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".themes
  ADD CONSTRAINT themes_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".assignments
  ADD CONSTRAINT assignments_theme_fkey FOREIGN KEY (theme_id) REFERENCES "Moodle".themes(id) NOT VALID;

-- Indexes for better performance

CREATE INDEX idx_users_email ON "Moodle".users(email);
CREATE INDEX idx_users_role ON "Moodle".users(role);
CREATE INDEX idx_users_status ON "Moodle".users(status);
CREATE INDEX idx_courses_status ON "Moodle".courses(status);
CREATE INDEX idx_courses_created_at ON "Moodle".courses(created_at);
CREATE INDEX idx_quizzes_status ON "Moodle".quizzes(status);
CREATE INDEX idx_quizzes_created_at ON "Moodle".quizzes(created_at);
CREATE INDEX idx_study_groups_status ON "Moodle".study_groups(status);
CREATE INDEX idx_course_student_course_id ON "Moodle".course_student(course_id);
CREATE INDEX idx_course_student_student_id ON "Moodle".course_student(student_id);
CREATE INDEX idx_course_teacher_course_id ON "Moodle".course_teacher(course_id);
CREATE INDEX idx_course_teacher_teacher_id ON "Moodle".course_teacher(teacher_id);
CREATE INDEX idx_group_student_group_id ON "Moodle".group_student(group_id);
CREATE INDEX idx_group_student_student_id ON "Moodle".group_student(student_id);
CREATE INDEX idx_themes_course_id ON "Moodle".themes(course_id);
CREATE INDEX idx_themes_order ON "Moodle".themes("order");
CREATE INDEX idx_assignments_theme_id ON "Moodle".assignments(theme_id);
CREATE INDEX idx_assignments_order ON "Moodle".assignments("order");

-- Unique constraints to prevent duplicate entries
CREATE UNIQUE INDEX idx_group_student_unique ON "Moodle".group_student(group_id, student_id);
CREATE UNIQUE INDEX idx_course_student_unique ON "Moodle".course_student(course_id, student_id);
CREATE UNIQUE INDEX idx_course_teacher_unique ON "Moodle".course_teacher(course_id, teacher_id);

-- Constraints for data validation

ALTER TABLE "Moodle".users
  ADD CONSTRAINT users_role_check
  CHECK (role IN ('user', 'admin'));

ALTER TABLE "Moodle".users
  ADD CONSTRAINT users_status_check
  CHECK (status IN ('active', 'inactive', 'suspended'));

ALTER TABLE "Moodle".courses
  ADD CONSTRAINT courses_completeness_check
  CHECK (completeness >= 0 AND completeness <= 100);

ALTER TABLE "Moodle".courses
  ADD CONSTRAINT courses_status_check
  CHECK (status IN ('draft', 'published', 'archived'));

ALTER TABLE "Moodle".quizzes
  ADD CONSTRAINT quizzes_status_check
  CHECK (status IN ('draft', 'active', 'inactive', 'archived'));

ALTER TABLE "Moodle".quizzes
  ADD CONSTRAINT quizzes_time_check
  CHECK ("time" >= 0);

ALTER TABLE "Moodle".quizzes
  ADD CONSTRAINT quizzes_try_count_check
  CHECK (try_count >= 1);

ALTER TABLE "Moodle".study_groups
  ADD CONSTRAINT study_groups_status_check
  CHECK (status IN ('active', 'inactive', 'archived'));

ALTER TABLE "Moodle".assignments
  ADD CONSTRAINT assignments_type_check
  CHECK (type IN ('assignment', 'quiz'));

-- Fix user roles: only 'user' and 'admin' allowed
ALTER TABLE "Moodle".users ALTER COLUMN role SET DEFAULT 'user';
ALTER TABLE "Moodle".users DROP CONSTRAINT IF EXISTS users_role_check;
ALTER TABLE "Moodle".users ADD CONSTRAINT users_role_check CHECK (role IN ('user', 'admin'));
-- Update any old data
UPDATE "Moodle".users SET role = 'user' WHERE role NOT IN ('user', 'admin');

-- Insert initial data

INSERT INTO "Moodle".users (name, email, password, role, status) VALUES
('Admin User', 'admin@innopolis.ru', 'password123', 'admin', 'active'),
('Regular User', 'user@innopolis.ru', 'password123', 'user', 'active');

-- Remove any INSERT INTO "Moodle".study_groups ... for base groups
-- Remove any INSERT INTO "Moodle".group_student ... for base groups

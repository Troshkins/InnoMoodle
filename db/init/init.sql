-- Schema creation for "Moodle" (without OWNER clauses)

CREATE SCHEMA "Moodle";

SET default_tablespace = '';
SET default_table_access_method = heap;

-- Tables

CREATE TABLE "Moodle".admins (
    id        bigint NOT NULL,
    email     text   NOT NULL,
    password  text   NOT NULL
);

ALTER TABLE "Moodle".admins
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".admins_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".announcements (
    name     text NOT NULL,
    info     text,
    id       bigint NOT NULL,
    block_id bigint NOT NULL
);

ALTER TABLE "Moodle".announcements
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".announcements_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".course_student (
    course_id  bigint NOT NULL,
    student_id bigint NOT NULL
);

CREATE TABLE "Moodle".course_teacher (
    teacher_id bigint NOT NULL,
    course_id  bigint NOT NULL
);

CREATE TABLE "Moodle".course_blocks (
    name      text NOT NULL,
    id        bigint NOT NULL,
    course_id bigint NOT NULL
);

ALTER TABLE "Moodle".course_blocks
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".course_blocks_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".courses (
    name         text    NOT NULL,
    completeness boolean DEFAULT false NOT NULL,
    id           bigint  NOT NULL
);

ALTER TABLE "Moodle".courses
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".courses_id_seq
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

CREATE TABLE "Moodle".group_student (
    id         bigint NOT NULL,
    student_id bigint NOT NULL,
    group_id   bigint NOT NULL
);

ALTER TABLE "Moodle".group_student
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".group_student_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".multiple_ans_task (
    task_id bigint NOT NULL,
    question text,
    id       bigint NOT NULL
);

ALTER TABLE "Moodle".multiple_ans_task
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".multiple_ans_task_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".one_ans_task (
    task_id bigint NOT NULL,
    id       bigint NOT NULL,
    question text
);

ALTER TABLE "Moodle".one_ans_task
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".one_ans_task_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".open_ans_task (
    task_id bigint NOT NULL,
    id       bigint NOT NULL,
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

CREATE TABLE "Moodle".quizzes (
    name           text                    NOT NULL,
    start          timestamp with time zone,
    "end"          timestamp with time zone,
    returnable     boolean                 NOT NULL,
    random         boolean                 NOT NULL,
    "time"         integer                 NOT NULL,
    results_shown  boolean                 NOT NULL,
    try_count      integer DEFAULT 1,
    id             bigint                  NOT NULL,
    filling_id     bigint                  NOT NULL
);

ALTER TABLE "Moodle".quizzes
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".quizzes_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );


CREATE TABLE "Moodle".users (
    name     text NOT NULL,
    password text NOT NULL,
    id       bigint NOT NULL,
    email    text NOT NULL
);

ALTER TABLE "Moodle".users
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".students_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".study_groups (
    name text   NOT NULL,
    id   bigint NOT NULL
);

ALTER TABLE "Moodle".study_groups
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".study_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

CREATE TABLE "Moodle".tasks (
    type     integer NOT NULL,
    id       bigint  NOT NULL,
    quiz_id bigint  NOT NULL
);

ALTER TABLE "Moodle".tasks
  ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME "Moodle".tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    CACHE 1
  );

-- Primary key constraints

ALTER TABLE ONLY "Moodle".admins            ADD CONSTRAINT admins_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".announcements     ADD CONSTRAINT announcements_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".course_blocks     ADD CONSTRAINT course_blocks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".courses           ADD CONSTRAINT courses_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".fillings          ADD CONSTRAINT fillings_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".group_student     ADD CONSTRAINT group_student_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".multiple_ans_task ADD CONSTRAINT multiple_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".one_ans_task      ADD CONSTRAINT one_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".open_ans_task     ADD CONSTRAINT open_ans_task_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".quizzes           ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".study_groups      ADD CONSTRAINT study_groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".tasks             ADD CONSTRAINT tasks_pkey PRIMARY KEY (id);
ALTER TABLE ONLY "Moodle".users             ADD CONSTRAINT users_pkey PRIMARY KEY (id);

-- Foreign key constraints

ALTER TABLE ONLY "Moodle".course_blocks
  ADD CONSTRAINT block_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".fillings
  ADD CONSTRAINT block_fkey FOREIGN KEY (block_id) REFERENCES "Moodle".course_blocks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".announcements
  ADD CONSTRAINT block_fkey FOREIGN KEY (block_id) REFERENCES "Moodle".course_blocks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_student
  ADD CONSTRAINT course_student_fkey FOREIGN KEY (student_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_teacher
  ADD CONSTRAINT course_teacher_fkey FOREIGN KEY (teacher_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".pdf
  ADD CONSTRAINT filling_fkey FOREIGN KEY (filling_id) REFERENCES "Moodle".fillings(id) NOT VALID;

ALTER TABLE ONLY "Moodle".quizzes
  ADD CONSTRAINT filling_fkey FOREIGN KEY (filling_id) REFERENCES "Moodle".fillings(id) NOT VALID;

ALTER TABLE ONLY "Moodle".group_student
  ADD CONSTRAINT group_student_fkey FOREIGN KEY (student_id) REFERENCES "Moodle".users(id) NOT VALID;

ALTER TABLE ONLY "Moodle".tasks
  ADD CONSTRAINT quiz_fkey FOREIGN KEY (quiz_id) REFERENCES "Moodle".quizzes(id) NOT VALID;

ALTER TABLE ONLY "Moodle".course_student
  ADD CONSTRAINT student_course_fkey FOREIGN KEY (course_id) REFERENCES "Moodle".courses(id) NOT VALID;

ALTER TABLE ONLY "Moodle".group_student
  ADD CONSTRAINT student_group_fkey FOREIGN KEY (group_id) REFERENCES "Moodle".study_groups(id) NOT VALID;

ALTER TABLE ONLY "Moodle".one_ans_task
  ADD CONSTRAINT task_fkey FOREIGN KEY (task_id) REFERENCES "Moodle".tasks(id) NOT VALID;

ALTER TABLE ONLY "Moodle".multiple_ans_task
  ADD CONSTRAINT task_fkey FOREIGN KEY (task_id) REFERENCES "Moodle".tasks(id) NOT VALID;

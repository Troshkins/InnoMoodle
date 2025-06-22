package repository

import (
	"context"
	"database/sql"
	"example.com/moodle/models"
)

// --- USERS ---

func CreateUser(ctx context.Context, db *sql.DB, u *models.User) error {
	query := `
      INSERT INTO "Moodle".users (name, password, email)
      VALUES ($1, $2, $3)
      RETURNING id`
	return db.QueryRowContext(ctx, query, u.Name, u.Password, u.Email).Scan(&u.ID)
}

func GetUser(ctx context.Context, db *sql.DB, id int64) (*models.User, error) {
	u := &models.User{}
	query := `
      SELECT id, name, password, email
      FROM "Moodle".users
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).Scan(&u.ID, &u.Name, &u.Password, &u.Email); err != nil {
		return nil, err
	}
	return u, nil
}

func UpdateUser(ctx context.Context, db *sql.DB, u *models.User) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle".users
      SET name=$1, password=$2, email=$3
      WHERE id=$4`, u.Name, u.Password, u.Email, u.ID)
	return err
}

func DeleteUser(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle".users
      WHERE id=$1`, id)
	return err
}

// --- ADMINS ---

func CreateAdmin(ctx context.Context, db *sql.DB, a *models.Admin) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".admins (email, password)
      VALUES ($1,$2) RETURNING id`, a.Email, a.Password,
	).Scan(&a.ID)
}

// аналогично GetAdmin, UpdateAdmin, DeleteAdmin…

// --- COURSES ---

func CreateCourse(ctx context.Context, db *sql.DB, c *models.Course) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".courses (name, completeness)
      VALUES ($1,$2) RETURNING id`, c.Name, c.Completeness,
	).Scan(&c.ID)
}

func GetCourse(ctx context.Context, db *sql.DB, id int64) (*models.Course, error) {
	c := &models.Course{}
	err := db.QueryRowContext(ctx, `
      SELECT id, name, completeness FROM "Moodle".courses WHERE id=$1`, id,
	).Scan(&c.ID, &c.Name, &c.Completeness)
	return c, err
}

// UpdateCourse, DeleteCourse…

// --- STUDY_GROUPS ---

func CreateStudyGroup(ctx context.Context, db *sql.DB, g *models.StudyGroup) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".study_groups (name)
      VALUES ($1) RETURNING id`, g.Name,
	).Scan(&g.ID)
}

// GetStudyGroup, UpdateStudyGroup, DeleteStudyGroup…

// --- COURSE_BLOCKS ---

func CreateCourseBlock(ctx context.Context, db *sql.DB, b *models.CourseBlock) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".course_blocks (name, course_id)
      VALUES ($1,$2) RETURNING id`, b.Name, b.CourseID,
	).Scan(&b.ID)
}

// GetCourseBlock, UpdateCourseBlock, DeleteCourseBlock…

// --- ANNOUNCEMENTS ---

func CreateAnnouncement(ctx context.Context, db *sql.DB, a *models.Announcement) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".announcements (name, info, block_id)
      VALUES ($1,$2,$3) RETURNING id`, a.Name, a.Info, a.BlockID,
	).Scan(&a.ID)
}

// ...далее Get/Update/Delete

// --- FILLINGS, PDF, QUIZZES, TASKS, ANSWERS ---

func CreateFilling(ctx context.Context, db *sql.DB, f *models.Filling) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".fillings (block_id)
      VALUES ($1) RETURNING id`, f.BlockID,
	).Scan(&f.ID)
}

func CreatePDF(ctx context.Context, db *sql.DB, p *models.PDF) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "Moodle".pdf (filling_id) VALUES ($1)`, p.FillingID)
	return err
}

func CreateQuiz(ctx context.Context, db *sql.DB, q *models.Quiz) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".quizzes
        (name,start,"end",returnable,random,"time",results_shown,try_count,filling_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id`,
		q.Name, q.Start, q.End, q.Returnable, q.Random,
		q.TimeLimit, q.ResultsShown, q.TryCount, q.FillingID,
	).Scan(&q.ID)
}

func CreateTask(ctx context.Context, db *sql.DB, t *models.Task) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle".tasks (type, quizz_id)
      VALUES ($1,$2) RETURNING id`, t.Type, t.QuizID,
	).Scan(&t.ID)
}

func CreateOneAnsTask(ctx context.Context, db *sql.DB, o *models.OneAnsTask) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "Moodle"."one-ans-task" (task_id,question)
      VALUES ($1,$2) RETURNING id`, o.TaskID, o.Question,
	).Scan(&o.ID)
}

// аналогично MultipleAnsTask и OpenAnsTask…

// --- СВЯЗИ: enroll, assign, group-student ---

// записать студента на курс
func EnrollStudent(ctx context.Context, db *sql.DB, courseID, studentID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "Moodle"."course-student" (course_id,student_id)
      VALUES ($1,$2)`, courseID, studentID)
	return err
}

// назначить преподавателя на курс
func AssignTeacher(ctx context.Context, db *sql.DB, courseID, teacherID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "Moodle"."course-teacher" (course_id,teacher_id)
      VALUES ($1,$2)`, courseID, teacherID)
	return err
}

// добавить студента в группу
func AddStudentToGroup(ctx context.Context, db *sql.DB, groupID, studentID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "Moodle"."group-student" (group_id,student_id)
      VALUES ($1,$2)`, groupID, studentID)
	return err
}

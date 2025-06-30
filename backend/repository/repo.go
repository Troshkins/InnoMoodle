package repository

import (
	"context"
	"database/sql"

	"github.com/Troshkins/InnoMoodle/backend/models"
)

// USERS

func CreateUser(ctx context.Context, db *sql.DB, u *models.User) error {
	query := `
      INSERT INTO "InnoMoodle".users (name, password, email)
      VALUES ($1, $2, $3)
      RETURNING id`
	return db.QueryRowContext(ctx, query, u.Name, u.Password, u.Email).Scan(&u.ID)
}

func GetUser(ctx context.Context, db *sql.DB, id int64) (*models.User, error) {
	u := &models.User{}
	query := `
      SELECT id, name, password, email
      FROM "InnoMoodle".users
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).Scan(&u.ID, &u.Name, &u.Password, &u.Email); err != nil {
		return nil, err
	}
	return u, nil
}

func UpdateUser(ctx context.Context, db *sql.DB, u *models.User) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".users
      SET name=$1, password=$2, email=$3
      WHERE id=$4`, u.Name, u.Password, u.Email, u.ID)
	return err
}

func DeleteUser(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".users
      WHERE id=$1`, id)
	return err
}

// ADMINS

func CreateAdmin(ctx context.Context, db *sql.DB, a *models.Admin) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".admins (email, password)
      VALUES ($1,$2) RETURNING id`, a.Email, a.Password,
	).Scan(&a.ID)
}

func GetAdmin(ctx context.Context, db *sql.DB, id int64) (*models.Admin, error) {
	a := &models.Admin{}
	query := `
      SELECT id, email, password
      FROM "InnoMoodle".admins
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&a.ID, &a.Email, &a.Password); err != nil {
		return nil, err
	}
	return a, nil
}

func UpdateAdmin(ctx context.Context, db *sql.DB, a *models.Admin) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".admins
      SET email = $1, password = $2
      WHERE id = $3`,
		a.Email, a.Password, a.ID,
	)
	return err
}

func DeleteAdmin(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".admins
      WHERE id = $1`, id)
	return err
}

// COURSES

func CreateCourse(ctx context.Context, db *sql.DB, c *models.Course) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".courses (name, completeness)
      VALUES ($1,$2) RETURNING id`, c.Name, c.Completeness,
	).Scan(&c.ID)
}

func GetCourse(ctx context.Context, db *sql.DB, id int64) (*models.Course, error) {
	c := &models.Course{}
	err := db.QueryRowContext(ctx, `
      SELECT id, name, completeness FROM "InnoMoodle".courses WHERE id=$1`, id,
	).Scan(&c.ID, &c.Name, &c.Completeness)
	return c, err
}

func UpdateCourse(ctx context.Context, db *sql.DB, c *models.Course) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".courses
      SET name = $1, completeness = $2
      WHERE id = $3`,
		c.Name, c.Completeness, c.ID,
	)
	return err
}

func DeleteCourse(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".courses
      WHERE id = $1`, id)
	return err
}

// STUDY_GROUPS

func CreateStudyGroup(ctx context.Context, db *sql.DB, g *models.StudyGroup) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".study_groups (name)
      VALUES ($1) RETURNING id`, g.Name,
	).Scan(&g.ID)
}

func GetStudyGroup(ctx context.Context, db *sql.DB, id int64) (*models.StudyGroup, error) {
	g := &models.StudyGroup{}
	query := `
      SELECT id, name
      FROM "InnoMoodle".study_groups
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&g.ID, &g.Name); err != nil {
		return nil, err
	}
	return g, nil
}

func UpdateStudyGroup(ctx context.Context, db *sql.DB, g *models.StudyGroup) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".study_groups
      SET name = $1
      WHERE id = $2`,
		g.Name, g.ID,
	)
	return err
}

func DeleteStudyGroup(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".study_groups
      WHERE id = $1`, id)
	return err
}

// COURSE_BLOCKS

func CreateCourseBlock(ctx context.Context, db *sql.DB, b *models.CourseBlock) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".course_blocks (name, course_id)
      VALUES ($1,$2) RETURNING id`, b.Name, b.CourseID,
	).Scan(&b.ID)
}

func GetCourseBlock(ctx context.Context, db *sql.DB, id int64) (*models.CourseBlock, error) {
	b := &models.CourseBlock{}
	query := `
      SELECT id, name, course_id
      FROM "InnoMoodle".course_blocks
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&b.ID, &b.Name, &b.CourseID); err != nil {
		return nil, err
	}
	return b, nil
}

func UpdateCourseBlock(ctx context.Context, db *sql.DB, b *models.CourseBlock) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".course_blocks
      SET name = $1, course_id = $2
      WHERE id = $3`,
		b.Name, b.CourseID, b.ID,
	)
	return err
}

func DeleteCourseBlock(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".course_blocks
      WHERE id = $1`, id)
	return err
}

// ANNOUNCEMENTS

func CreateAnnouncement(ctx context.Context, db *sql.DB, a *models.Announcement) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".announcements (name, info, block_id)
      VALUES ($1,$2,$3) RETURNING id`, a.Name, a.Info, a.BlockID,
	).Scan(&a.ID)
}

func GetAnnouncement(ctx context.Context, db *sql.DB, id int64) (*models.Announcement, error) {
	a := &models.Announcement{}
	query := `
      SELECT id, name, info, block_id
      FROM "InnoMoodle".announcements
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&a.ID, &a.Name, &a.Info, &a.BlockID); err != nil {
		return nil, err
	}
	return a, nil
}

func UpdateAnnouncement(ctx context.Context, db *sql.DB, a *models.Announcement) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "InnoMoodle".announcements
      SET name = $1, info = $2, block_id = $3
      WHERE id = $4`,
		a.Name, a.Info, a.BlockID, a.ID,
	)
	return err
}

func DeleteAnnouncement(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "InnoMoodle".announcements
      WHERE id = $1`, id)
	return err
}

// FILLINGS

func CreateFilling(ctx context.Context, db *sql.DB, f *models.Filling) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".fillings (block_id)
      VALUES ($1) RETURNING id`, f.BlockID,
	).Scan(&f.ID)
}

func GetFilling(ctx context.Context, db *sql.DB, id int64) (*models.Filling, error) {
	f := &models.Filling{}
	query := `
      SELECT id, block_id
      FROM "Moodle".fillings
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&f.ID, &f.BlockID); err != nil {
		return nil, err
	}
	return f, nil
}

func UpdateFilling(ctx context.Context, db *sql.DB, f *models.Filling) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle".fillings
      SET block_id = $1
      WHERE id = $2`,
		f.BlockID, f.ID,
	)
	return err
}

func DeleteFilling(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle".fillings
      WHERE id = $1`, id)
	return err
}

// PDF

func CreatePDF(ctx context.Context, db *sql.DB, p *models.PDF) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "InnoMoodle".pdf (filling_id) VALUES ($1)`, p.FillingID)
	return err
}

func GetPDF(ctx context.Context, db *sql.DB, id int64) (*models.PDF, error) {
	p := &models.PDF{}
	query := `
      SELECT id, filling_id
      FROM "Moodle".pdf
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&p.ID, &p.FillingID); err != nil {
		return nil, err
	}
	return p, nil
}

func UpdatePDF(ctx context.Context, db *sql.DB, p *models.PDF) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle".pdf
      SET filling_id = $1
      WHERE id = $2`,
		p.FillingID, p.ID,
	)
	return err
}

func DeletePDF(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle".pdf
      WHERE id = $1`, id)
	return err
}

// QUIZ

func CreateQuiz(ctx context.Context, db *sql.DB, q *models.Quiz) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".quizzes
        (name,start,"end",returnable,random,"time",results_shown,try_count,filling_id)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id`,
		q.Name, q.Start, q.End, q.Returnable, q.Random,
		q.TimeLimit, q.ResultsShown, q.TryCount, q.FillingID,
	).Scan(&q.ID)
}

func GetQuiz(ctx context.Context, db *sql.DB, id int64) (*models.Quiz, error) {
	q := &models.Quiz{}
	query := `
      SELECT id, name, start, "end", returnable, random, "time", results_shown, try_count, filling_id
      FROM "Moodle".quizzes
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&q.ID, &q.Name, &q.Start, &q.End, &q.Returnable, &q.Random,
			&q.TimeLimit, &q.ResultsShown, &q.TryCount, &q.FillingID); err != nil {
		return nil, err
	}
	return q, nil
}

func UpdateQuiz(ctx context.Context, db *sql.DB, q *models.Quiz) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle".quizzes
      SET name = $1,
          start = $2,
          "end" = $3,
          returnable = $4,
          random = $5,
          "time" = $6,
          results_shown = $7,
          try_count = $8,
          filling_id = $9
      WHERE id = $10`,
		q.Name, q.Start, q.End, q.Returnable, q.Random,
		q.TimeLimit, q.ResultsShown, q.TryCount, q.FillingID, q.ID,
	)
	return err
}

func DeleteQuiz(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle".quizzes
      WHERE id = $1`, id)
	return err
}

// TASK

func CreateTask(ctx context.Context, db *sql.DB, t *models.Task) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle".tasks (type, quizz_id)
      VALUES ($1,$2) RETURNING id`, t.Type, t.QuizID,
	).Scan(&t.ID)
}

func GetTask(ctx context.Context, db *sql.DB, id int64) (*models.Task, error) {
	t := &models.Task{}
	query := `
      SELECT id, type, quizz_id
      FROM "Moodle".tasks
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&t.ID, &t.Type, &t.QuizID); err != nil {
		return nil, err
	}
	return t, nil
}

func UpdateTask(ctx context.Context, db *sql.DB, t *models.Task) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle".tasks
      SET type = $1,
          quizz_id = $2
      WHERE id = $3`,
		t.Type, t.QuizID, t.ID,
	)
	return err
}

func DeleteTask(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle".tasks
      WHERE id = $1`, id)
	return err
}

// ONEANSTASK

func CreateOneAnsTask(ctx context.Context, db *sql.DB, o *models.OneAnsTask) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle"."one-ans-task" (task_id,question)
      VALUES ($1,$2) RETURNING id`, o.TaskID, o.Question,
	).Scan(&o.ID)
}

func GetOneAnsTask(ctx context.Context, db *sql.DB, id int64) (*models.OneAnsTask, error) {
	o := &models.OneAnsTask{}
	query := `
      SELECT id, task_id, question
      FROM "Moodle"."one-ans-task"
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&o.ID, &o.TaskID, &o.Question); err != nil {
		return nil, err
	}
	return o, nil
}

func UpdateOneAnsTask(ctx context.Context, db *sql.DB, o *models.OneAnsTask) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle"."one-ans-task"
      SET task_id = $1,
          question = $2
      WHERE id = $3`,
		o.TaskID, o.Question, o.ID,
	)
	return err
}

func DeleteOneAnsTask(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle"."one-ans-task"
      WHERE id = $1`, id)
	return err
}

// MULTIPLEANSTASK

func CreateMultipleAnsTask(ctx context.Context, db *sql.DB, o *models.MultipleAnsTask) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle"."multiple-ans-task" (task_id,question)
      VALUES ($1,$2) RETURNING id`, o.TaskID, o.Question,
	).Scan(&o.ID)
}

func GetMultipleAnsTask(ctx context.Context, db *sql.DB, id int64) (*models.MultipleAnsTask, error) {
	o := &models.MultipleAnsTask{}
	query := `
      SELECT id, task_id, question
      FROM "Moodle"."multiple-ans-task"
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&o.ID, &o.TaskID, &o.Question); err != nil {
		return nil, err
	}
	return o, nil
}

func UpdateMultipleAnsTask(ctx context.Context, db *sql.DB, o *models.MultipleAnsTask) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle"."multiple-ans-task"
      SET task_id = $1,
          question = $2
      WHERE id = $3`,
		o.TaskID, o.Question, o.ID,
	)
	return err
}

func DeleteMultipleAnsTask(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle"."multiple-ans-task"
      WHERE id = $1`, id)
	return err
}

// OpenAnsTask

func CreateOpenAnsTask(ctx context.Context, db *sql.DB, o *models.OpenAnsTask) error {
	return db.QueryRowContext(ctx, `
      INSERT INTO "InnoMoodle"."open-ans-task" (task_id,question)
      VALUES ($1,$2) RETURNING id`, o.TaskID, o.Question,
	).Scan(&o.ID)
}

func GetOpenAnsTask(ctx context.Context, db *sql.DB, id int64) (*models.OpenAnsTask, error) {
	o := &models.OpenAnsTask{}
	query := `
      SELECT id, task_id, question
      FROM "Moodle"."open-ans-task"
      WHERE id = $1`
	if err := db.QueryRowContext(ctx, query, id).
		Scan(&o.ID, &o.TaskID, &o.Question); err != nil {
		return nil, err
	}
	return o, nil
}

func UpdateOpenAnsTask(ctx context.Context, db *sql.DB, o *models.OpenAnsTask) error {
	_, err := db.ExecContext(ctx, `
      UPDATE "Moodle"."open-ans-task"
      SET task_id = $1,
          question = $2
      WHERE id = $3`,
		o.TaskID, o.Question, o.ID,
	)
	return err
}

func DeleteOpenAnsTask(ctx context.Context, db *sql.DB, id int64) error {
	_, err := db.ExecContext(ctx, `
      DELETE FROM "Moodle"."open-ans-task"
      WHERE id = $1`, id)
	return err
}

// СВЯЗИ: enroll, assign, group-student

func EnrollStudent(ctx context.Context, db *sql.DB, courseID, studentID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "InnoMoodle"."course-student" (course_id,student_id)
      VALUES ($1,$2)`, courseID, studentID)
	return err
}

func AssignTeacher(ctx context.Context, db *sql.DB, courseID, teacherID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "InnoMoodle"."course-teacher" (course_id,teacher_id)
      VALUES ($1,$2)`, courseID, teacherID)
	return err
}

func AddStudentToGroup(ctx context.Context, db *sql.DB, groupID, studentID int64) error {
	_, err := db.ExecContext(ctx, `
      INSERT INTO "InnoMoodle"."group-student" (group_id,student_id)
      VALUES ($1,$2)`, groupID, studentID)
	return err
}

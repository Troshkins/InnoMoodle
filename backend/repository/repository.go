package repository

import (
	"context"
	"fmt"
	"net/http"

	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/jmoiron/sqlx"
)

// USERS

type Repository struct {
	DB *sqlx.DB
}

func New(db *sqlx.DB) *Repository {
	return &Repository{DB: db}
}

func (r *Repository) HelloHandler(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"message":"Hello from Repository!"}`))
}

func (r *Repository) CreateUser(ctx context.Context, u *models.User) error {
	const qry = `
      INSERT INTO users (name, password, email)
      VALUES ($1, $2, $3)
      RETURNING id
    `
	if err := r.DB.QueryRowxContext(ctx, qry, u.Name, u.Password, u.Email).Scan(&u.ID); err != nil {
		return fmt.Errorf("CreateUser: %w", err)
	}
	return nil
}

func (r *Repository) GetUser(ctx context.Context, id int64) (*models.User, error) {
	var u models.User
	const qry = `
      SELECT id, name, password, email
      FROM users
      WHERE id = $1
    `
	if err := r.DB.GetContext(ctx, &u, qry, id); err != nil {
		return nil, fmt.Errorf("GetUser: %w", err)
	}
	return &u, nil
}

func (r *Repository) UpdateUser(ctx context.Context, u *models.User) error {
	const qry = `
      UPDATE users
      SET name = $1,
          password = $2,
          email = $3
      WHERE id = $4
    `
	res, err := r.DB.ExecContext(ctx, qry, u.Name, u.Password, u.Email, u.ID)
	if err != nil {
		return fmt.Errorf("UpdateUser: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateUser: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteUser(ctx context.Context, id int64) error {
	const qry = `
      DELETE FROM users
      WHERE id = $1
    `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteUser: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteUser: no rows affected")
	}
	return nil
}

// ADMINS

func (r *Repository) CreateAdmin(ctx context.Context, a *models.Admin) error {
	const qry = `
	    INSERT INTO admins (email, password)
	    VALUES ($1, $2)
	    RETURNING id
	`
	if err := r.DB.QueryRowxContext(ctx, qry, a.Email, a.Password).Scan(&a.ID); err != nil {
		return fmt.Errorf("CreateAdmin: %w", err)
	}
	return nil
}

func (r *Repository) GetAdmin(ctx context.Context, id int64) (*models.Admin, error) {
	var a models.Admin
	const qry = `
	    SELECT id, email, password
	    FROM admins
	    WHERE id = $1
	`
	if err := r.DB.GetContext(ctx, &a, qry, id); err != nil {
		return nil, fmt.Errorf("GetAdmin: %w", err)
	}
	return &a, nil
}

func (r *Repository) UpdateAdmin(ctx context.Context, a *models.Admin) error {
	const qry = `
	    UPDATE admins
	    SET email = $1,
	        password = $2
	    WHERE id = $3
	`
	res, err := r.DB.ExecContext(ctx, qry, a.Email, a.Password, a.ID)
	if err != nil {
		return fmt.Errorf("UpdateAdmin: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateAdmin: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteAdmin(ctx context.Context, id int64) error {
	const qry = `
	    DELETE FROM admins
	    WHERE id = $1
	`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteAdmin: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteAdmin: no rows affected")
	}
	return nil
}

func (r *Repository) CreateCourse(ctx context.Context, c *models.Course) error {
	const qry = `
	    INSERT INTO courses (name, completeness)
	    VALUES ($1, $2)
	    RETURNING id
	`
	if err := r.DB.QueryRowxContext(ctx, qry, c.Name, c.Completeness).Scan(&c.ID); err != nil {
		return fmt.Errorf("CreateCourse: %w", err)
	}
	return nil
}

func (r *Repository) GetCourse(ctx context.Context, id int64) (*models.Course, error) {
	var c models.Course
	const qry = `
	    SELECT id, name, completeness
	    FROM courses
	    WHERE id = $1
	`
	if err := r.DB.GetContext(ctx, &c, qry, id); err != nil {
		return nil, fmt.Errorf("GetCourse: %w", err)
	}
	return &c, nil
}

func (r *Repository) UpdateCourse(ctx context.Context, c *models.Course) error {
	const qry = `
	    UPDATE courses
	    SET name = $1,
	        completeness = $2
	    WHERE id = $3
	`
	res, err := r.DB.ExecContext(ctx, qry, c.Name, c.Completeness, c.ID)
	if err != nil {
		return fmt.Errorf("UpdateCourse: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateCourse: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteCourse(ctx context.Context, id int64) error {
	const qry = `
	    DELETE FROM courses
	    WHERE id = $1
	`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteCourse: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteCourse: no rows affected")
	}
	return nil
}

func (r *Repository) CreateStudyGroup(ctx context.Context, g *models.StudyGroup) error {
	const qry = `
	    INSERT INTO study_groups (name)
	    VALUES ($1)
	    RETURNING id
	`
	if err := r.DB.QueryRowxContext(ctx, qry, g.Name).Scan(&g.ID); err != nil {
		return fmt.Errorf("CreateStudyGroup: %w", err)
	}
	return nil
}

func (r *Repository) GetStudyGroup(ctx context.Context, id int64) (*models.StudyGroup, error) {
	var g models.StudyGroup
	const qry = `
	    SELECT id, name
	    FROM study_groups
	    WHERE id = $1
	`
	if err := r.DB.GetContext(ctx, &g, qry, id); err != nil {
		return nil, fmt.Errorf("GetStudyGroup: %w", err)
	}
	return &g, nil
}

func (r *Repository) UpdateStudyGroup(ctx context.Context, g *models.StudyGroup) error {
	const qry = `
	    UPDATE study_groups
	    SET name = $1
	    WHERE id = $2
	`
	res, err := r.DB.ExecContext(ctx, qry, g.Name, g.ID)
	if err != nil {
		return fmt.Errorf("UpdateStudyGroup: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateStudyGroup: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteStudyGroup(ctx context.Context, id int64) error {
	const qry = `
	    DELETE FROM study_groups
	    WHERE id = $1
	`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteStudyGroup: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteStudyGroup: no rows affected")
	}
	return nil
}
func (r *Repository) CreateCourseBlock(ctx context.Context, b *models.CourseBlock) error {
	const qry = `
    INSERT INTO course_blocks (name, course_id)
    VALUES ($1, $2)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, b.Name, b.CourseID).Scan(&b.ID); err != nil {
		return fmt.Errorf("CreateCourseBlock: %w", err)
	}
	return nil
}

func (r *Repository) GetCourseBlock(ctx context.Context, id int64) (*models.CourseBlock, error) {
	var b models.CourseBlock
	const qry = `
    SELECT id, name, course_id
    FROM course_blocks
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &b, qry, id); err != nil {
		return nil, fmt.Errorf("GetCourseBlock: %w", err)
	}
	return &b, nil
}

func (r *Repository) UpdateCourseBlock(ctx context.Context, b *models.CourseBlock) error {
	const qry = `
    UPDATE course_blocks
    SET name = $1,
        course_id = $2
    WHERE id = $3
  `
	res, err := r.DB.ExecContext(ctx, qry, b.Name, b.CourseID, b.ID)
	if err != nil {
		return fmt.Errorf("UpdateCourseBlock: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateCourseBlock: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteCourseBlock(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM course_blocks
    WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteCourseBlock: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteCourseBlock: no rows affected")
	}
	return nil
}

func (r *Repository) CreateAnnouncement(ctx context.Context, a *models.Announcement) error {
	const qry = `
    INSERT INTO announcements (name, info, block_id)
    VALUES ($1, $2, $3)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, a.Name, a.Info, a.BlockID).Scan(&a.ID); err != nil {
		return fmt.Errorf("CreateAnnouncement: %w", err)
	}
	return nil
}

func (r *Repository) GetAnnouncement(ctx context.Context, id int64) (*models.Announcement, error) {
	var a models.Announcement
	const qry = `
    SELECT id, name, info, block_id
    FROM announcements
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &a, qry, id); err != nil {
		return nil, fmt.Errorf("GetAnnouncement: %w", err)
	}
	return &a, nil
}

func (r *Repository) UpdateAnnouncement(ctx context.Context, a *models.Announcement) error {
	const qry = `
    UPDATE announcements
    SET name = $1,
        info = $2,
        block_id = $3
    WHERE id = $4
  `
	res, err := r.DB.ExecContext(ctx, qry, a.Name, a.Info, a.BlockID, a.ID)
	if err != nil {
		return fmt.Errorf("UpdateAnnouncement: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateAnnouncement: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteAnnouncement(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM announcements
    WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteAnnouncement: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteAnnouncement: no rows affected")
	}
	return nil
}

func (r *Repository) CreateFilling(ctx context.Context, f *models.Filling) error {
	const qry = `
    INSERT INTO fillings (block_id)
    VALUES ($1)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, f.BlockID).Scan(&f.ID); err != nil {
		return fmt.Errorf("CreateFilling: %w", err)
	}
	return nil
}

func (r *Repository) GetFilling(ctx context.Context, id int64) (*models.Filling, error) {
	var f models.Filling
	const qry = `
    SELECT id, block_id
    FROM fillings
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &f, qry, id); err != nil {
		return nil, fmt.Errorf("GetFilling: %w", err)
	}
	return &f, nil
}

func (r *Repository) UpdateFilling(ctx context.Context, f *models.Filling) error {
	const qry = `
    UPDATE fillings
    SET block_id = $1
    WHERE id = $2
  `
	res, err := r.DB.ExecContext(ctx, qry, f.BlockID, f.ID)
	if err != nil {
		return fmt.Errorf("UpdateFilling: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateFilling: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteFilling(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM fillings
    WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteFilling: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteFilling: no rows affected")
	}
	return nil
}

func (r *Repository) CreatePDF(ctx context.Context, p *models.PDF) error {
	const qry = `
    INSERT INTO pdf (filling_id)
    VALUES ($1)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, p.FillingID).Scan(&p.ID); err != nil {
		return fmt.Errorf("CreatePDF: %w", err)
	}
	return nil
}

func (r *Repository) GetPDF(ctx context.Context, id int64) (*models.PDF, error) {
	var p models.PDF
	const qry = `
    SELECT id, filling_id
    FROM pdf
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &p, qry, id); err != nil {
		return nil, fmt.Errorf("GetPDF: %w", err)
	}
	return &p, nil
}

func (r *Repository) UpdatePDF(ctx context.Context, p *models.PDF) error {
	const qry = `
    UPDATE pdf
    SET filling_id = $1
    WHERE id = $2
  `
	res, err := r.DB.ExecContext(ctx, qry, p.FillingID, p.ID)
	if err != nil {
		return fmt.Errorf("UpdatePDF: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdatePDF: no rows affected")
	}
	return nil
}

func (r *Repository) DeletePDF(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM pdf
    WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeletePDF: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeletePDF: no rows affected")
	}
	return nil
}
func (r *Repository) CreateQuiz(ctx context.Context, q *models.Quiz) error {
	const qry = `
    INSERT INTO quizzes (name, start, "end", returnable, random, "time", results_shown, try_count, filling_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry,
		q.Name, q.Start, q.End, q.Returnable, q.Random,
		q.TimeLimit, q.ResultsShown, q.TryCount, q.FillingID,
	).Scan(&q.ID); err != nil {
		return fmt.Errorf("CreateQuiz: %w", err)
	}
	return nil
}

func (r *Repository) GetQuiz(ctx context.Context, id int64) (*models.Quiz, error) {
	var q models.Quiz
	const qry = `
    SELECT id, name, start, "end", returnable, random, "time", results_shown, try_count, filling_id
    FROM quizzes
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &q, qry, id); err != nil {
		return nil, fmt.Errorf("GetQuiz: %w", err)
	}
	return &q, nil
}

func (r *Repository) UpdateQuiz(ctx context.Context, q *models.Quiz) error {
	const qry = `
    UPDATE quizzes
    SET name = $1,
        start = $2,
        "end" = $3,
        returnable = $4,
        random = $5,
        "time" = $6,
        results_shown = $7,
        try_count = $8,
        filling_id = $9
    WHERE id = $10
  `
	res, err := r.DB.ExecContext(ctx, qry,
		q.Name, q.Start, q.End, q.Returnable, q.Random,
		q.TimeLimit, q.ResultsShown, q.TryCount, q.FillingID, q.ID,
	)
	if err != nil {
		return fmt.Errorf("UpdateQuiz: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateQuiz: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteQuiz(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM quizzes WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteQuiz: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteQuiz: no rows affected")
	}
	return nil
}

func (r *Repository) CreateTask(ctx context.Context, t *models.Task) error {
	const qry = `
    INSERT INTO tasks (type, quiz_id)
    VALUES ($1, $2)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, t.Type, t.QuizID).Scan(&t.ID); err != nil {
		return fmt.Errorf("CreateTask: %w", err)
	}
	return nil
}

func (r *Repository) GetTask(ctx context.Context, id int64) (*models.Task, error) {
	var t models.Task
	const qry = `
    SELECT id, type, quiz_id
    FROM tasks
    WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &t, qry, id); err != nil {
		return nil, fmt.Errorf("GetTask: %w", err)
	}
	return &t, nil
}

func (r *Repository) UpdateTask(ctx context.Context, t *models.Task) error {
	const qry = `
    UPDATE tasks SET type = $1, quiz_id = $2 WHERE id = $3
  `
	res, err := r.DB.ExecContext(ctx, qry, t.Type, t.QuizID, t.ID)
	if err != nil {
		return fmt.Errorf("UpdateTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateTask: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteTask(ctx context.Context, id int64) error {
	const qry = `
    DELETE FROM tasks WHERE id = $1
  `
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteTask: no rows affected")
	}
	return nil
}

func (r *Repository) CreateOneAnsTask(ctx context.Context, o *models.OneAnsTask) error {
	const qry = `
    INSERT INTO one_ans_task (task_id, question)
    VALUES ($1, $2)
    RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, o.TaskID, o.Question).Scan(&o.ID); err != nil {
		return fmt.Errorf("CreateOneAnsTask: %w", err)
	}
	return nil
}

func (r *Repository) GetOneAnsTask(ctx context.Context, id int64) (*models.OneAnsTask, error) {
	var o models.OneAnsTask
	const qry = `
    SELECT id, task_id, question
    FROM one_ans_task WHERE id = $1
  `
	if err := r.DB.GetContext(ctx, &o, qry, id); err != nil {
		return nil, fmt.Errorf("GetOneAnsTask: %w", err)
	}
	return &o, nil
}

func (r *Repository) UpdateOneAnsTask(ctx context.Context, o *models.OneAnsTask) error {
	const qry = `
    UPDATE one_ans_task SET task_id=$1, question=$2 WHERE id=$3
  `
	res, err := r.DB.ExecContext(ctx, qry, o.TaskID, o.Question, o.ID)
	if err != nil {
		return fmt.Errorf("UpdateOneAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateOneAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteOneAnsTask(ctx context.Context, id int64) error {
	const qry = `DELETE FROM one_ans_task WHERE id=$1`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteOneAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteOneAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) CreateMultipleAnsTask(ctx context.Context, m *models.MultipleAnsTask) error {
	const qry = `
    INSERT INTO multiple_ans_task (task_id, question)
    VALUES ($1, $2) RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, m.TaskID, m.Question).Scan(&m.ID); err != nil {
		return fmt.Errorf("CreateMultipleAnsTask: %w", err)
	}
	return nil
}

func (r *Repository) GetMultipleAnsTask(ctx context.Context, id int64) (*models.MultipleAnsTask, error) {
	var m models.MultipleAnsTask
	const qry = `SELECT id, task_id, question FROM multiple_ans_task WHERE id=$1`
	if err := r.DB.GetContext(ctx, &m, qry, id); err != nil {
		return nil, fmt.Errorf("GetMultipleAnsTask: %w", err)
	}
	return &m, nil
}

func (r *Repository) UpdateMultipleAnsTask(ctx context.Context, m *models.MultipleAnsTask) error {
	const qry = `
    UPDATE multiple_ans_task SET task_id=$1, question=$2 WHERE id=$3
  `
	res, err := r.DB.ExecContext(ctx, qry, m.TaskID, m.Question, m.ID)
	if err != nil {
		return fmt.Errorf("UpdateMultipleAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateMultipleAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteMultipleAnsTask(ctx context.Context, id int64) error {
	const qry = `DELETE FROM multiple_ans_task WHERE id=$1`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteMultipleAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteMultipleAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) CreateOpenAnsTask(ctx context.Context, o *models.OpenAnsTask) error {
	const qry = `
    INSERT INTO open_ans_task (task_id, question)
    VALUES ($1, $2) RETURNING id
  `
	if err := r.DB.QueryRowxContext(ctx, qry, o.TaskID, o.Question).Scan(&o.ID); err != nil {
		return fmt.Errorf("CreateOpenAnsTask: %w", err)
	}
	return nil
}

func (r *Repository) GetOpenAnsTask(ctx context.Context, id int64) (*models.OpenAnsTask, error) {
	var o models.OpenAnsTask
	const qry = `SELECT id, task_id, question FROM open_ans_task WHERE id=$1`
	if err := r.DB.GetContext(ctx, &o, qry, id); err != nil {
		return nil, fmt.Errorf("GetOpenAnsTask: %w", err)
	}
	return &o, nil
}

func (r *Repository) UpdateOpenAnsTask(ctx context.Context, o *models.OpenAnsTask) error {
	const qry = `
    UPDATE open_ans_task SET task_id=$1, question=$2 WHERE id=$3
  `
	res, err := r.DB.ExecContext(ctx, qry, o.TaskID, o.Question, o.ID)
	if err != nil {
		return fmt.Errorf("UpdateOpenAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("UpdateOpenAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) DeleteOpenAnsTask(ctx context.Context, id int64) error {
	const qry = `DELETE FROM open_ans_task WHERE id=$1`
	res, err := r.DB.ExecContext(ctx, qry, id)
	if err != nil {
		return fmt.Errorf("DeleteOpenAnsTask: %w", err)
	}
	if rows, _ := res.RowsAffected(); rows == 0 {
		return fmt.Errorf("DeleteOpenAnsTask: no rows affected")
	}
	return nil
}

func (r *Repository) EnrollStudent(ctx context.Context, courseID, studentID int64) error {
	const qry = `
    INSERT INTO course_student (course_id, student_id)
    VALUES ($1, $2)
  `
	if _, err := r.DB.ExecContext(ctx, qry, courseID, studentID); err != nil {
		return fmt.Errorf("EnrollStudent: %w", err)
	}
	return nil
}

func (r *Repository) AssignTeacher(ctx context.Context, courseID, teacherID int64) error {
	const qry = `
    INSERT INTO course_teacher (course_id, teacher_id)
    VALUES ($1, $2)
  `
	if _, err := r.DB.ExecContext(ctx, qry, courseID, teacherID); err != nil {
		return fmt.Errorf("AssignTeacher: %w", err)
	}
	return nil
}

func (r *Repository) AddStudentToGroup(ctx context.Context, groupID, studentID int64) error {
	const qry = `
    INSERT INTO group_student (group_id, student_id)
    VALUES ($1, $2)
  `
	if _, err := r.DB.ExecContext(ctx, qry, groupID, studentID); err != nil {
		return fmt.Errorf("AddStudentToGroup: %w", err)
	}
	return nil
}

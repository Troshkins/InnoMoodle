package repository

import (
	"context"
	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/jmoiron/sqlx"
)

type CourseRepository struct {
	*BaseRepository
}

func NewCourseRepository(db *sqlx.DB) *CourseRepository {
	return &CourseRepository{
		BaseRepository: NewBaseRepository(db),
	}
}

func (r *CourseRepository) CreateCourse(ctx context.Context, course *models.Course) error {
	query := `
        INSERT INTO "Moodle".courses (name, completeness)
        VALUES ($1, $2)
        RETURNING id
    `
	return r.db.QueryRowContext(ctx, query,
		course.Name, course.Completeness).Scan(&course.ID)
}

func (r *CourseRepository) GetCourseByID(ctx context.Context, id int64) (*models.Course, error) {
	query := `
		SELECT id, name, completeness
		FROM "Moodle".courses
		WHERE id = $1
	`
	course := &models.Course{}
	err := r.Get(ctx, course, query, id)
	return course, err
}

func (r *CourseRepository) UpdateCourse(ctx context.Context, course *models.Course) error {
	query := `
		UPDATE "Moodle".courses
		SET name = $1, completeness = $2
		WHERE id = $3
	`
	_, err := r.Exec(ctx, query,
		course.Name, course.Completeness, course.ID)
	return err
}

func (r *CourseRepository) DeleteCourse(ctx context.Context, id int64) error {
	query := `DELETE FROM "Moodle".courses WHERE id = $1`
	_, err := r.Exec(ctx, query, id)
	return err
}

// Course relationships
func (r *CourseRepository) EnrollStudent(ctx context.Context, courseID, studentID int64) error {
	query := `
		INSERT INTO "Moodle".course_student (course_id, student_id)
		VALUES ($1, $2)
		ON CONFLICT (course_id, student_id) DO NOTHING
	`
	_, err := r.Exec(ctx, query, courseID, studentID)
	return err
}

func (r *CourseRepository) AssignTeacher(ctx context.Context, courseID, teacherID int64) error {
	query := `
		INSERT INTO "Moodle".course_teacher (course_id, teacher_id)
		VALUES ($1, $2)
		ON CONFLICT (course_id, teacher_id) DO NOTHING
	`
	_, err := r.Exec(ctx, query, courseID, teacherID)
	return err
}

// Course Block methods
func (r *CourseRepository) CreateCourseBlock(ctx context.Context, block *models.CourseBlock) error {
	query := `
		INSERT INTO "Moodle".course_blocks (name, course_id)
		VALUES ($1, $2)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		block.Name, block.CourseID).Scan(&block.ID)
}

func (r *CourseRepository) GetCourseBlockByID(ctx context.Context, id int64) (*models.CourseBlock, error) {
	query := `
		SELECT id, name, course_id
		FROM "Moodle".course_blocks
		WHERE id = $1
	`
	block := &models.CourseBlock{}
	err := r.Get(ctx, block, query, id)
	return block, err
}

func (r *CourseRepository) UpdateCourseBlock(ctx context.Context, block *models.CourseBlock) error {
	query := `
		UPDATE "Moodle".course_blocks
		SET name = $1, updated_at = NOW()
		WHERE id = $2
	`
	_, err := r.Exec(ctx, query, block.Name, block.ID)
	return err
}

func (r *CourseRepository) CreateAnnouncement(ctx context.Context, announcement *models.Announcement) error {
	query := `
		INSERT INTO "Moodle".announcements (name, info, block_id)
		VALUES ($1, $2, $3)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		announcement.Name, announcement.Info, announcement.BlockID).Scan(&announcement.ID)
}

func (r *CourseRepository) GetAllCourses(ctx context.Context) ([]*models.Course, error) {
	query := `
		SELECT id, name, completeness
		FROM "Moodle".courses
		ORDER BY id
	`
	var courses []*models.Course
	err := r.Select(ctx, &courses, query)
	return courses, err
}

func (r *CourseRepository) GetCoursesByUserEmail(ctx context.Context, email string) ([]*models.Course, error) {
	query := `
		SELECT DISTINCT c.id, c.name, c.completeness
		FROM "Moodle".courses c
		LEFT JOIN "Moodle".course_student cs ON c.id = cs.course_id
		LEFT JOIN "Moodle".course_teacher ct ON c.id = ct.course_id
		LEFT JOIN "Moodle".users u ON (cs.student_id = u.id OR ct.teacher_id = u.id)
		WHERE u.email = $1
		ORDER BY c.id
	`
	var courses []*models.Course
	err := r.Select(ctx, &courses, query, email)
	return courses, err
}

func (r *CourseRepository) GetCourseTeachers(ctx context.Context, courseID int64) ([]*models.User, error) {
	query := `
		SELECT u.id, u.name, u.email, u.role, u.status
		FROM "Moodle".users u
		JOIN "Moodle".course_teacher ct ON u.id = ct.teacher_id
		WHERE ct.course_id = $1
		ORDER BY u.name
	`
	var users []*models.User
	err := r.Select(ctx, &users, query, courseID)
	return users, err
}

func (r *CourseRepository) RemoveTeacherFromCourse(ctx context.Context, courseID, teacherID int64) error {
	query := `DELETE FROM "Moodle".course_teacher WHERE course_id = $1 AND teacher_id = $2`
	_, err := r.Exec(ctx, query, courseID, teacherID)
	return err
}

func (r *CourseRepository) GetCourseStudents(ctx context.Context, courseID int64) ([]*models.User, error) {
	query := `
		SELECT u.id, u.name, u.email, u.role, u.status
		FROM "Moodle".users u
		JOIN "Moodle".course_student cs ON u.id = cs.student_id
		WHERE cs.course_id = $1
		ORDER BY u.name
	`
	var users []*models.User
	err := r.Select(ctx, &users, query, courseID)
	return users, err
}

func (r *CourseRepository) RemoveStudentFromCourse(ctx context.Context, courseID, studentID int64) error {
	query := `DELETE FROM "Moodle".course_student WHERE course_id = $1 AND student_id = $2`
	_, err := r.Exec(ctx, query, courseID, studentID)
	return err
}

func (r *CourseRepository) GetCourseBlocks(ctx context.Context, courseID int64) ([]*models.CourseBlock, error) {
	query := `SELECT id, name, course_id, "order", created_at, updated_at FROM "Moodle".course_blocks WHERE course_id = $1 ORDER BY "order", id`
	var blocks []*models.CourseBlock
	err := r.Select(ctx, &blocks, query, courseID)
	return blocks, err
}

// GetDB returns the database connection for use in other repositories
func (r *CourseRepository) GetDB() *sqlx.DB {
    return r.BaseRepository.db
}

// Theme methods
func (r *CourseRepository) CreateTheme(ctx context.Context, theme *models.Theme) error {
	query := `
		INSERT INTO "Moodle".themes (title, description, course_id, "order")
		VALUES ($1, $2, $3, $4)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		theme.Title, theme.Description, theme.CourseID, theme.Order).Scan(&theme.ID)
}

func (r *CourseRepository) GetThemesByCourseID(ctx context.Context, courseID int64) ([]*models.Theme, error) {
	query := `
		SELECT id, title, description, course_id, "order", created_at, updated_at
		FROM "Moodle".themes
		WHERE course_id = $1
		ORDER BY "order", id
	`
	var themes []*models.Theme
	err := r.Select(ctx, &themes, query, courseID)
	return themes, err
}

func (r *CourseRepository) UpdateTheme(ctx context.Context, theme *models.Theme) error {
	query := `
		UPDATE "Moodle".themes
		SET title = $1, description = $2, updated_at = NOW()
		WHERE id = $3
	`
	_, err := r.Exec(ctx, query, theme.Title, theme.Description, theme.ID)
	return err
}

func (r *CourseRepository) DeleteTheme(ctx context.Context, themeID int64) error {
	query := `DELETE FROM "Moodle".themes WHERE id = $1`
	_, err := r.Exec(ctx, query, themeID)
	return err
}

// Assignment methods
func (r *CourseRepository) CreateAssignment(ctx context.Context, assignment *models.Assignment) error {
	query := `
		INSERT INTO "Moodle".assignments (title, description, type, theme_id, "order")
		VALUES ($1, $2, $3, $4, $5)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		assignment.Title, assignment.Description, assignment.Type, assignment.ThemeID, assignment.Order).Scan(&assignment.ID)
}

func (r *CourseRepository) GetAssignmentsByThemeID(ctx context.Context, themeID int64) ([]*models.Assignment, error) {
	query := `
		SELECT id, title, description, type, theme_id, "order", created_at, updated_at
		FROM "Moodle".assignments
		WHERE theme_id = $1
		ORDER BY "order", id
	`
	var assignments []*models.Assignment
	err := r.Select(ctx, &assignments, query, themeID)
	return assignments, err
}

func (r *CourseRepository) UpdateAssignment(ctx context.Context, assignment *models.Assignment) error {
	query := `
		UPDATE "Moodle".assignments
		SET title = $1, description = $2, type = $3, updated_at = NOW()
		WHERE id = $4
	`
	_, err := r.Exec(ctx, query, assignment.Title, assignment.Description, assignment.Type, assignment.ID)
	return err
}

func (r *CourseRepository) DeleteAssignment(ctx context.Context, assignmentID int64) error {
	query := `DELETE FROM "Moodle".assignments WHERE id = $1`
	_, err := r.Exec(ctx, query, assignmentID)
	return err
}

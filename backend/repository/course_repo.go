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
	`
	_, err := r.Exec(ctx, query, courseID, studentID)
	return err
}

func (r *CourseRepository) AssignTeacher(ctx context.Context, courseID, teacherID int64) error {
	query := `
		INSERT INTO "Moodle".course_teacher (course_id, teacher_id)
		VALUES ($1, $2)
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

func (r *CourseRepository) CreateAnnouncement(ctx context.Context, announcement *models.Announcement) error {
	query := `
		INSERT INTO "Moodle".announcements (name, info, block_id)
		VALUES ($1, $2, $3)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		announcement.Name, announcement.Info, announcement.BlockID).Scan(&announcement.ID)
}

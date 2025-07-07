package repository

import (
	"context"

	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/jmoiron/sqlx"
)

type GroupRepository struct {
	*BaseRepository
}

func NewGroupRepository(db *sqlx.DB) *GroupRepository {
	return &GroupRepository{
		BaseRepository: NewBaseRepository(db),
	}
}

func (r *GroupRepository) CreateStudyGroup(ctx context.Context, group *models.StudyGroup) error {
	query := `
		INSERT INTO "Moodle".study_groups (name)
		VALUES ($1)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query, group.Name).Scan(&group.ID)
}

func (r *GroupRepository) AddStudentToGroup(ctx context.Context, groupID, studentID int64) error {
	query := `
		INSERT INTO "Moodle".group_student (group_id, student_id)
		VALUES ($1, $2)
	`
	_, err := r.Exec(ctx, query, groupID, studentID)
	return err
}

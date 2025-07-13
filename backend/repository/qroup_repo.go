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

func (r *GroupRepository) GetStudyGroupByID(ctx context.Context, id int64) (*models.StudyGroup, error) {
	query := `
		SELECT id, name
		FROM "Moodle".study_groups
		WHERE id = $1
	`
	group := &models.StudyGroup{}
	err := r.Get(ctx, group, query, id)
	return group, err
}

func (r *GroupRepository) UpdateStudyGroup(ctx context.Context, group *models.StudyGroup) error {
	query := `
		UPDATE "Moodle".study_groups
		SET name = $1
		WHERE id = $2
	`
	_, err := r.Exec(ctx, query, group.Name, group.ID)
	return err
}

func (r *GroupRepository) DeleteStudyGroup(ctx context.Context, id int64) error {
	query := `DELETE FROM "Moodle".study_groups WHERE id = $1`
	_, err := r.Exec(ctx, query, id)
	return err
}

func (r *GroupRepository) GetAllStudyGroups(ctx context.Context) ([]*models.StudyGroup, error) {
	query := `
		SELECT id, name
		FROM "Moodle".study_groups
		ORDER BY id
	`
	var groups []*models.StudyGroup
	err := r.Select(ctx, &groups, query)
	return groups, err
}

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

func (r *GroupRepository) GetStudyGroupByID(ctx context.Context, id int64) (*models.StudyGroup, error) {
	query := `
		SELECT id, name, description, status, created_at, updated_at
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
		SET name = $1, description = $2, status = $3, updated_at = CURRENT_TIMESTAMP
		WHERE id = $4
	`
	_, err := r.Exec(ctx, query, group.Name, group.Description, group.Status, group.ID)
	return err
}

func (r *GroupRepository) DeleteStudyGroup(ctx context.Context, id int64) error {
	// First delete all group members
	_, err := r.Exec(ctx, `DELETE FROM "Moodle".group_student WHERE group_id = $1`, id)
	if err != nil {
		return err
	}

	// Then delete the group
	query := `DELETE FROM "Moodle".study_groups WHERE id = $1`
	_, err = r.Exec(ctx, query, id)
	return err
}

func (r *GroupRepository) GetAllStudyGroups(ctx context.Context) ([]*models.StudyGroup, error) {
	query := `
		SELECT id, name, description, status, created_at, updated_at
		FROM "Moodle".study_groups
		ORDER BY name
	`
	var groups []*models.StudyGroup
	err := r.Select(ctx, &groups, query)
	return groups, err
}

func (r *GroupRepository) AddStudentToGroup(ctx context.Context, groupID, studentID int64) error {
	query := `
		INSERT INTO "Moodle".group_student (group_id, student_id)
		VALUES ($1, $2)
		ON CONFLICT (group_id, student_id) DO NOTHING
	`
	_, err := r.Exec(ctx, query, groupID, studentID)
	return err
}

func (r *GroupRepository) RemoveStudentFromGroup(ctx context.Context, groupID, studentID int64) error {
	query := `
		DELETE FROM "Moodle".group_student
		WHERE group_id = $1 AND student_id = $2
	`
	_, err := r.Exec(ctx, query, groupID, studentID)
	return err
}

func (r *GroupRepository) GetGroupMembers(ctx context.Context, groupID int64) ([]*models.User, error) {
	query := `
		SELECT u.id, u.name, u.email, u.role, u.status
		FROM "Moodle".users u
		JOIN "Moodle".group_student gs ON u.id = gs.student_id
		WHERE gs.group_id = $1
		ORDER BY u.name
	`
	var users []*models.User
	err := r.Select(ctx, &users, query, groupID)
	return users, err
}

// GetDB returns the database connection for use in other repositories
func (r *GroupRepository) GetDB() *sqlx.DB {
	return r.db
}

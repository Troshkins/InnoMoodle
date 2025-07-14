package repository

import (
	"context"
	"fmt"

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
	// First, check if the group exists
	groupExists, err := r.groupExists(ctx, groupID)
	if err != nil {
		return fmt.Errorf("failed to check if group exists: %w", err)
	}
	if !groupExists {
		return fmt.Errorf("group with ID %d does not exist", groupID)
	}

	// Check if the user exists
	userExists, err := r.userExists(ctx, studentID)
	if err != nil {
		return fmt.Errorf("failed to check if user exists: %w", err)
	}
	if !userExists {
		return fmt.Errorf("user with ID %d does not exist", studentID)
	}

	// Check if the student is already in the group
	alreadyInGroup, err := r.studentInGroup(ctx, groupID, studentID)
	if err != nil {
		return fmt.Errorf("failed to check if student is already in group: %w", err)
	}
	if alreadyInGroup {
		return fmt.Errorf("student %d is already in group %d", studentID, groupID)
	}

	// Add student to group
	query := `
		INSERT INTO "Moodle".group_student (group_id, student_id)
		VALUES ($1, $2)
	`
	_, err = r.Exec(ctx, query, groupID, studentID)
	if err != nil {
		return fmt.Errorf("failed to add student to group: %w", err)
	}

	return nil
}

// Helper methods for validation
func (r *GroupRepository) groupExists(ctx context.Context, groupID int64) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM "Moodle".study_groups WHERE id = $1)`
	var exists bool
	err := r.Get(ctx, &exists, query, groupID)
	return exists, err
}

func (r *GroupRepository) userExists(ctx context.Context, userID int64) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM "Moodle".users WHERE id = $1)`
	var exists bool
	err := r.Get(ctx, &exists, query, userID)
	return exists, err
}

func (r *GroupRepository) studentInGroup(ctx context.Context, groupID, studentID int64) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM "Moodle".group_student WHERE group_id = $1 AND student_id = $2)`
	var exists bool
	err := r.Get(ctx, &exists, query, groupID, studentID)
	return exists, err
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

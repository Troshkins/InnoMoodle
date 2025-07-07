package repository

import (
	"context"
	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/jmoiron/sqlx"
)

type UserRepository struct {
	*BaseRepository
}

func NewUserRepository(db *sqlx.DB) *UserRepository {
	return &UserRepository{
		BaseRepository: NewBaseRepository(db),
	}
}

func (r *UserRepository) CreateUser(ctx context.Context, user *models.User) error {
	query := `
		INSERT INTO "Moodle".users (name, email, password)
		VALUES ($1, $2, $3)
		RETURNING id
	`

	return r.db.QueryRowContext(ctx, query,
		user.Name, user.Email, user.Password).Scan(&user.ID)
}

func (r *UserRepository) GetUserByID(ctx context.Context, id int64) (*models.User, error) {
	query := `SELECT id, name, email, password FROM "Moodle".users
		WHERE id = $1
	`
	user := &models.User{}
	err := r.Get(ctx, user, query, id)
	return user, err
}

func (r *UserRepository) GetUserByEmail(ctx context.Context, email string) (*models.User, error) {
	query := `
		SELECT id, name, email, password
		FROM "Moodle".users
		WHERE email = $1
	`
	user := &models.User{}
	err := r.Get(ctx, user, query, email)
	return user, err
}

func (r *UserRepository) UpdateUser(ctx context.Context, user *models.User) error {
	query := `
		UPDATE "Moodle".users
		SET name = $1, email = $2, password = $3
		WHERE id = $4
	`
	_, err := r.Exec(ctx, query,
		user.Name, user.Email, user.Password, user.ID)
	return err
}

func (r *UserRepository) DeleteUser(ctx context.Context, id int64) error {
	query := `DELETE FROM "Moodle".users WHERE id = $1`
	_, err := r.Exec(ctx, query, id)
	return err
}

// Admin methods
func (r *UserRepository) CreateAdmin(ctx context.Context, admin *models.Admin) error {
	query := `
		INSERT INTO "Moodle".admins (email, password)
		VALUES ($1, $2)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		admin.Email, admin.Password).Scan(&admin.ID)
}

func (r *UserRepository) GetAdminByID(ctx context.Context, id int64) (*models.Admin, error) {
	query := `
		SELECT id, email, password
		FROM "Moodle".admins
		WHERE id = $1
	`
	admin := &models.Admin{}
	err := r.Get(ctx, admin, query, id)
	return admin, err
}

func (r *UserRepository) GetAdminByEmail(ctx context.Context, email string) (*models.Admin, error) {
	query := `
		SELECT id, email, password
		FROM "Moodle".admins
		WHERE email = $1
	`
	admin := &models.Admin{}
	err := r.Get(ctx, admin, query, email)
	return admin, err
}

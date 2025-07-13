package services

import (
	"context"
	"errors"

	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/Troshkins/InnoMoodle/backend/repository"
)

type UserService struct {
	Repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{Repo: repo}
}

func (s *UserService) RegisterUser(ctx context.Context, user *models.User) error {
	// Check if user with this email already exists
	existing, _ := s.Repo.GetUserByEmail(ctx, user.Email)
	if existing != nil && existing.ID != 0 {
		return errors.New("email already in use")
	}

	// Set default password if none provided
	if user.Password == "" {
		user.Password = "defaultpassword123"
	}

	// Set password (plain text for testing)
	if err := user.SetPassword(user.Password); err != nil {
		return err
	}

	// Set creation timestamps
	user.BeforeCreate()

	// Create user in database
	return s.Repo.CreateUser(ctx, user)
}

func (s *UserService) GetUserByID(ctx context.Context, id int64) (*models.User, error) {
	return s.Repo.GetUserByID(ctx, id)
}

func (s *UserService) UpdateUser(ctx context.Context, user *models.User) error {
	return s.Repo.UpdateUser(ctx, user)
}

func (s *UserService) DeleteUser(ctx context.Context, id int64) error {
	return s.Repo.DeleteUser(ctx, id)
}

func (s *UserService) GetAllUsers(ctx context.Context) ([]*models.User, error) {
	return s.Repo.GetAllUsers(ctx)
}
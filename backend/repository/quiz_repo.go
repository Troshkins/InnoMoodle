package repository

import (
	"context"
	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/jmoiron/sqlx"
)

type QuizRepository struct {
	*BaseRepository
}

func NewQuizRepository(db *sqlx.DB) *QuizRepository {
	return &QuizRepository{
		BaseRepository: NewBaseRepository(db),
	}
}

func (r *QuizRepository) CreateQuiz(ctx context.Context, quiz *models.Quiz) error {
	query := `
		INSERT INTO "Moodle".quizzes 
			(name, start, "end", returnable, random, "time", results_shown, try_count, filling_id)
		VALUES 
			(:name, :start, :end, :returnable, :random, :time, :results_shown, :try_count, :filling_id)
		RETURNING id
	`
	namedQuery, args, err := sqlx.Named(query, quiz)
	if err != nil {
		return err
	}
	return r.db.QueryRowContext(ctx, namedQuery, args...).Scan(&quiz.ID)
}

func (r *QuizRepository) GetQuizByID(ctx context.Context, id int64) (*models.Quiz, error) {
	query := `
		SELECT 
			id, name, start, "end", returnable, random, "time", 
			results_shown, try_count, filling_id
		FROM "Moodle".quizzes
		WHERE id = $1
	`
	quiz := &models.Quiz{}
	err := r.Get(ctx, quiz, query, id)
	return quiz, err
}

func (r *QuizRepository) CreateTask(ctx context.Context, task *models.Task) error {
	query := `
		INSERT INTO "Moodle".tasks (type, quiz_id)
		VALUES ($1, $2)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		task.Type, task.QuizID).Scan(&task.ID)
}

func (r *QuizRepository) CreateOneAnsTask(ctx context.Context, task *models.OneAnsTask) error {
	query := `
		INSERT INTO "Moodle".one_ans_task (task_id, question)
		VALUES ($1, $2)
		RETURNING id
	`
	return r.db.QueryRowContext(ctx, query,
		task.TaskID, task.Question).Scan(&task.ID)
}

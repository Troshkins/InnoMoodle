package models

import "time"

type QuizStatus string

const (
	QuizStatusDraft     QuizStatus = "draft"
	QuizStatusActive    QuizStatus = "active"
	QuizStatusInactive  QuizStatus = "inactive"
	QuizStatusArchived  QuizStatus = "archived"
)

type Quiz struct {
	ID           int64      `db:"id" json:"id"`
	Name         string     `db:"name" json:"name"`
	Description  *string    `db:"description" json:"description,omitempty"`
	Start        *time.Time `db:"start" json:"start,omitempty"`
	End          *time.Time `db:"end" json:"end,omitempty"`
	Returnable   bool       `db:"returnable" json:"returnable"`
	Random       bool       `db:"random" json:"random"`
	TimeLimit    int        `db:"time" json:"time_limit"`
	ResultsShown bool       `db:"results_shown" json:"results_shown"`
	TryCount     int        `db:"try_count" json:"try_count"`
	FillingID    int64      `db:"filling_id" json:"filling_id"`
	Status       QuizStatus `db:"status" json:"status"`
	CreatedAt    time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time  `db:"updated_at" json:"updated_at"`
}

func (q *Quiz) BeforeCreate() {
	now := time.Now()
	q.CreatedAt = now
	q.UpdatedAt = now
	if q.Status == "" {
		q.Status = QuizStatusDraft
	}
}

func (q *Quiz) BeforeUpdate() {
	q.UpdatedAt = time.Now()
}

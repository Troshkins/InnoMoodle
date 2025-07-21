package models

import "time"

type Theme struct {
	ID          int64     `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Description string    `db:"description" json:"description"`
	CourseID    int64     `db:"course_id" json:"course_id"`
	Order       int       `db:"order" json:"order"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}

func (t *Theme) BeforeCreate() {
	now := time.Now()
	t.CreatedAt = now
	t.UpdatedAt = now
}

func (t *Theme) BeforeUpdate() {
	t.UpdatedAt = time.Now()
}
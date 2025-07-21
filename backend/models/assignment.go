package models

import "time"

type Assignment struct {
	ID          int64     `db:"id" json:"id"`
	Title       string    `db:"title" json:"title"`
	Description string    `db:"description" json:"description"`
	Type        string    `db:"type" json:"type"` // "assignment" or "quiz"
	ThemeID     int64     `db:"theme_id" json:"theme_id"`
	Order       int       `db:"order" json:"order"`
	CreatedAt   time.Time `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time `db:"updated_at" json:"updated_at"`
}

func (a *Assignment) BeforeCreate() {
	now := time.Now()
	a.CreatedAt = now
	a.UpdatedAt = now
}

func (a *Assignment) BeforeUpdate() {
	a.UpdatedAt = time.Now()
}
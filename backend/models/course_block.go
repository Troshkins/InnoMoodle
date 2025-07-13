package models

import "time"

type CourseBlock struct {
	ID        int64     `db:"id" json:"id"`
	Name      string    `db:"name" json:"name"`
	CourseID  int64     `db:"course_id" json:"course_id"`
	Order     int       `db:"order" json:"order"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

type Announcement struct {
	ID        int64     `db:"id" json:"id"`
	Name      string    `db:"name" json:"name"`
	Info      string    `db:"info" json:"info"`
	BlockID   int64     `db:"block_id" json:"block_id"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

func (cb *CourseBlock) BeforeCreate() {
	now := time.Now()
	cb.CreatedAt = now
	cb.UpdatedAt = now
}

func (cb *CourseBlock) BeforeUpdate() {
	cb.UpdatedAt = time.Now()
}

func (a *Announcement) BeforeCreate() {
	now := time.Now()
	a.CreatedAt = now
	a.UpdatedAt = now
}

func (a *Announcement) BeforeUpdate() {
	a.UpdatedAt = time.Now()
}

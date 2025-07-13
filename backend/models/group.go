package models

import "time"

type GroupStatus string

const (
	GroupStatusActive   GroupStatus = "active"
	GroupStatusInactive GroupStatus = "inactive"
	GroupStatusArchived GroupStatus = "archived"
)

type StudyGroup struct {
	ID          int64      `db:"id" json:"id"`
	Name        string     `db:"name" json:"name"`
	Description *string    `db:"description" json:"description,omitempty"`
	Status      GroupStatus `db:"status" json:"status"`
	CreatedAt   time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt   time.Time  `db:"updated_at" json:"updated_at"`
}

type GroupStudent struct {
	ID        int64     `db:"id" json:"id"`
	StudentID int64     `db:"student_id" json:"student_id"`
	GroupID   int64     `db:"group_id" json:"group_id"`
	JoinedAt  time.Time `db:"joined_at" json:"joined_at"`
}

func (g *StudyGroup) BeforeCreate() {
	now := time.Now()
	g.CreatedAt = now
	g.UpdatedAt = now
	if g.Status == "" {
		g.Status = GroupStatusActive
	}
}

func (g *StudyGroup) BeforeUpdate() {
	g.UpdatedAt = time.Now()
}

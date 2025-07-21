package models

import "time"

type CourseStatus string

const (
	CourseStatusDraft     CourseStatus = "draft"
	CourseStatusPublished CourseStatus = "published"
	CourseStatusArchived  CourseStatus = "archived"
)

type Course struct {
	ID           int64        `db:"id" json:"id"`
	Name         string       `db:"name" json:"name"`
	ShortName    *string      `db:"short_name" json:"shortName,omitempty"`
	ChatLink     *string      `db:"chat_link" json:"chatLink,omitempty"`
	Description  *string      `db:"description" json:"description,omitempty"`
	Completeness int          `db:"completeness" json:"completeness"`
	Status       CourseStatus `db:"status" json:"status"`
	ImageURL     *string      `db:"image_url" json:"image,omitempty"`
	Visibility   *string      `db:"visibility" json:"visibility,omitempty"`
	AllowDownload *string     `db:"allow_download" json:"allowDownload,omitempty"`
	StartDate    *time.Time   `db:"start_date" json:"startDate,omitempty"`
	ShowDates    *string      `db:"show_dates" json:"showDates,omitempty"`
	CreatedAt    time.Time    `db:"created_at" json:"created_at"`
	UpdatedAt    time.Time    `db:"updated_at" json:"updated_at"`
}

type CourseStudent struct {
	CourseID  int64     `db:"course_id" json:"course_id"`
	StudentID int64     `db:"student_id" json:"student_id"`
	EnrolledAt time.Time `db:"enrolled_at" json:"enrolled_at"`
}

type CourseTeacher struct {
	TeacherID   int64     `db:"teacher_id" json:"teacher_id"`
	CourseID    int64     `db:"course_id" json:"course_id"`
	AssignedAt  time.Time `db:"assigned_at" json:"assigned_at"`
}

func (c *Course) BeforeCreate() {
	now := time.Now()
	c.CreatedAt = now
	c.UpdatedAt = now
	if c.Status == "" {
		c.Status = CourseStatusDraft
	}
}

func (c *Course) BeforeUpdate() {
	c.UpdatedAt = time.Now()
}

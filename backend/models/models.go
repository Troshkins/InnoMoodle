package models

import (
	"database/sql"
	"time"
)

type User struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	Password string `db:"password" json:"-"`
	Email    string `db:"email" json:"email"`
}

type Admin struct {
	ID       int64  `db:"id" json:"id"`
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"-"`
}

type Course struct {
	ID           int64  `db:"id" json:"id"`
	Name         string `db:"name" json:"name"`
	Completeness bool   `db:"completeness" json:"completeness"`
}

type StudyGroup struct {
	ID   int64  `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

type CourseBlock struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	CourseID int64  `db:"course_id" json:"course_id"`
}

type Announcement struct {
	ID      int64          `db:"id" json:"id"`
	Name    string         `db:"name" json:"name"`
	Info    sql.NullString `db:"info" json:"info"`
	BlockID int64          `db:"block_id" json:"block_id"`
}

type Filling struct {
	ID      int64 `db:"id" json:"id"`
	BlockID int64 `db:"block_id" json:"block_id"`
}

type PDF struct {
	ID        int64 `db:"id" json:"id"`
	FillingID int64 `db:"filling_id" json:"filling_id"`
}

type Quiz struct {
	ID           int64     `db:"id" json:"id"`
	Name         string    `db:"name" json:"name"`
	Start        time.Time `db:"start" json:"start"`
	End          time.Time `db:"end" json:"end"`
	Returnable   bool      `db:"returnable" json:"returnable"`
	Random       bool      `db:"random" json:"random"`
	TimeLimit    int       `db:"time" json:"time_limit"`
	ResultsShown bool      `db:"results_shown" json:"results_shown"`
	TryCount     int       `db:"try_count" json:"try_count"`
	FillingID    int64     `db:"filling_id" json:"filling_id"`
}

type Task struct {
	ID     int64 `db:"id" json:"id"`
	Type   int   `db:"type" json:"type"`
	QuizID int64 `db:"quiz_id" json:"quiz_id"`
}

type OneAnsTask struct {
	ID       int64  `db:"id" json:"id"`
	TaskID   int64  `db:"task_id" json:"task_id"`
	Question string `db:"question" json:"question"`
}

type MultipleAnsTask struct {
	ID       int64          `db:"id" json:"id"`
	TaskID   int64          `db:"task_id" json:"task_id"`
	Question sql.NullString `db:"question" json:"question"`
}

type OpenAnsTask struct {
	ID       int64          `db:"id" json:"id"`
	TaskID   int64          `db:"task_id" json:"task_id"`
	Question sql.NullString `db:"question" json:"question"`
}

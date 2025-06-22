package models

import (
	"database/sql"
	"time"
)

// User = пользователь (студент или преподаватель)
type User struct {
	ID       int64
	Name     string
	Password string
	Email    string
}

// Admin = администратор
type Admin struct {
	ID       int64
	Email    string
	Password string
}

// Course = курс
type Course struct {
	ID           int64
	Name         string
	Completeness bool
}

// StudyGroup = учебная группа
type StudyGroup struct {
	ID   int64
	Name string
}

// CourseBlock = блок содержимого курса
type CourseBlock struct {
	ID       int64
	Name     string
	CourseID int64
}

// Announcement = объявление к блоку
type Announcement struct {
	ID      int64
	Name    string
	Info    sql.NullString
	BlockID int64
}

// Filling = наполнение блока
type Filling struct {
	ID      int64
	BlockID int64
}

// PDF = PDF-документ к наполнению
type PDF struct {
	FillingID int64
}

// Quiz = тест/викторина
type Quiz struct {
	ID           int64
	Name         string
	Start        time.Time
	End          time.Time
	Returnable   bool
	Random       bool
	TimeLimit    int
	ResultsShown bool
	TryCount     int
	FillingID    int64
}

// Task = задание
type Task struct {
	ID     int64
	Type   int
	QuizID int64
}

// OneAnsTask, MultipleAnsTask, OpenAnsTask
type OneAnsTask struct {
	ID       int64
	TaskID   int64
	Question string
}

type MultipleAnsTask struct {
	ID       int64
	TaskID   int64
	Question sql.NullString
}

type OpenAnsTask struct {
	ID       int64
	TaskID   int64
	Question sql.NullString
}

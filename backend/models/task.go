package models

type TaskType int

const (
	TaskTypeOneAnswer TaskType = iota + 1
	TaskTypeMultipleAnswer
	TaskTypeOpenAnswer
)

type Task struct {
	ID     int64    `db:"id" json:"id"`
	Type   TaskType `db:"type" json:"type"`
	QuizID int64    `db:"quiz_id" json:"quiz_id"`
}

type OneAnsTask struct {
	ID       int64  `db:"id" json:"id"`
	TaskID   int64  `db:"task_id" json:"task_id"`
	Question string `db:"question" json:"question"`
}

type MultipleAnsTask struct {
	ID       int64  `db:"id" json:"id"`
	TaskID   int64  `db:"task_id" json:"task_id"`
	Question string `db:"question" json:"question"`
}

type OpenAnsTask struct {
	ID       int64  `db:"id" json:"id"`
	TaskID   int64  `db:"task_id" json:"task_id"`
	Question string `db:"question" json:"question"`
}

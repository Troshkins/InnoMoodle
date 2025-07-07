package models

type StudyGroup struct {
	ID   int64  `db:"id" json:"id"`
	Name string `db:"name" json:"name"`
}

type GroupStudent struct {
	ID        int64 `db:"id" json:"id"`
	StudentID int64 `db:"student_id" json:"student_id"`
	GroupID   int64 `db:"group_id" json:"group_id"`
}

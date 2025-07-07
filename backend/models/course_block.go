package models

type CourseBlock struct {
	ID       int64  `db:"id" json:"id"`
	Name     string `db:"name" json:"name"`
	CourseID int64  `db:"course_id" json:"course_id"`
}

type Announcement struct {
	ID      int64  `db:"id" json:"id"`
	Name    string `db:"name" json:"name"`
	Info    string `db:"info" json:"info"`
	BlockID int64  `db:"block_id" json:"block_id"`
}

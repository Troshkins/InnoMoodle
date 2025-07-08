package models

type Course struct {
	ID           int64  `db:"id" json:"id"`
	Name         string `db:"name" json:"name"`
	Completeness int    `db:"completeness" json:"completeness"`
}

type CourseStudent struct {
	CourseID  int64 `db:"course_id" json:"course_id"`
	StudentID int64 `db:"student_id" json:"student_id"`
}

type CourseTeacher struct {
	TeacherID int64 `db:"teacher_id" json:"teacher_id"`
	CourseID  int64 `db:"course_id" json:"course_id"`
}

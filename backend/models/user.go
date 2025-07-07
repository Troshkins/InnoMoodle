package models

import _ "time"

type UserRole string

const (
	RoleStudent UserRole = "student"
	RoleTeacher UserRole = "teacher"
	RoleAdmin   UserRole = "admin"
)

type User struct {
	ID       int64    `db:"id" json:"id"`
	Name     string   `db:"name" json:"name"`
	Email    string   `db:"email" json:"email"`
	Password string   `db:"password" json:"-"`
	Role     UserRole `db:"-" json:"role"`
}

type Admin struct {
	ID       int64  `db:"id" json:"id"`
	Email    string `db:"email" json:"email"`
	Password string `db:"password" json:"-"`
}

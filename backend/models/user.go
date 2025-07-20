package models

import (
	"time"
)

type UserRole string

const (
	RoleUser  UserRole = "user"
	RoleAdmin UserRole = "admin"
)

type UserStatus string

const (
	StatusActive   UserStatus = "active"
	StatusInactive UserStatus = "inactive"
	StatusSuspended UserStatus = "suspended"
)

type User struct {
	ID        int64      `db:"id" json:"id"`
	Name      string     `db:"name" json:"name"`
	Email     string     `db:"email" json:"email"`
	Password  string     `db:"password" json:"-"`
	Role      UserRole   `db:"role" json:"role"`
	Status    UserStatus `db:"status" json:"status"`
	Avatar    *string    `db:"avatar" json:"avatar,omitempty"`
	Bio       *string    `db:"bio" json:"bio,omitempty"`
	CreatedAt time.Time  `db:"created_at" json:"created_at"`
	UpdatedAt time.Time  `db:"updated_at" json:"updated_at"`
}

type Admin struct {
	ID        int64     `db:"id" json:"id"`
	Email     string    `db:"email" json:"email"`
	Password  string    `db:"password" json:"-"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	UpdatedAt time.Time `db:"updated_at" json:"updated_at"`
}

func (u *User) SetPassword(password string) error {
	// Plain text password storage (INSECURE, for testing only)
	u.Password = password
	return nil
}

func (u *User) CheckPassword(password string) bool {
	// Plain text password comparison (INSECURE, for testing only)
	return u.Password == password
}

func (u *User) BeforeCreate() {
	now := time.Now()
	u.CreatedAt = now
	u.UpdatedAt = now
	if u.Status == "" {
		u.Status = StatusActive
	}
	if u.Role == "" {
		u.Role = RoleUser
	}
}

func (u *User) BeforeUpdate() {
	u.UpdatedAt = time.Now()
}

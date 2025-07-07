package models

import "time"

type Quiz struct {
	ID           int64      `db:"id" json:"id"`
	Name         string     `db:"name" json:"name"`
	Start        *time.Time `db:"start" json:"start,omitempty"`
	End          *time.Time `db:"end" json:"end,omitempty"`
	Returnable   bool       `db:"returnable" json:"returnable"`
	Random       bool       `db:"random" json:"random"`
	TimeLimit    int        `db:"time" json:"time_limit"`
	ResultsShown bool       `db:"results_shown" json:"results_shown"`
	TryCount     int        `db:"try_count" json:"try_count"`
	FillingID    int64      `db:"filling_id" json:"filling_id"`
}

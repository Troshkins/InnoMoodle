package models

type Filling struct {
	ID      int64 `db:"id" json:"id"`
	BlockID int64 `db:"block_id" json:"block_id"`
}

type PDF struct {
	FillingID int64 `db:"filling_id" json:"filling_id"`
}

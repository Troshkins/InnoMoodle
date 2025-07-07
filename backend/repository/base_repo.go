package repository

import (
	"context"
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type BaseRepository struct {
	db *sqlx.DB
}

func NewBaseRepository(db *sqlx.DB) *BaseRepository {
	return &BaseRepository{db: db}
}

func (r *BaseRepository) WithTransaction(ctx context.Context, fn func(tx *sqlx.Tx) error) error {
	tx, err := r.db.BeginTxx(ctx, nil)
	if err != nil {
		return fmt.Errorf("could not begin transaction: %w", err)
	}

	if err := fn(tx); err != nil {
		if rbErr := tx.Rollback(); rbErr != nil {
			return fmt.Errorf("transaction error: %v, rollback error: %w", err, rbErr)
		}
		return err
	}

	return tx.Commit()
}

func (r *BaseRepository) Exec(ctx context.Context, query string, args ...interface{}) (sql.Result, error) {
	return r.db.ExecContext(ctx, query, args...)
}

func (r *BaseRepository) Get(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	return r.db.GetContext(ctx, dest, query, args...)
}

func (r *BaseRepository) Select(ctx context.Context, dest interface{}, query string, args ...interface{}) error {
	return r.db.SelectContext(ctx, dest, query, args...)
}

func (r *BaseRepository) QueryRow(ctx context.Context, query string, args ...interface{}) *sql.Row {
	return r.db.QueryRowContext(ctx, query, args...)
}

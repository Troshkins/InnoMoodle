package db

import (
	//	"context"
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
	//	"time"
)

type Config struct {
	Host     string
	Port     int
	User     string
	Password string
	DBName   string
	SSLMode  string
}

func Open(cfg Config) (*sql.DB, error) {
	dsn := fmt.Sprintf(
		"host=%s port=%d user=%s password=%s dbname=%s sslmode=%s",
		cfg.Host, cfg.Port, cfg.User, cfg.Password, cfg.DBName, cfg.SSLMode,
	)
	db, err := sql.Open("postgres", dsn)
	if err != nil {
		return nil, err
	}
	// опция: проверить подключение
	if err := db.Ping(); err != nil {
		return nil, err
	}
	return db, nil
}

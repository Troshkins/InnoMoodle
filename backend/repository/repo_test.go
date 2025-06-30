package repository

import (
	"context"
	"database/sql"
	"regexp"
	"testing"

	"github.com/DATA-DOG/go-sqlmock"
	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/stretchr/testify/assert"
)

func TestCreateUser_Success(t *testing.T) {
	db, mock, err := sqlmock.New()
	assert.NoError(t, err)
	defer db.Close()

	mock.ExpectQuery(regexp.QuoteMeta(`
      INSERT INTO "Moodle".users (name, password, email)
      VALUES ($1, $2, $3)
      RETURNING id`)).
		WithArgs("Ivan", "pwd123", "ivan@example.com").
		WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(42))

	u := &models.User{Name: "Ivan", Password: "pwd123", Email: "ivan@example.com"}
	err = CreateUser(context.Background(), db, u)

	assert.NoError(t, err)
	assert.Equal(t, int64(42), u.ID)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestCreateUser_DBError(t *testing.T) {
	db, mock, _ := sqlmock.New()
	defer db.Close()

	mock.ExpectQuery(regexp.QuoteMeta(`
      INSERT INTO "Moodle".users (name, password, email)
      VALUES ($1, $2, $3)
      RETURNING id`)).
		WithArgs("Ivan", "pwd123", "ivan@example.com").
		WillReturnError(sql.ErrConnDone)

	u := &models.User{Name: "Ivan", Password: "pwd123", Email: "ivan@example.com"}
	err := CreateUser(context.Background(), db, u)

	assert.Error(t, err)
	assert.Contains(t, err.Error(), sql.ErrConnDone.Error())
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetUser_Success(t *testing.T) {
	db, mock, _ := sqlmock.New()
	defer db.Close()

	rows := sqlmock.NewRows([]string{"id", "name", "password", "email"}).
		AddRow(7, "Petr", "secret", "petr@example.com")

	mock.ExpectQuery(regexp.QuoteMeta(`
      SELECT id, name, password, email
      FROM "Moodle".users
      WHERE id = $1`)).
		WithArgs(int64(7)).
		WillReturnRows(rows)

	user, err := GetUser(context.Background(), db, 7)
	assert.NoError(t, err)
	assert.Equal(t, int64(7), user.ID)
	assert.Equal(t, "Petr", user.Name)
	assert.Equal(t, "secret", user.Password)
	assert.Equal(t, "petr@example.com", user.Email)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestGetUser_NotFound(t *testing.T) {
	db, mock, _ := sqlmock.New()
	defer db.Close()

	mock.ExpectQuery(regexp.QuoteMeta(`
      SELECT id, name, password, email
      FROM "Moodle".users
      WHERE id = $1`)).
		WithArgs(int64(77)).
		WillReturnError(sql.ErrNoRows)

	user, err := GetUser(context.Background(), db, 77)
	assert.Nil(t, user)
	assert.ErrorIs(t, err, sql.ErrNoRows)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestUpdateUser(t *testing.T) {
	db, mock, _ := sqlmock.New()
	defer db.Close()

	mock.ExpectExec(regexp.QuoteMeta(`
      UPDATE "Moodle".users
      SET name=$1, password=$2, email=$3
      WHERE id=$4`)).
		WithArgs("Maria", "newpass", "maria@example.com", int64(3)).
		WillReturnResult(sqlmock.NewResult(0, 1))

	u := &models.User{ID: 3, Name: "Maria", Password: "newpass", Email: "maria@example.com"}
	err := UpdateUser(context.Background(), db, u)
	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

func TestDeleteUser(t *testing.T) {
	db, mock, _ := sqlmock.New()
	defer db.Close()

	mock.ExpectExec(regexp.QuoteMeta(`
      DELETE FROM "Moodle".users
      WHERE id=$1`)).
		WithArgs(int64(5)).
		WillReturnResult(sqlmock.NewResult(0, 1))

	err := DeleteUser(context.Background(), db, 5)
	assert.NoError(t, err)
	assert.NoError(t, mock.ExpectationsWereMet())
}

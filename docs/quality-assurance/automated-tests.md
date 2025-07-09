# Automated Testing Strategy

## Test Structure
### Unit Tests
- **Location**: `tests/unit/`
- **Characteristics**:
  - Isolated component testing
  - Mocked dependencies (database, services)
  - Fast execution (no external dependencies)
  - Focus on business logic validation
- **Example**: `user_repo_test.go`
  ```go
  func TestUserRepository_CreateUser(t *testing.T) {
      // Mock database setup
      db, mock, _ := sqlmock.New()
      sqlxDB := sqlx.NewDb(db, "sqlmock")
      repo := repository.NewUserRepository(sqlxDB)
      
      // Test data
      user := &models.User{Name: "John Doe", Email: "john@example.com"}
      
      // Mock expectations
      mock.ExpectQuery(`INSERT INTO "Moodle".users`).
          WithArgs(user.Name, user.Email, user.Password).
          WillReturnRows(sqlmock.NewRows([]string{"id"}).AddRow(1))
      
      // Execute and validate
      err := repo.CreateUser(context.Background(), user)
      assert.NoError(t, err)
      assert.Equal(t, int64(1), user.ID)
  }

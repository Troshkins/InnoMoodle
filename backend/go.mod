module github.com/Troshkins/InnoMoodle/backend

go 1.24.4

require (
	github.com/golang-jwt/jwt/v5 v5.2.0
	github.com/gorilla/mux v1.8.1
	github.com/jmoiron/sqlx v1.4.0
	github.com/joho/godotenv v1.5.1
	github.com/lib/pq v1.10.9
	golang.org/x/crypto v0.17.0
)

replace github.com/Troshkins/InnoMoodle/backend => ./..

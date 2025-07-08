module github.com/Troshkins/InnoMoodle/backend

go 1.24.4

require (
    github.com/gorilla/mux v1.8.1
    github.com/jmoiron/sqlx v1.4.0
    github.com/joho/godotenv v1.5.1
    github.com/lib/pq v1.10.9
)

replace (
	github.com/Troshkins/InnoMoodle/backend => ./..
	)
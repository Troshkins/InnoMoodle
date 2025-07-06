package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Troshkins/InnoMoodle/backend/db"
	"github.com/Troshkins/InnoMoodle/backend/repository"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file, using environment variables")
	}

	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		os.Getenv("DB_HOST"), os.Getenv("DB_PORT"),
		os.Getenv("DB_USER"), os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
	)
	dbConn, err := db.Connect(dsn)
	if err != nil {
		log.Fatalf("DB connection failed: %v", err)
	}
	defer dbConn.Close()

	repo := repository.New(dbConn)

	r := mux.NewRouter()
	r.HandleFunc("/api/hello", repo.HelloHandler).Methods("GET")

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static"))))
	r.PathPrefix("/").Handler(http.FileServer(http.Dir("frontend")))

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}
	addr := ":" + port
	log.Printf("Server listening on %s", addr)
	log.Fatal(http.ListenAndServe(addr, r))
}

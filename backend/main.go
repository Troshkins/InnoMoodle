package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Troshkins/InnoMoodle/backend/db"
	"github.com/Troshkins/InnoMoodle/backend/handlers"
	"github.com/Troshkins/InnoMoodle/backend/middleware"
	"github.com/Troshkins/InnoMoodle/backend/repository"
	"github.com/Troshkins/InnoMoodle/backend/services"
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

	// userRepo := repository.NewUserRepository(dbConn)
	userRepo := repository.NewUserRepository(dbConn)
	userService := services.NewUserService(userRepo)
	userHandler := handlers.NewUserHandler(userService)
	courseRepo := repository.NewCourseRepository(dbConn)
	courseHandler := handlers.NewCourseHandler(courseRepo)
	quizRepo := repository.NewQuizRepository(dbConn)
	quizHandler := handlers.NewQuizHandler(quizRepo)
	groupRepo := repository.NewGroupRepository(dbConn)
	groupHandler := handlers.NewGroupHandler(groupRepo)
	// groupRepo := repository.NewGroupRepository(dbConn)

	r := mux.NewRouter()

	// Add CORS middleware
	r.Use(func(next http.Handler) http.Handler {
		return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Origin", "*")
			w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
			w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

			if r.Method == "OPTIONS" {
				w.WriteHeader(http.StatusOK)
				return
			}

			next.ServeHTTP(w, r)
		})
	})

	api := r.PathPrefix("/api").Subrouter()

	// Public endpoints (no authentication required)
	api.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		w.Write([]byte(`{"status":"ok","message":"InnoMoodle API is running"}`))
	}).Methods("GET")

	jwtSecret := []byte(os.Getenv("JWT_SECRET"))
	if len(jwtSecret) == 0 {
		jwtSecret = []byte("dev_secret_change_me")
	}
	authHandler := handlers.NewAuthHandler(userRepo, jwtSecret)
	authMiddleware := middleware.NewAuthMiddleware(jwtSecret)
	api.HandleFunc("/login", authHandler.Login).Methods("POST")

	// User creation endpoint (public for development)
	api.HandleFunc("/users", userHandler.CreateUser).Methods("POST")

	// Apply authentication middleware to the rest of the /api endpoints
	protected := api.NewRoute().Subrouter()
	protected.Use(authMiddleware.AuthMiddleware)

	// User endpoints (protected)
	protected.HandleFunc("/users", userHandler.GetAllUsers).Methods("GET")
	protected.HandleFunc("/users/{id:[0-9]+}", userHandler.GetUser).Methods("GET")
	protected.HandleFunc("/users/{id:[0-9]+}", userHandler.UpdateUser).Methods("PUT")
	protected.HandleFunc("/users/{id:[0-9]+}", userHandler.DeleteUser).Methods("DELETE")
	protected.HandleFunc("/users/profile", userHandler.GetCurrentUserProfile).Methods("GET")

	// Course endpoints
	protected.HandleFunc("/courses", courseHandler.CreateCourse).Methods("POST")
	protected.HandleFunc("/courses", courseHandler.GetAllCourses).Methods("GET")
	protected.HandleFunc("/courses/{id:[0-9]+}", courseHandler.GetCourse).Methods("GET")
	protected.HandleFunc("/courses/{id:[0-9]+}", courseHandler.UpdateCourse).Methods("PUT")
	protected.HandleFunc("/courses/{id:[0-9]+}", courseHandler.DeleteCourse).Methods("DELETE")
	protected.HandleFunc("/courses/user/{email}", courseHandler.GetUserCourses).Methods("GET")

	// Quiz endpoints
	protected.HandleFunc("/quizzes", quizHandler.CreateQuiz).Methods("POST")
	protected.HandleFunc("/quizzes", quizHandler.GetAllQuizzes).Methods("GET")
	protected.HandleFunc("/quizzes/{id:[0-9]+}", quizHandler.GetQuiz).Methods("GET")
	protected.HandleFunc("/quizzes/{id:[0-9]+}", quizHandler.UpdateQuiz).Methods("PUT")
	protected.HandleFunc("/quizzes/{id:[0-9]+}", quizHandler.DeleteQuiz).Methods("DELETE")

	// Group endpoints
	protected.HandleFunc("/groups", groupHandler.CreateGroup).Methods("POST")
	protected.HandleFunc("/groups", groupHandler.GetAllGroups).Methods("GET")
	protected.HandleFunc("/groups/{id:[0-9]+}", groupHandler.GetGroup).Methods("GET")
	protected.HandleFunc("/groups/{id:[0-9]+}", groupHandler.UpdateGroup).Methods("PUT")
	protected.HandleFunc("/groups/{id:[0-9]+}", groupHandler.DeleteGroup).Methods("DELETE")
	protected.HandleFunc("/groups/{id:[0-9]+}/members", groupHandler.GetGroupMembers).Methods("GET")
	protected.HandleFunc("/groups/{id:[0-9]+}/students", groupHandler.AddStudentToGroup).Methods("POST")
	protected.HandleFunc("/groups/{id:[0-9]+}/students/{studentId:[0-9]+}", groupHandler.RemoveStudentFromGroup).Methods("DELETE")

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

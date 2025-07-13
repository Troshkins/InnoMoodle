package handlers

import (
	"context"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/Troshkins/InnoMoodle/backend/models"
	"github.com/Troshkins/InnoMoodle/backend/repository"
)

type QuizHandler struct {
	Repo *repository.QuizRepository
}

func NewQuizHandler(repo *repository.QuizRepository) *QuizHandler {
	return &QuizHandler{Repo: repo}
}

func (h *QuizHandler) CreateQuiz(w http.ResponseWriter, r *http.Request) {
	var quiz models.Quiz
	if err := json.NewDecoder(r.Body).Decode(&quiz); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if err := h.Repo.CreateQuiz(context.Background(), &quiz); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quiz)
}

func (h *QuizHandler) GetQuiz(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid quiz ID", http.StatusBadRequest)
		return
	}
	quiz, err := h.Repo.GetQuizByID(context.Background(), id)
	if err != nil {
		http.Error(w, "Quiz not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quiz)
}

// Update and Delete are not implemented in the repository, so we will leave them as stubs for now.

func (h *QuizHandler) UpdateQuiz(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid quiz ID", http.StatusBadRequest)
		return
	}
	var quiz models.Quiz
	if err := json.NewDecoder(r.Body).Decode(&quiz); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	quiz.ID = id
	if err := h.Repo.UpdateQuiz(context.Background(), &quiz); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quiz)
}

func (h *QuizHandler) DeleteQuiz(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid quiz ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.DeleteQuiz(context.Background(), id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *QuizHandler) GetAllQuizzes(w http.ResponseWriter, r *http.Request) {
	quizzes, err := h.Repo.GetAllQuizzes(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(quizzes)
}
package handlers

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/Troshkins/InnoMoodle/backend/repository"
)

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginResponse struct {
	Token string `json:"token"`
	User  struct {
		ID    int64  `json:"id"`
		Email string `json:"email"`
		Name  string `json:"name"`
		Role  string `json:"role"`
	} `json:"user"`
}

type AuthHandler struct {
	UserRepo *repository.UserRepository
	JWTSecret []byte
}

func NewAuthHandler(userRepo *repository.UserRepository, jwtSecret []byte) *AuthHandler {
	return &AuthHandler{UserRepo: userRepo, JWTSecret: jwtSecret}
}

func (h *AuthHandler) Login(w http.ResponseWriter, r *http.Request) {
	var req LoginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	user, err := h.UserRepo.GetUserByEmail(r.Context(), req.Email)
	if err != nil {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}
	// Plain text password comparison (INSECURE, for testing only)
	if user.Password != req.Password {
		http.Error(w, "Invalid email or password", http.StatusUnauthorized)
		return
	}
	role := string(user.Role)
	if role == "пользователь" || role == "Пользователь" { role = "user" }
	if role == "админ" || role == "Админ" { role = "admin" }
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id": user.ID,
		"role": role,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	})
	tokenString, err := token.SignedString(h.JWTSecret)
	if err != nil {
		http.Error(w, "Could not generate token", http.StatusInternalServerError)
		return
	}

	response := LoginResponse{
		Token: tokenString,
		User: struct {
			ID    int64  `json:"id"`
			Email string `json:"email"`
			Name  string `json:"name"`
			Role  string `json:"role"`
		}{
			ID:    user.ID,
			Email: user.Email,
			Name:  user.Name,
			Role:  role,
		},
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
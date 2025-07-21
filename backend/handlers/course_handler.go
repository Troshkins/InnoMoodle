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

type CourseHandler struct {
	Repo *repository.CourseRepository
}

func NewCourseHandler(repo *repository.CourseRepository) *CourseHandler {
	return &CourseHandler{Repo: repo}
}

func (h *CourseHandler) CreateCourse(w http.ResponseWriter, r *http.Request) {
	var course models.Course
	if err := json.NewDecoder(r.Body).Decode(&course); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if err := h.Repo.CreateCourse(context.Background(), &course); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) GetCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	course, err := h.Repo.GetCourseByID(context.Background(), id)
	if err != nil {
		http.Error(w, "Course not found", http.StatusNotFound)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) UpdateCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	var course models.Course
	if err := json.NewDecoder(r.Body).Decode(&course); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	course.ID = id
	if err := h.Repo.UpdateCourse(context.Background(), &course); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(course)
}

func (h *CourseHandler) DeleteCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.DeleteCourse(context.Background(), id); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

func (h *CourseHandler) GetAllCourses(w http.ResponseWriter, r *http.Request) {
	courses, err := h.Repo.GetAllCourses(context.Background())
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(courses)
}

func (h *CourseHandler) GetUserCourses(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	email := vars["email"]
	if email == "" {
		http.Error(w, "Email parameter is required", http.StatusBadRequest)
		return
	}

	courses, err := h.Repo.GetCoursesByUserEmail(context.Background(), email)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(courses)
}

func (h *CourseHandler) GetCourseTeachers(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	teachers, err := h.Repo.GetCourseTeachers(context.Background(), courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if teachers == nil {
		teachers = []*models.User{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(teachers)
}

func (h *CourseHandler) AddTeacherToCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	var req struct { Email string `json:"email"` }
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if req.Email == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}
	userRepo := repository.NewUserRepository(h.Repo.GetDB())
	user, err := userRepo.GetUserByEmail(context.Background(), req.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	if err := h.Repo.AssignTeacher(context.Background(), courseID, user.ID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Teacher added to course successfully"})
}

func (h *CourseHandler) RemoveTeacherFromCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	teacherID, err := strconv.ParseInt(vars["teacherId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid teacher ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.RemoveTeacherFromCourse(context.Background(), courseID, teacherID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Teacher removed from course successfully"})
}

func (h *CourseHandler) GetCourseStudents(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	students, err := h.Repo.GetCourseStudents(context.Background(), courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	if students == nil {
		students = []*models.User{}
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(students)
}

func (h *CourseHandler) AddStudentToCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	var req struct { Email string `json:"email"` }
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	if req.Email == "" {
		http.Error(w, "Email is required", http.StatusBadRequest)
		return
	}
	userRepo := repository.NewUserRepository(h.Repo.GetDB())
	user, err := userRepo.GetUserByEmail(context.Background(), req.Email)
	if err != nil {
		http.Error(w, "User not found", http.StatusNotFound)
		return
	}
	if err := h.Repo.EnrollStudent(context.Background(), courseID, user.ID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Student added to course successfully"})
}

func (h *CourseHandler) RemoveStudentFromCourse(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	studentID, err := strconv.ParseInt(vars["studentId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid student ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.RemoveStudentFromCourse(context.Background(), courseID, studentID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(map[string]string{"message": "Student removed from course successfully"})
}

// Create a new block in a course (only for teachers or admins)
func (h *CourseHandler) CreateCourseBlock(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	// TODO: Add authentication and check if user is teacher or admin for this course
	type reqBody struct {
		Name string `json:"name"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Name == "" {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	block := &models.CourseBlock{
		Name: req.Name,
		CourseID: courseID,
	}
	if err := h.Repo.CreateCourseBlock(context.Background(), block); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(block)
}

// Get all blocks for a course
func (h *CourseHandler) GetCourseBlocks(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	blocks, err := h.Repo.GetCourseBlocks(context.Background(), courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(blocks)
}

// Update a block in a course
func (h *CourseHandler) UpdateCourseBlock(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	blockID, err := strconv.ParseInt(vars["blockId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid block ID", http.StatusBadRequest)
		return
	}
	type reqBody struct {
		Name string `json:"name"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	block := &models.CourseBlock{ID: blockID, Name: req.Name}
	if err := h.Repo.UpdateCourseBlock(context.Background(), block); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(block)
}

// Theme handlers
func (h *CourseHandler) CreateTheme(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	type reqBody struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Order       int    `json:"order"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	theme := &models.Theme{
		Title:       req.Title,
		Description: req.Description,
		CourseID:    courseID,
		Order:       req.Order,
	}
	if err := h.Repo.CreateTheme(context.Background(), theme); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(theme)
}

func (h *CourseHandler) GetThemes(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	courseID, err := strconv.ParseInt(vars["id"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid course ID", http.StatusBadRequest)
		return
	}
	themes, err := h.Repo.GetThemesByCourseID(context.Background(), courseID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(themes)
}

func (h *CourseHandler) UpdateTheme(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	themeID, err := strconv.ParseInt(vars["themeId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid theme ID", http.StatusBadRequest)
		return
	}
	type reqBody struct {
		Title       string `json:"title"`
		Description string `json:"description"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	theme := &models.Theme{
		ID:          themeID,
		Title:       req.Title,
		Description: req.Description,
	}
	if err := h.Repo.UpdateTheme(context.Background(), theme); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(theme)
}

func (h *CourseHandler) DeleteTheme(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	themeID, err := strconv.ParseInt(vars["themeId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid theme ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.DeleteTheme(context.Background(), themeID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// Assignment handlers
func (h *CourseHandler) CreateAssignment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	themeID, err := strconv.ParseInt(vars["themeId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid theme ID", http.StatusBadRequest)
		return
	}
	type reqBody struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Type        string `json:"type"`
		Order       int    `json:"order"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	assignment := &models.Assignment{
		Title:       req.Title,
		Description: req.Description,
		Type:        req.Type,
		ThemeID:     themeID,
		Order:       req.Order,
	}
	if err := h.Repo.CreateAssignment(context.Background(), assignment); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(assignment)
}

func (h *CourseHandler) GetAssignments(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	themeID, err := strconv.ParseInt(vars["themeId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid theme ID", http.StatusBadRequest)
		return
	}
	assignments, err := h.Repo.GetAssignmentsByThemeID(context.Background(), themeID)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(assignments)
}

func (h *CourseHandler) UpdateAssignment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	assignmentID, err := strconv.ParseInt(vars["assignmentId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid assignment ID", http.StatusBadRequest)
		return
	}
	type reqBody struct {
		Title       string `json:"title"`
		Description string `json:"description"`
		Type        string `json:"type"`
	}
	var req reqBody
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "Invalid request payload", http.StatusBadRequest)
		return
	}
	assignment := &models.Assignment{
		ID:          assignmentID,
		Title:       req.Title,
		Description: req.Description,
		Type:        req.Type,
	}
	if err := h.Repo.UpdateAssignment(context.Background(), assignment); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(assignment)
}

func (h *CourseHandler) DeleteAssignment(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	assignmentID, err := strconv.ParseInt(vars["assignmentId"], 10, 64)
	if err != nil {
		http.Error(w, "Invalid assignment ID", http.StatusBadRequest)
		return
	}
	if err := h.Repo.DeleteAssignment(context.Background(), assignmentID); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}
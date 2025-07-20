console.log('api.js file loaded!'); // Debug log

// API Service for InnoMoodle Frontend
class APIService {
    constructor() {
        this.baseURL = '/api';  // Changed from 'http://localhost:8080/api' to relative path
        this.token = localStorage.getItem('authToken');  // Changed from 'token' to 'authToken'
        console.log('APIService constructor - token from localStorage:', this.token); // Debug log
    }

    // Set authentication token
    setToken(token) {
        this.token = token;
        localStorage.setItem('authToken', token);  // Changed from 'token' to 'authToken'
    }

    // Clear authentication token
    clearToken() {
        this.token = null;
        localStorage.removeItem('authToken');  // Changed from 'token' to 'authToken'
    }

    // Get authentication headers
    getHeaders() {
        const headers = {
            'Content-Type': 'application/json',
        };
        if (this.token) {
            headers['Authorization'] = `Bearer ${this.token}`;
            console.log('Using token:', this.token); // Debug log
        } else {
            console.log('No authentication token found'); // Debug log
        }
        return headers;
    }

    // Generic API request method
    async request(endpoint, options = {}) {
        const url = `${this.baseURL}${endpoint}`;
        const config = {
            headers: this.getHeaders(),
            ...options,
        };

        console.log('=== API REQUEST DEBUG ===');
        console.log('Making API request to:', url);
        console.log('Request config:', config);
        console.log('Token being used:', this.token);

        try {
            const response = await fetch(url, config);
            console.log('Response status:', response.status);
            console.log('Response headers:', response.headers);
            console.log('Response ok:', response.ok);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API error response:', errorData);
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            // Handle empty responses
            const contentType = response.headers.get('content-type');
            console.log('Content-Type:', contentType);

            if (contentType && contentType.includes('application/json')) {
                const data = await response.json();
                console.log('API response data:', data);
                console.log('API response data type:', typeof data);
                console.log('API response data length:', Array.isArray(data) ? data.length : 'not array');
                return data;
            }
            console.log('No JSON content type, returning null');
            return null;
        } catch (error) {
            console.error('API request failed:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                endpoint: endpoint,
                url: url
            });
            throw error;
        }
    }

    // Authentication
    async login(email, password) {
        const response = await this.request('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        if (response.token) {
            this.setToken(response.token);
        }

        return response;
    }

    // User management
    async createUser(userData) {
        return await this.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData),
        });
    }

    async getUser(id) {
        return await this.request(`/users/${id}`);
    }

    async updateUser(id, userData) {
        return await this.request(`/users/${id}`, {
            method: 'PUT',
            body: JSON.stringify(userData),
        });
    }

    async deleteUser(id) {
        return await this.request(`/users/${id}`, {
            method: 'DELETE',
        });
    }

    // Course management
    async createCourse(courseData) {
        return await this.request('/courses', {
            method: 'POST',
            body: JSON.stringify(courseData),
        });
    }

    async getCourse(id) {
        return await this.request(`/courses/${id}`);
    }

    async updateCourse(id, courseData) {
        return await this.request(`/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(courseData),
        });
    }

    async deleteCourse(id) {
        return await this.request(`/courses/${id}`, {
            method: 'DELETE',
        });
    }

    // Quiz management
    async createQuiz(quizData) {
        return await this.request('/quizzes', {
            method: 'POST',
            body: JSON.stringify(quizData),
        });
    }

    async getQuiz(id) {
        return await this.request(`/quizzes/${id}`);
    }

    async updateQuiz(id, quizData) {
        return await this.request(`/quizzes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(quizData),
        });
    }

    async deleteQuiz(id) {
        return await this.request(`/quizzes/${id}`, {
            method: 'DELETE',
        });
    }

    // Group management
    async createGroup(groupData) {
        return await this.request('/groups', {
            method: 'POST',
            body: JSON.stringify(groupData),
        });
    }

    async getGroup(id) {
        return await this.request(`/groups/${id}`);
    }

    async updateGroup(id, groupData) {
        return await this.request(`/groups/${id}`, {
            method: 'PUT',
            body: JSON.stringify(groupData),
        });
    }

    async deleteGroup(id) {
        return await this.request(`/groups/${id}`, {
            method: 'DELETE',
        });
    }

        // Get all users
    async getAllUsers() {
        console.log('=== getAllUsers API Call ===');
        console.log('Current token:', this.token);
        console.log('Headers:', this.getHeaders());

        try {
            const result = await this.request('/users');
            console.log('getAllUsers result:', result);
            return result;
        } catch (error) {
            console.error('getAllUsers error:', error);
            throw error;
        }
    }

    // Get all courses
    async getAllCourses() {
        return await this.request('/courses');
    }

    // Get all quizzes
    async getAllQuizzes() {
        return await this.request('/quizzes');
    }

    // Get all groups
    async getAllGroups() {
        return await this.request('/groups');
    }

    // Get group members
    async getGroupMembers(groupId) {
        return await this.request(`/groups/${groupId}/members`);
    }

    // Add student to group
    async addStudentToGroup(groupId, email) {
        return await this.request(`/groups/${groupId}/students`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }

    // Remove student from group
    async removeStudentFromGroup(groupId, studentId) {
        return await this.request(`/groups/${groupId}/students/${studentId}`, {
            method: 'DELETE',
        });
    }

    // Remove teacher from group
    async removeTeacherFromGroup(groupId, teacherId) {
        return await this.request(`/groups/${groupId}/teachers/${teacherId}`, {
            method: 'DELETE',
        });
    }

    // Get user courses
    async getUserCourses(userEmail) {
        return await this.request(`/courses/user/${encodeURIComponent(userEmail)}`);
    }

    // Get current user profile
    async getCurrentUserProfile() {
        return await this.request('/users/profile');
    }

    // Course teachers
    async getCourseTeachers(courseId) {
        return await this.request(`/courses/${courseId}/teachers`);
    }
    async addTeacherToCourse(courseId, email) {
        return await this.request(`/courses/${courseId}/teachers`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }
    async removeTeacherFromCourse(courseId, teacherId) {
        return await this.request(`/courses/${courseId}/teachers/${teacherId}`, {
            method: 'DELETE',
        });
    }
    // Course students
    async getCourseStudents(courseId) {
        return await this.request(`/courses/${courseId}/students`);
    }
    async addStudentToCourse(courseId, email) {
        return await this.request(`/courses/${courseId}/students`, {
            method: 'POST',
            body: JSON.stringify({ email }),
        });
    }
    async removeStudentFromCourse(courseId, studentId) {
        return await this.request(`/courses/${courseId}/students/${studentId}`, {
            method: 'DELETE',
        });
    }
}

// Create global API service instance
const api = new APIService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = APIService;
}
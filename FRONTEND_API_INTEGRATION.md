# Frontend API Integration

This document describes the changes made to connect the InnoMoodle frontend to the backend API, replacing localStorage usage with actual API calls.

## Changes Made

### 1. Backend API Enhancements

#### New API Endpoints Added:
- `GET /api/users` - Get all users
- `GET /api/users/profile` - Get current user profile
- `GET /api/courses` - Get all courses
- `GET /api/courses/user/{email}` - Get user courses
- `GET /api/quizzes` - Get all quizzes
- `PUT /api/quizzes/{id}` - Update quiz
- `DELETE /api/quizzes/{id}` - Delete quiz
- `GET /api/groups` - Get all groups
- `GET /api/groups/{id}` - Get group by ID
- `PUT /api/groups/{id}` - Update group
- `DELETE /api/groups/{id}` - Delete group

#### Authentication & Authorization:
- Added JWT-based authentication middleware
- Protected API endpoints require valid JWT token
- Login endpoint returns user information along with token
- CORS support added for frontend requests

#### Repository Methods Added:
- `GetAllUsers()` - Retrieve all users from database
- `GetAllCourses()` - Retrieve all courses from database
- `GetCoursesByUserEmail()` - Get courses for specific user
- `GetAllQuizzes()` - Retrieve all quizzes from database
- `UpdateQuiz()` - Update quiz information
- `DeleteQuiz()` - Delete quiz
- `GetAllStudyGroups()` - Retrieve all study groups
- `GetStudyGroupByID()` - Get group by ID
- `UpdateStudyGroup()` - Update group information
- `DeleteStudyGroup()` - Delete group

### 2. Frontend API Service

#### New File: `frontend/api.js`
- Complete API service class with authentication support
- Methods for all CRUD operations (Create, Read, Update, Delete)
- Automatic token management
- Error handling and response processing
- Support for both authenticated and public endpoints

#### Key Features:
- **Authentication**: Automatic JWT token handling
- **Error Handling**: Comprehensive error catching and user feedback
- **Request Management**: Centralized API request handling
- **Token Storage**: Secure token storage in localStorage

### 3. Frontend Integration

#### Updated Files:
- `frontend/index.html` - Added API service and updated login
- `frontend/home.html` - Added API service script
- `frontend/home.js` - Replaced localStorage with API calls

#### Major Changes in home.js:
- **Authentication**: Real login with JWT tokens
- **Data Loading**: All data now fetched from API
- **Error Handling**: Proper error messages for failed requests
- **Async Operations**: All API calls are properly async/await
- **Logout**: Proper token cleanup on logout

#### Replaced localStorage Usage:
- User management → API calls to `/api/users`
- Course management → API calls to `/api/courses`
- Group management → API calls to `/api/groups`
- Quiz management → API calls to `/api/quizzes`
- User profile → API calls to `/api/users/profile`

## Testing the Integration

### 1. Start the Backend
```bash
cd backend
go mod tidy  # Install new dependencies
go run main.go
```

### 2. Start the Frontend
The frontend can be served by the backend at `http://localhost:8080`

### 3. Test API Connection
Visit `http://localhost:8080/test.html` to test the API connection:

1. **Login Test**: Test authentication with test user
   - Email: `teacher1@innopolis.ru`
   - Password: `password123`

2. **Data Tests**: Test retrieving various data types
   - Users, Courses, Groups, Quizzes

### 4. Test Main Application
1. Visit `http://localhost:8080`
2. Click "Log in with SSO" (uses test credentials)
3. Navigate through different sections to test API integration

## Test Users

The database includes these test users:

| Email | Password | Role |
|-------|----------|------|
| admin@innopolis.ru | password123 | admin |
| teacher1@innopolis.ru | password123 | teacher |
| teacher2@innopolis.ru | password123 | teacher |
| student1@innopolis.ru | password123 | student |
| student2@innopolis.ru | password123 | student |

## API Response Format

### Login Response:
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": 2,
    "email": "teacher1@innopolis.ru",
    "name": "Teacher One",
    "role": "teacher"
  }
}
```

### Error Response:
```json
{
  "message": "Error description"
}
```

## Security Features

1. **JWT Authentication**: All protected endpoints require valid JWT tokens
2. **Password Hashing**: Passwords are hashed using bcrypt
3. **CORS Protection**: Proper CORS headers for frontend requests
4. **Token Expiration**: JWT tokens expire after 72 hours
5. **Input Validation**: Server-side validation of all inputs

## Error Handling

The frontend now includes comprehensive error handling:
- Network errors are caught and displayed to users
- API errors show meaningful messages
- Failed requests don't crash the application
- Loading states are properly managed

## Future Improvements

1. **Real-time Updates**: WebSocket integration for live updates
2. **File Upload**: Support for course materials and assignments
3. **Advanced Queries**: Pagination, filtering, and search
4. **Caching**: Client-side caching for better performance
5. **Offline Support**: Service worker for offline functionality

## Troubleshooting

### Common Issues:

1. **CORS Errors**: Ensure backend is running and CORS middleware is active
2. **Authentication Errors**: Check JWT token validity and expiration
3. **Database Connection**: Verify PostgreSQL is running and accessible
4. **Port Conflicts**: Ensure port 8080 is available for the backend

### Debug Steps:
1. Check browser console for JavaScript errors
2. Check backend logs for server errors
3. Use the test page to isolate API issues
4. Verify database connection and schema
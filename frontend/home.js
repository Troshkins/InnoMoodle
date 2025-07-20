console.log('home.js file loaded!'); // Debug log

// Global variables
let isInitialized = false;

// Инициализация данных
const initData = async () => {
    console.log('Initializing data...'); // Debug log
    console.log('isLoggedIn:', localStorage.getItem('isLoggedIn')); // Debug log
    console.log('authToken:', localStorage.getItem('authToken')); // Debug log

    // Check if user is logged in
    if (!localStorage.getItem('isLoggedIn')) {
        console.log('User not logged in, but continuing for testing...'); // Debug log
        // Temporarily disable redirect for testing
        // window.location.href = 'index.html';
        // return;

        // Set default login state for testing
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('authToken', 'test-token');
    }

    // Set default role if not set
    if (!localStorage.getItem('role')) {
        localStorage.setItem('role', 'admin');
    }

    // Set default current section if not set
    if (!localStorage.getItem('currentSection')) {
        const role = localStorage.getItem('role');
        if (!localStorage.getItem('currentSection')) {
            if (role === 'admin') {
                localStorage.setItem('currentSection', 'courses');
            } else {
                localStorage.setItem('currentSection', 'user_courses');
            }
        }
    }

    console.log('Data initialization complete'); // Debug log
};

// Получение текущей роли
const getCurrentRole = () => {
    return localStorage.getItem('role') || 'admin';
};

// Обновляем видимость элементов сайдбара и кнопок по роли (admin / user)
const updateRoleVisibility = () => {
    const role = localStorage.getItem('role') || 'admin';
    document.querySelectorAll('.admin-only').forEach(el => {
        el.style.display = role === 'admin' ? '' : 'none';
    });
    document.querySelectorAll('.user-only').forEach(el => {
        el.style.display = role === 'user' ? '' : 'none';
    });
    // В разделе Курсы у администратора показываем кнопку создания
    const createCourseBtn = document.getElementById('create-course-btn');
    if (createCourseBtn) {
        createCourseBtn.style.display = role === 'admin' ? '' : 'none';
    }
};

// Инициализация темы
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const themeIcon = document.getElementById('themeIcon');
    if (savedTheme === 'dark') {
        themeIcon.innerHTML = '<path fill="currentColor" d="M12.8956 3.55332C12.705 3.53848 12.5145 3.5357 12.3244 3.545C12.2186 3.54997 12.1127 3.558 12.007 3.56908C7.91503 3.96808 5 7.36458 5 11.5C5 15.9208 8.57925 19.5 13 19.5C16.1354 19.5 18.7827 17.7148 20 15.1563C20.0627 15.0324 20.0311 14.8841 19.9233 14.7946C19.8154 14.705 19.6562 14.6966 19.5381 14.7747C19.0995 15.061 18.6081 15.2648 18.0916 15.375C17.5751 15.4853 17.0429 15.5002 16.5214 15.4188C16 15.3374 15.4998 15.1611 15.0462 14.8993C14.5926 14.6375 14.1943 14.2953 13.8732 13.891C13.5521 13.4866 13.3145 13.0279 13.173 12.5402C13.0315 12.0525 12.9889 11.545 13.0475 11.0443C13.1061 10.5435 13.2648 10.0593 13.5151 9.6184C13.7655 9.17748 14.1024 8.78877 14.507 8.47422C14.9116 8.15968 15.3761 7.9258 15.8748 7.786C16.3734 7.6462 16.8964 7.60344 17.4127 7.66025C17.929 7.71706 18.4283 7.87231 18.881 8.11672C19.0048 8.18504 19.1569 8.17129 19.2669 8.08259C19.3769 7.99389 19.4247 7.84715 19.3881 7.70847C18.9966 6.12034 18.0004 4.71715 16.5705 3.76408C15.1405 2.81101 13.3685 2.37142 11.6097 2.52847C10.9989 2.5896 10.3958 2.72057 9.81276 2.91878C9.68142 2.96322 9.53306 2.92888 9.439 2.8328C9.34495 2.73673 9.32351 2.59824 9.38438 2.48437C9.79788 1.69938 10.4231 1.04187 11.1932 0.581793C11.9633 0.121717 12.8497 -0.122577 13.7494 0.0462515C14.6491 0.21508 15.529 0.660079 16.2958 1.34136C17.0627 2.02264 17.689 2.91806 18.1131 3.94416C18.5371 4.97026 18.7439 6.09311 18.7141 7.22457C18.6842 8.35603 18.4187 9.45971 17.9423 10.447C17.4659 11.4343 16.7946 12.2754 15.9866 12.8995C15.1787 13.5236 14.2592 13.9124 13.3094 14.032C12.3596 14.1515 11.4103 13.9982 10.5415 13.5875C9.67266 13.1767 8.91263 12.5224 8.33441 11.6846C7.75619 10.8469 7.37996 9.85389 7.24418 8.80338C7.1084 7.75287 7.21825 6.6812 7.56208 5.68922C7.90591 4.69724 8.47186 3.81929 9.205 3.14359C9.93814 2.46789 10.812 2.01786 11.7397 1.839"/>';
    } else {
        themeIcon.innerHTML = '<path fill="currentColor" d="M12 9C13.6569 9 15 10.3431 15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9ZM12 4.5L14.03 8.5H9.97L12 4.5ZM12 19.5L9.97 15.5H14.03L12 19.5ZM4.5 12L8.5 9.97V14.03L4.5 12ZM19.5 12L15.5 14.03V9.97L19.5 12ZM14.83 14.83L18.36 18.36L16.95 19.77L13.42 16.24L14.83 14.83ZM9.17 14.83L7.76 16.24L4.23 19.77L2.82 18.36L6.35 14.83L9.17 14.83ZM9.17 9.17L6.35 9.17L2.82 5.64L4.23 4.23L7.76 7.76L9.17 9.17ZM14.83 9.17L16.24 7.76L19.77 4.23L18.36 2.82L14.83 6.35L14.83 9.17Z"/>';
    }
};

// Переключение темы
const setupThemeToggle = () => {
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            initTheme();
        });
    }
};

// Обновление сайдбара
const updateSidebar = (section) => {
    const isDashboard = section === 'dashboard';
    const menuHeader = document.getElementById('menu-header');
    const backLink = document.getElementById('back-link');

    if (menuHeader) menuHeader.style.display = isDashboard ? 'block' : 'none';
    if (backLink) backLink.style.display = isDashboard ? 'none' : 'block';

    document.querySelectorAll('.sidebar__nav a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.section === section) {
            a.classList.add('active');
        }
    });
};

// Рендеринг страницы
const renderPage = (templateId) => {
    console.log('Rendering page with template ID:', templateId); // Debug log
    const template = document.getElementById(templateId);
    if (template) {
        console.log('Template found, rendering...'); // Debug log
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.innerHTML = '';
            mainContent.appendChild(template.content.cloneNode(true));
            console.log('Page rendered successfully'); // Debug log
        }
    } else {
        console.error('Template not found:', templateId); // Debug log
    }
};

// Инициализация логики для конкретных страниц
const initPageSpecificLogic = (section) => {
    try {
        switch(section) {
            case 'dashboard':
                // Логика для dashboard
                break;
            case 'courses':
                initCoursesPage();
                break;
            case 'course_creation':
                initCourseCreationPage();
                break;
            case 'course_editing':
                initCourseEditingPage();
                break;
            case 'groups':
                initGroupsPage(); // Исправленная функция
                break;
            case 'group_creation':
                initGroupCreationPage();
                break;
            case 'group_details':
                initGroupDetailsPage();
                break;
            case 'database':
                initDatabasePage();
                break;
            case 'email_add':
                initEmailAddPage();
                break;
            case 'user_courses':
                initUserCoursesPage();
                break;
            case 'course_detail':
                initCourseDetailPage();
                break;
            case 'course_settings':
                initCourseSettings();
                break;
            case 'course_content':
                initCourseContent();
                break;
            case 'quizzes':
                initQuizzesPage(); // Исправленная функция
                break;
            case 'quiz_creation':
                initQuizCreationPage();
                break;
            case 'performance':
                initPerformancePage();
                break;
            case 'profile':
                initProfilePage();
                break;
            case 'student_quiz_start':
                initStudentQuizStart();
                break;
            case 'student_quiz_view':
                initStudentQuizView();
                break;
            default:
                // Обработка по умолчанию
        }
    } catch (error) {
        console.error('Error initializing page logic:', error);
        document.getElementById('main-content').innerHTML = `
            <div class="error">
                <h2>Ошибка инициализации</h2>
                <p>${error.message}</p>
            </div>
        `;
    }
};

// Add a stub for initCourseEditingPage if missing
const initCourseEditingPage = async () => {
    // Get current course ID from localStorage
    const courseId = localStorage.getItem('currentCourse');
    if (!courseId) return;
    // Fetch course data
    let course = null;
    try {
        course = await api.getCourse(courseId);
        console.log('[EDIT COURSE] Loaded course:', course);
    } catch (error) {
        console.error('Error fetching course:', error);
        return;
    }
    setTimeout(async () => {
        const titleInput = document.getElementById('edit-course-title');
        if (titleInput && course && course.name) {
            titleInput.value = course.name;
            console.log('[EDIT COURSE] Set input value:', course.name);
        } else {
            console.log('[EDIT COURSE] Could not set input value:', {titleInput, course});
        }
        // Set page title
        const title = document.getElementById('course-editing-title');
        if (title) title.textContent = 'Редактирование курса';

        // --- New logic: teachers and students autocomplete and selection ---
        let allUsers = [];
        try {
            allUsers = await api.getAllUsers();
        } catch (error) {
            console.error('Error fetching users:', error);
            return;
        }
        // Arrays to hold selected teachers and students
        let selectedTeachers = [];
        let selectedStudents = [];
        // Fetch current teachers/students for this course from backend
        let originalTeachers = [];
        let originalStudents = [];
        try {
            originalTeachers = await api.getCourseTeachers(courseId) || [];
            originalStudents = await api.getCourseStudents(courseId) || [];
        } catch (err) {
            console.error('Error fetching course teachers/students:', err);
        }
        selectedTeachers = [...originalTeachers];
        selectedStudents = [...originalStudents];

        // Render selected teachers
        const teachersContainer = document.getElementById('teachers-container');
        const renderTeachers = () => {
            teachersContainer.innerHTML = '';
            if (selectedTeachers.length === 0) {
                teachersContainer.innerHTML = '<div class="empty-state">Нет выбранных преподавателей</div>';
                return;
            }
            selectedTeachers.forEach(user => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${user.email}</div>
                    <div class="text-tertiary">${user.name || ''}</div>
                    <button class="btn btn-danger remove-teacher" data-id="${user.id}">Удалить</button>
                `;
                teachersContainer.appendChild(div);
            });
            teachersContainer.querySelectorAll('.remove-teacher').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = parseInt(btn.dataset.id);
                    selectedTeachers = selectedTeachers.filter(u => u.id !== userId);
                    renderTeachers();
                });
            });
        };
        renderTeachers();

        // Render selected students
        const studentsContainer = document.getElementById('student-groups-container');
        const renderStudents = () => {
            studentsContainer.innerHTML = '';
            if (selectedStudents.length === 0) {
                studentsContainer.innerHTML = '<div class="empty-state">Нет выбранных студентов</div>';
                return;
            }
            selectedStudents.forEach(user => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${user.email}</div>
                    <div class="text-tertiary">${user.name || ''}</div>
                    <button class="btn btn-danger remove-student" data-id="${user.id}">Удалить</button>
                `;
                studentsContainer.appendChild(div);
            });
            studentsContainer.querySelectorAll('.remove-student').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = parseInt(btn.dataset.id);
                    selectedStudents = selectedStudents.filter(u => u.id !== userId);
                    renderStudents();
                });
            });
        };
        renderStudents();

        // Add autocomplete input for teachers
        const teacherInputDiv = document.createElement('div');
        teacherInputDiv.className = 'search';
        teacherInputDiv.style.position = 'relative'; // Ensure relative positioning for dropdown
        teacherInputDiv.innerHTML = `
            <input class="form-input" id="add-teacher-email" placeholder="Введите email преподавателя" type="email" autocomplete="off"/>
            <button class="btn btn-primary" id="add-teacher-btn" type="button">Добавить</button>
        `;
        teachersContainer.parentNode.insertBefore(teacherInputDiv, teachersContainer);
        const teacherInput = teacherInputDiv.querySelector('#add-teacher-email');
        const addTeacherBtn = teacherInputDiv.querySelector('#add-teacher-btn');
        // Autocomplete dropdown for teachers
        const teacherDropdown = document.createElement('div');
        teacherDropdown.className = 'autocomplete-dropdown';
        teacherDropdown.id = 'teacher-edit-dropdown';
        teacherDropdown.style.position = 'absolute';
        teacherDropdown.style.top = '100%';
        teacherDropdown.style.left = '0';
        teacherDropdown.style.width = '100%';
        teacherDropdown.style.zIndex = '10';
        teacherDropdown.style.background = '#fff';
        teacherDropdown.style.border = '1px solid #ccc';
        teacherDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        teacherDropdown.style.display = 'none';
        teacherInputDiv.appendChild(teacherDropdown);
        const filterTeachers = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                teacherDropdown.style.display = 'none';
                return;
            }
            const filtered = allUsers.filter(user =>
                user.role === 'user' &&
                ((user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.name && user.name.toLowerCase().includes(searchTerm)))
            ).filter(user =>
                !selectedTeachers.some(selected => selected.id === user.id)
            );
            teacherDropdown.innerHTML = '';
            if (filtered.length === 0) {
                teacherDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
                teacherDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(user => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <div style="font-weight: 500;">${user.email}</div>
                    <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
                `;
                item.addEventListener('click', () => {
                    teacherInput.value = user.email;
                    teacherDropdown.style.display = 'none';
                    teacherInput.dispatchEvent(new Event('input'));
                });
                teacherDropdown.appendChild(item);
            });
            teacherDropdown.style.display = 'block';
        };
        teacherInput.addEventListener('focus', () => {
            if (teacherInput.value.trim()) filterTeachers(teacherInput.value);
        });
        teacherInput.addEventListener('input', (e) => {
            filterTeachers(e.target.value);
        });
        addTeacherBtn.addEventListener('click', () => {
            const email = teacherInput.value.trim();
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            const user = allUsers.find(u => u.email === email && u.role === 'user');
            if (!user) {
                alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
                return;
            }
            if (selectedTeachers.some(u => u.id === user.id)) {
                alert('Этот преподаватель уже добавлен');
                return;
            }
            selectedTeachers.push(user);
            teacherInput.value = '';
            teacherDropdown.style.display = 'none';
            renderTeachers();
        });
        document.addEventListener('click', (e) => {
            if (!teacherInputDiv.contains(e.target)) teacherDropdown.style.display = 'none';
        });

        // Add autocomplete input for students
        const studentInputDiv = document.createElement('div');
        studentInputDiv.className = 'search';
        studentInputDiv.style.position = 'relative'; // Ensure relative positioning for dropdown
        studentInputDiv.innerHTML = `
            <input class="form-input" id="add-student-email" placeholder="Введите email студента" type="email" autocomplete="off"/>
            <button class="btn btn-primary" id="add-student-btn" type="button">Добавить</button>
        `;
        studentsContainer.parentNode.insertBefore(studentInputDiv, studentsContainer);
        const studentInput = studentInputDiv.querySelector('#add-student-email');
        const addStudentBtn = studentInputDiv.querySelector('#add-student-btn');
        // Autocomplete dropdown for students
        const studentDropdown = document.createElement('div');
        studentDropdown.className = 'autocomplete-dropdown';
        studentDropdown.id = 'student-edit-dropdown';
        studentDropdown.style.position = 'absolute';
        studentDropdown.style.top = '100%';
        studentDropdown.style.left = '0';
        studentDropdown.style.width = '100%';
        studentDropdown.style.zIndex = '10';
        studentDropdown.style.background = '#fff';
        studentDropdown.style.border = '1px solid #ccc';
        studentDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        studentDropdown.style.display = 'none';
        studentInputDiv.appendChild(studentDropdown);
        const filterStudents = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                studentDropdown.style.display = 'none';
                return;
            }
            const filtered = allUsers.filter(user =>
                user.role === 'user' &&
                ((user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.name && user.name.toLowerCase().includes(searchTerm)))
            ).filter(user =>
                !selectedStudents.some(selected => selected.id === user.id)
            );
            studentDropdown.innerHTML = '';
            if (filtered.length === 0) {
                studentDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
                studentDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(user => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <div style="font-weight: 500;">${user.email}</div>
                    <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
                `;
                item.addEventListener('click', () => {
                    studentInput.value = user.email;
                    studentDropdown.style.display = 'none';
                    studentInput.dispatchEvent(new Event('input'));
                });
                studentDropdown.appendChild(item);
            });
            studentDropdown.style.display = 'block';
        };
        studentInput.addEventListener('focus', () => {
            if (studentInput.value.trim()) filterStudents(studentInput.value);
        });
        studentInput.addEventListener('input', (e) => {
            filterStudents(e.target.value);
        });
        addStudentBtn.addEventListener('click', () => {
            const email = studentInput.value.trim();
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            const user = allUsers.find(u => u.email === email && u.role === 'user');
            if (!user) {
                alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
                return;
            }
            if (selectedStudents.some(u => u.id === user.id)) {
                alert('Этот студент уже добавлен');
                return;
            }
            selectedStudents.push(user);
            studentInput.value = '';
            studentDropdown.style.display = 'none';
            renderStudents();
        });
        document.addEventListener('click', (e) => {
            if (!studentInputDiv.contains(e.target)) studentDropdown.style.display = 'none';
        });

        // Add autocomplete input for groups (for adding all group members as students)
        const groupInputDiv = document.createElement('div');
        groupInputDiv.className = 'search';
        groupInputDiv.style.position = 'relative';
        groupInputDiv.innerHTML = `
            <input class="form-input" id="add-group-name" placeholder="Добавить всех из группы..." type="text" autocomplete="off"/>
            <button class="btn btn-primary" id="add-group-btn" type="button">Добавить группу</button>
        `;
        studentsContainer.parentNode.insertBefore(groupInputDiv, studentsContainer);
        const groupInput = groupInputDiv.querySelector('#add-group-name');
        const addGroupBtn = groupInputDiv.querySelector('#add-group-btn');
        // Autocomplete dropdown for groups
        const groupDropdown = document.createElement('div');
        groupDropdown.className = 'autocomplete-dropdown';
        groupDropdown.id = 'group-edit-dropdown';
        groupDropdown.style.position = 'absolute';
        groupDropdown.style.top = '100%';
        groupDropdown.style.left = '0';
        groupDropdown.style.width = '100%';
        groupDropdown.style.zIndex = '10';
        groupDropdown.style.background = '#fff';
        groupDropdown.style.border = '1px solid #ccc';
        groupDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        groupDropdown.style.display = 'none';
        groupInputDiv.appendChild(groupDropdown);
        // Store selected groups for display
        let selectedGroups = [];
        let allGroups = [];
        try {
            allGroups = await api.getAllGroups();
        } catch (err) {
            console.error('Error fetching groups:', err);
        }
        const renderSelectedGroups = () => {
            let groupList = document.getElementById('selected-groups-list');
            if (!groupList) {
                groupList = document.createElement('div');
                groupList.id = 'selected-groups-list';
                groupList.className = 'list-container';
                groupInputDiv.parentNode.insertBefore(groupList, groupInputDiv.nextSibling);
            }
            groupList.innerHTML = '';
            if (selectedGroups.length === 0) {
                groupList.innerHTML = '<div class="empty-state">Нет выбранных групп</div>';
                return;
            }
            selectedGroups.forEach(group => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${group.name}</div>
                    <button class="btn btn-danger remove-group" data-id="${group.id}">Удалить</button>
                `;
                groupList.appendChild(div);
            });
            groupList.querySelectorAll('.remove-group').forEach(btn => {
                btn.addEventListener('click', () => {
                    const groupId = parseInt(btn.dataset.id);
                    selectedGroups = selectedGroups.filter(g => g.id !== groupId);
                    renderSelectedGroups();
                });
            });
        };
        renderSelectedGroups();
        const filterGroups = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                groupDropdown.style.display = 'none';
                return;
            }
            const filtered = allGroups.filter(group =>
                group.name && group.name.toLowerCase().includes(searchTerm)
            ).filter(group =>
                !selectedGroups.some(selected => selected.id === group.id)
            );
            groupDropdown.innerHTML = '';
            if (filtered.length === 0) {
                groupDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Группы не найдены</div>';
                groupDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(group => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `<div style="font-weight: 500;">${group.name}</div>`;
                item.addEventListener('click', () => {
                    groupInput.value = group.name;
                    groupDropdown.style.display = 'none';
                    groupInput.dispatchEvent(new Event('input'));
                });
                groupDropdown.appendChild(item);
            });
            groupDropdown.style.display = 'block';
        };
        groupInput.addEventListener('focus', () => {
            if (groupInput.value.trim()) filterGroups(groupInput.value);
        });
        groupInput.addEventListener('input', (e) => {
            filterGroups(e.target.value);
        });
        addGroupBtn.addEventListener('click', async () => {
            const name = groupInput.value.trim();
            if (!name) {
                alert('Пожалуйста, введите название группы');
                return;
            }
            const group = allGroups.find(g => g.name === name);
            if (!group) {
                alert('Группа с таким названием не найдена. Пожалуйста, выберите из списка.');
                return;
            }
            if (selectedGroups.some(g => g.id === group.id)) {
                alert('Эта группа уже выбрана');
                return;
            }
            selectedGroups.push(group);
            groupInput.value = '';
            groupDropdown.style.display = 'none';
            renderSelectedGroups();
            // Fetch group members and add to selectedStudents (avoid duplicates)
            try {
                const members = await api.getGroupMembers(group.id);
                let added = 0;
                members.forEach(user => {
                    if (user.role === 'user' && !selectedStudents.some(u => u.id === user.id)) {
                        selectedStudents.push(user);
                        added++;
                    }
                });
                if (added > 0) renderStudents();
            } catch (err) {
                alert('Ошибка при получении участников группы');
            }
        });
        document.addEventListener('click', (e) => {
            if (!groupInputDiv.contains(e.target)) groupDropdown.style.display = 'none';
        });

        // Save logic for teachers and students on submit
        document.getElementById('edit-course-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Save course name
            const newName = document.getElementById('edit-course-title')?.value?.trim();
            if (!newName) {
                alert('Название курса не может быть пустым');
                return;
            }
            // Update course name if changed
            if (newName !== course.name) {
                try {
                    await api.updateCourse(courseId, { ...course, name: newName });
                } catch (err) {
                    alert('Ошибка при обновлении названия курса');
                    return;
                }
            }
            // Compare teachers
            const origTeacherIds = new Set((originalTeachers || []).map(u => u.id));
            const newTeacherIds = new Set((selectedTeachers || []).map(u => u.id));
            // Add new teachers
            for (const user of selectedTeachers) {
                if (!origTeacherIds.has(user.id)) {
                    try {
                        await api.addTeacherToCourse(courseId, user.email);
                    } catch (err) {
                        alert(`Ошибка при добавлении преподавателя ${user.email}`);
                    }
                }
            }
            // Remove teachers
            for (const user of originalTeachers) {
                if (!newTeacherIds.has(user.id)) {
                    try {
                        await api.removeTeacherFromCourse(courseId, user.id);
                    } catch (err) {
                        alert(`Ошибка при удалении преподавателя ${user.email}`);
                    }
                }
            }
            // Compare students
            const origStudentIds = new Set((originalStudents || []).map(u => u.id));
            const newStudentIds = new Set((selectedStudents || []).map(u => u.id));
            // Add new students
            for (const user of selectedStudents) {
                if (!origStudentIds.has(user.id)) {
                    try {
                        await api.addStudentToCourse(courseId, user.email);
                    } catch (err) {
                        alert(`Ошибка при добавлении студента ${user.email}`);
                    }
                }
            }
            // Remove students
            for (const user of originalStudents) {
                if (!newStudentIds.has(user.id)) {
                    try {
                        await api.removeStudentFromCourse(courseId, user.id);
                    } catch (err) {
                        alert(`Ошибка при удалении студента ${user.email}`);
                    }
                }
            }
            alert('Курс обновлен!');
            loadContent('courses');
        });

        // Add delete course functionality
        const deleteBtn = document.getElementById('delete-course');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', async () => {
                if (confirm('Вы уверены, что хотите удалить этот курс? Это действие нельзя отменить.')) {
                    try {
                        await api.deleteCourse(courseId);
                        loadContent('courses');
                    } catch (err) {
                        alert('Ошибка при удалении курса');
                    }
                }
            });
        }
    }, 0);
};

// Загрузка контента для раздела
const loadContent = (section) => {
    try {
        console.log('Loading content for section:', section); // Debug log
        let templateId = '';

        switch(section) {
            case 'dashboard':
                templateId = 'dashboard-template';
                break;
            case 'courses':
                templateId = 'courses-template';
                break;
            case 'course_creation':
                templateId = 'course-creation-template';
                break;
            case 'course_editing':
                templateId = 'course-editing-template';
                break;
            case 'groups':
                templateId = 'groups-template';
                break;
            case 'group_creation':
                templateId = 'group-creation-template';
                break;
            case 'group_details':
                templateId = 'group-details-template';
                break;
            case 'database':
                templateId = 'database-template';
                break;
            case 'email_add':
                templateId = 'email-add-template';
                break;
            case 'user_courses':
                templateId = 'user_courses-template';
                break;
            case 'course_detail':
                templateId = 'course_detail-template';
                break;
            case 'course_settings':
                templateId = 'course_settings-template';
                break;
            case 'course_content':
                templateId = 'course_content-template';
                break;
            case 'quizzes':
                templateId = 'quizzes-template';
                break;
            case 'quiz_creation':
                templateId = 'quiz-creation-template';
                break;
            case 'performance':
                templateId = 'performance-template';
                break;
            case 'profile':
                templateId = 'profile-template';
                break;
            default:
                templateId = 'dashboard-template';
                break;
        }

        renderPage(templateId);
        updateSidebar(section);
        localStorage.setItem('currentSection', section);
        initPageSpecificLogic(section);

    } catch (error) {
        console.error('Error loading content:', error);
    }
};

// Инициализация страницы курсов (админ)
const initCoursesPage = async () => {
    document.getElementById('create-course-btn')?.addEventListener('click', () => {
        console.log('Create course button clicked'); // Debug log
        alert('Create course button clicked!'); // Test alert
        loadContent('course_creation');
    });

    try {
        const courses = await api.getAllCourses();
        const container = document.querySelector('.card-container');
        container.innerHTML = '';

        if (!courses || courses.length === 0) {
            container.innerHTML = '<div class="empty-state">Нет созданных курсов</div>';
            return;
        }

        courses.forEach(course => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <div class="card__body">
                    <h2 class="card__title">${course.name}</h2>
                </div>
            `;
            card.addEventListener('click', () => {
                localStorage.setItem('currentCourse', course.id);
                loadContent('course_editing');
            });
            container.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading courses:', error);
        document.querySelector('.card-container').innerHTML =
            '<div class="error">Ошибка загрузки курсов</div>';
    }
};

// Инициализация страницы создания/редактирования курса (заменить существующую функцию)
const initCourseCreationPage = () => {
    // Отмена создания курса
    document.getElementById('cancel-course')?.addEventListener('click', () => {
        loadContent('courses');
    });

    // Remove any previous injected fields (in case of hot reload)
    document.querySelectorAll('#teachers-container .search, #student-groups-container .search, #selected-groups-list').forEach(el => el.remove());

    // --- Copy logic from course editing for teacher, student, and group autocomplete ---
    let allUsers = [];
    let allGroups = [];
    let selectedTeachers = [];
    let selectedStudents = [];
    let selectedGroups = [];
    (async () => {
        try {
            allUsers = await api.getAllUsers();
        } catch (error) {
            console.error('Error fetching users:', error);
            return;
        }
        try {
            allGroups = await api.getAllGroups();
        } catch (error) {
            console.error('Error fetching groups:', error);
        }
        // Render selected teachers
        const teachersContainer = document.getElementById('teachers-container');
        const renderTeachers = () => {
            teachersContainer.innerHTML = '';
            if (selectedTeachers.length === 0) {
                teachersContainer.innerHTML = '<div class="empty-state">Нет выбранных преподавателей</div>';
                return;
            }
            selectedTeachers.forEach(user => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${user.email}</div>
                    <div class="text-tertiary">${user.name || ''}</div>
                    <button class="btn btn-danger remove-teacher" data-id="${user.id}">Удалить</button>
                `;
                teachersContainer.appendChild(div);
            });
            teachersContainer.querySelectorAll('.remove-teacher').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = parseInt(btn.dataset.id);
                    selectedTeachers = selectedTeachers.filter(u => u.id !== userId);
                    renderTeachers();
                });
            });
        };
        renderTeachers();
        // Render selected students
        const studentsContainer = document.getElementById('student-groups-container');
        const renderStudents = () => {
            studentsContainer.innerHTML = '';
            if (selectedStudents.length === 0) {
                studentsContainer.innerHTML = '<div class="empty-state">Нет выбранных студентов</div>';
                return;
            }
            selectedStudents.forEach(user => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${user.email}</div>
                    <div class="text-tertiary">${user.name || ''}</div>
                    <button class="btn btn-danger remove-student" data-id="${user.id}">Удалить</button>
                `;
                studentsContainer.appendChild(div);
            });
            studentsContainer.querySelectorAll('.remove-student').forEach(btn => {
                btn.addEventListener('click', () => {
                    const userId = parseInt(btn.dataset.id);
                    selectedStudents = selectedStudents.filter(u => u.id !== userId);
                    renderStudents();
                });
            });
        };
        renderStudents();
        // Add autocomplete input for teachers
        const teacherInputDiv = document.createElement('div');
        teacherInputDiv.className = 'search';
        teacherInputDiv.style.position = 'relative';
        teacherInputDiv.innerHTML = `
            <input class="form-input" id="add-teacher-email" placeholder="Введите email преподавателя" type="email" autocomplete="off"/>
            <button class="btn btn-primary" id="add-teacher-btn" type="button">Добавить</button>
        `;
        teachersContainer.parentNode.insertBefore(teacherInputDiv, teachersContainer);
        const teacherInput = teacherInputDiv.querySelector('#add-teacher-email');
        const addTeacherBtn = teacherInputDiv.querySelector('#add-teacher-btn');
        const teacherDropdown = document.createElement('div');
        teacherDropdown.className = 'autocomplete-dropdown';
        teacherDropdown.id = 'teacher-create-dropdown';
        teacherDropdown.style.position = 'absolute';
        teacherDropdown.style.top = '100%';
        teacherDropdown.style.left = '0';
        teacherDropdown.style.width = '100%';
        teacherDropdown.style.zIndex = '10';
        teacherDropdown.style.background = '#fff';
        teacherDropdown.style.border = '1px solid #ccc';
        teacherDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        teacherDropdown.style.display = 'none';
        teacherInputDiv.appendChild(teacherDropdown);
        const filterTeachers = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                teacherDropdown.style.display = 'none';
                return;
            }
            const filtered = allUsers.filter(user =>
                user.role === 'user' &&
                ((user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.name && user.name.toLowerCase().includes(searchTerm)))
            ).filter(user =>
                !selectedTeachers.some(selected => selected.id === user.id)
            );
            teacherDropdown.innerHTML = '';
            if (filtered.length === 0) {
                teacherDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
                teacherDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(user => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <div style="font-weight: 500;">${user.email}</div>
                    <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
                `;
                item.addEventListener('click', () => {
                    teacherInput.value = user.email;
                    teacherDropdown.style.display = 'none';
                    teacherInput.dispatchEvent(new Event('input'));
                });
                teacherDropdown.appendChild(item);
            });
            teacherDropdown.style.display = 'block';
        };
        teacherInput.addEventListener('focus', () => {
            if (teacherInput.value.trim()) filterTeachers(teacherInput.value);
        });
        teacherInput.addEventListener('input', (e) => {
            filterTeachers(e.target.value);
        });
        addTeacherBtn.addEventListener('click', () => {
            const email = teacherInput.value.trim();
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            const user = allUsers.find(u => u.email === email && u.role === 'user');
            if (!user) {
                alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
                return;
            }
            if (selectedTeachers.some(u => u.id === user.id)) {
                alert('Этот преподаватель уже добавлен');
                return;
            }
            selectedTeachers.push(user);
            teacherInput.value = '';
            teacherDropdown.style.display = 'none';
            renderTeachers();
        });
        document.addEventListener('click', (e) => {
            if (!teacherInputDiv.contains(e.target)) teacherDropdown.style.display = 'none';
        });
        // Add autocomplete input for students
        const studentInputDiv = document.createElement('div');
        studentInputDiv.className = 'search';
        studentInputDiv.style.position = 'relative';
        studentInputDiv.innerHTML = `
            <input class="form-input" id="add-student-email" placeholder="Введите email студента" type="email" autocomplete="off"/>
            <button class="btn btn-primary" id="add-student-btn" type="button">Добавить</button>
        `;
        studentsContainer.parentNode.insertBefore(studentInputDiv, studentsContainer);
        const studentInput = studentInputDiv.querySelector('#add-student-email');
        const addStudentBtn = studentInputDiv.querySelector('#add-student-btn');
        const studentDropdown = document.createElement('div');
        studentDropdown.className = 'autocomplete-dropdown';
        studentDropdown.id = 'student-create-dropdown';
        studentDropdown.style.position = 'absolute';
        studentDropdown.style.top = '100%';
        studentDropdown.style.left = '0';
        studentDropdown.style.width = '100%';
        studentDropdown.style.zIndex = '10';
        studentDropdown.style.background = '#fff';
        studentDropdown.style.border = '1px solid #ccc';
        studentDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        studentDropdown.style.display = 'none';
        studentInputDiv.appendChild(studentDropdown);
        const filterStudents = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                studentDropdown.style.display = 'none';
                return;
            }
            const filtered = allUsers.filter(user =>
                user.role === 'user' &&
                ((user.email && user.email.toLowerCase().includes(searchTerm)) ||
                (user.name && user.name.toLowerCase().includes(searchTerm)))
            ).filter(user =>
                !selectedStudents.some(selected => selected.id === user.id)
            );
            studentDropdown.innerHTML = '';
            if (filtered.length === 0) {
                studentDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
                studentDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(user => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `
                    <div style="font-weight: 500;">${user.email}</div>
                    <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
                `;
                item.addEventListener('click', () => {
                    studentInput.value = user.email;
                    studentDropdown.style.display = 'none';
                    studentInput.dispatchEvent(new Event('input'));
                });
                studentDropdown.appendChild(item);
            });
            studentDropdown.style.display = 'block';
        };
        studentInput.addEventListener('focus', () => {
            if (studentInput.value.trim()) filterStudents(studentInput.value);
        });
        studentInput.addEventListener('input', (e) => {
            filterStudents(e.target.value);
        });
        addStudentBtn.addEventListener('click', () => {
            const email = studentInput.value.trim();
            if (!email) {
                alert('Пожалуйста, введите email');
                return;
            }
            const user = allUsers.find(u => u.email === email && u.role === 'user');
            if (!user) {
                alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
                return;
            }
            if (selectedStudents.some(u => u.id === user.id)) {
                alert('Этот студент уже добавлен');
                return;
            }
            selectedStudents.push(user);
            studentInput.value = '';
            studentDropdown.style.display = 'none';
            renderStudents();
        });
        document.addEventListener('click', (e) => {
            if (!studentInputDiv.contains(e.target)) studentDropdown.style.display = 'none';
        });
        // Add autocomplete input for groups
        const groupInputDiv = document.createElement('div');
        groupInputDiv.className = 'search';
        groupInputDiv.style.position = 'relative';
        groupInputDiv.innerHTML = `
            <input class="form-input" id="add-group-name" placeholder="Добавить всех из группы..." type="text" autocomplete="off"/>
            <button class="btn btn-primary" id="add-group-btn" type="button">Добавить группу</button>
        `;
        studentsContainer.parentNode.insertBefore(groupInputDiv, studentsContainer);
        const groupInput = groupInputDiv.querySelector('#add-group-name');
        const addGroupBtn = groupInputDiv.querySelector('#add-group-btn');
        const groupDropdown = document.createElement('div');
        groupDropdown.className = 'autocomplete-dropdown';
        groupDropdown.id = 'group-create-dropdown';
        groupDropdown.style.position = 'absolute';
        groupDropdown.style.top = '100%';
        groupDropdown.style.left = '0';
        groupDropdown.style.width = '100%';
        groupDropdown.style.zIndex = '10';
        groupDropdown.style.background = '#fff';
        groupDropdown.style.border = '1px solid #ccc';
        groupDropdown.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
        groupDropdown.style.display = 'none';
        groupInputDiv.appendChild(groupDropdown);
        const renderSelectedGroups = () => {
            let groupList = document.getElementById('selected-groups-list');
            if (!groupList) {
                groupList = document.createElement('div');
                groupList.id = 'selected-groups-list';
                groupList.className = 'list-container';
                groupInputDiv.parentNode.insertBefore(groupList, groupInputDiv.nextSibling);
            }
            groupList.innerHTML = '';
            if (selectedGroups.length === 0) {
                groupList.innerHTML = '<div class="empty-state">Нет выбранных групп</div>';
                return;
            }
            selectedGroups.forEach(group => {
                const div = document.createElement('div');
                div.className = 'list-item';
                div.innerHTML = `
                    <div>${group.name}</div>
                    <button class="btn btn-danger remove-group" data-id="${group.id}">Удалить</button>
                `;
                groupList.appendChild(div);
            });
            groupList.querySelectorAll('.remove-group').forEach(btn => {
                btn.addEventListener('click', () => {
                    const groupId = parseInt(btn.dataset.id);
                    selectedGroups = selectedGroups.filter(g => g.id !== groupId);
                    renderSelectedGroups();
                });
            });
        };
        renderSelectedGroups();
        const filterGroups = (input) => {
            const searchTerm = input.toLowerCase().trim();
            if (!searchTerm) {
                groupDropdown.style.display = 'none';
                return;
            }
            const filtered = allGroups.filter(group =>
                group.name && group.name.toLowerCase().includes(searchTerm)
            ).filter(group =>
                !selectedGroups.some(selected => selected.id === group.id)
            );
            groupDropdown.innerHTML = '';
            if (filtered.length === 0) {
                groupDropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Группы не найдены</div>';
                groupDropdown.style.display = 'block';
                return;
            }
            filtered.forEach(group => {
                const item = document.createElement('div');
                item.className = 'autocomplete-item';
                item.innerHTML = `<div style="font-weight: 500;">${group.name}</div>`;
                item.addEventListener('click', () => {
                    groupInput.value = group.name;
                    groupDropdown.style.display = 'none';
                    groupInput.dispatchEvent(new Event('input'));
                });
                groupDropdown.appendChild(item);
            });
            groupDropdown.style.display = 'block';
        };
        groupInput.addEventListener('focus', () => {
            if (groupInput.value.trim()) filterGroups(groupInput.value);
        });
        groupInput.addEventListener('input', (e) => {
            filterGroups(e.target.value);
        });
        addGroupBtn.addEventListener('click', async () => {
            const name = groupInput.value.trim();
            if (!name) {
                alert('Пожалуйста, введите название группы');
                return;
            }
            const group = allGroups.find(g => g.name === name);
            if (!group) {
                alert('Группа с таким названием не найдена. Пожалуйста, выберите из списка.');
                return;
            }
            if (selectedGroups.some(g => g.id === group.id)) {
                alert('Эта группа уже выбрана');
                return;
            }
            selectedGroups.push(group);
            groupInput.value = '';
            groupDropdown.style.display = 'none';
            renderSelectedGroups();
            // Fetch group members and add to selectedStudents (avoid duplicates)
            try {
                const members = await api.getGroupMembers(group.id);
                let added = 0;
                members.forEach(user => {
                    if (user.role === 'user' && !selectedStudents.some(u => u.id === user.id)) {
                        selectedStudents.push(user);
                        added++;
                    }
                });
                if (added > 0) renderStudents();
            } catch (err) {
                alert('Ошибка при получении участников группы');
            }
        });
        document.addEventListener('click', (e) => {
            if (!groupInputDiv.contains(e.target)) groupDropdown.style.display = 'none';
        });
    })();

    // Обработчик сохранения курса
    document.getElementById('course-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('course-title').value.trim();
        if (!name) {
            alert('Название курса не может быть пустым');
            return;
        }
        try {
            const courseData = {
                name: name,
                completeness: 0
            };
            const newCourse = await api.createCourse(courseData);
            // Add selected teachers
            for (const user of selectedTeachers) {
                try {
                    await api.addTeacherToCourse(newCourse.id || newCourse.ID || newCourse.courseId, user.email);
                } catch (err) {
                    alert(`Ошибка при добавлении преподавателя ${user.email}`);
                }
            }
            // Add selected students
            for (const user of selectedStudents) {
                try {
                    await api.addStudentToCourse(newCourse.id || newCourse.ID || newCourse.courseId, user.email);
                } catch (err) {
                    alert(`Ошибка при добавлении студента ${user.email}`);
                }
            }
            alert('Курс создан!');
            loadContent('courses');
        } catch (error) {
            console.error('Error creating course:', error);
            alert('Ошибка при создании курса');
        }
    });
};

// Инициализация страницы групп
const initGroupsPage = async () => {
    document.getElementById('create-group-btn')?.addEventListener('click', () => {
        console.log('Create group button clicked'); // Debug log
        loadContent('group_creation');
    });

    try {
        const groups = await api.getAllGroups();
    const groupsContainer = document.getElementById('groups-container');
    groupsContainer.innerHTML = '';

        if (!groups || groups.length === 0) {
            groupsContainer.innerHTML = '<div class="empty-state">Нет созданных групп</div>';
            return;
        }

        groups.forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        groupCard.innerHTML = `
            <div class="group-header">
                <div class="group-title">${group.name}</div>
                <button class="btn btn-primary edit-group" data-id="${group.id}">Редактировать</button>
            </div>
            <div class="group-emails">
                    <!-- Email list would be populated here if we had group members endpoint -->
            </div>
        `;

                groupCard.querySelector('.edit-group').addEventListener('click', () => {
            console.log('Edit group button clicked for group ID:', group.id);
            localStorage.setItem('currentGroup', group.id);
            console.log('Group ID stored in localStorage:', localStorage.getItem('currentGroup'));
            loadContent('group_details');
            console.log('Navigating to group_details page');
        });

        groupsContainer.appendChild(groupCard);
    });
    } catch (error) {
        console.error('Error loading groups:', error);
        document.getElementById('groups-container').innerHTML =
            '<div class="error">Ошибка загрузки групп</div>';
    }
};

// Инициализация страницы создания группы
const initGroupCreationPage = () => {
    console.log('Initializing group creation page');

    // Store selected users for the new group
    let selectedUsers = [];

    // Set up email autocomplete
    setupGroupCreationAutocomplete(selectedUsers);

    // Cancel button
    document.getElementById('cancel-group')?.addEventListener('click', () => {
        loadContent('groups');
    });

    // Form submission
    document.getElementById('group-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('group-name').value.trim();

        if (!name) {
            alert('Пожалуйста, введите название группы');
            return;
        }

        try {
            // Create the group first
            const groupData = { name };
            let newGroup = await api.createGroup(groupData);

            // If backend returns no JSON, fetch the group by name as fallback
            if (!newGroup || !newGroup.id) {
                const allGroups = await api.getAllGroups();
                newGroup = allGroups.find(g => g.name === name);
            }

            // Debug log: show group and users
            console.log('[CREATE] Created group:', newGroup);
            console.log('[CREATE] Selected users to add:', selectedUsers);

            if (!newGroup || !newGroup.id) {
                alert('Ошибка: не удалось получить созданную группу.');
                return;
            }

            // Add selected users to the group
            for (const user of selectedUsers) {
                try {
                    console.log('[CREATE] Adding user to group:', user.email, '->', newGroup.id);
                    await api.addStudentToGroup(newGroup.id, user.email);
                } catch (error) {
                    console.error(`[CREATE] Error adding user ${user.email} to group:`, error);
                    alert(`Ошибка при добавлении пользователя ${user.email} в группу`);
                }
            }

            // Fetch and log group members after creation
            try {
                const members = await api.getGroupMembers(newGroup.id);
                console.log('[CREATE] Members after creation:', members);
            } catch (err) {
                console.error('[CREATE] Error fetching members after creation:', err);
            }

            alert('Группа создана успешно!');
            loadContent('groups');
        } catch (error) {
            console.error('[CREATE] Error creating group:', error);
            alert('Ошибка при создании группы');
        }
    });
};

// Setup email autocomplete for group creation
const setupGroupCreationAutocomplete = async (selectedUsers) => {
    const emailInput = document.getElementById('add-email');
    const addButton = document.getElementById('add-email-btn');

    if (!emailInput || !addButton) {
        console.error('Email input or add button not found');
        console.log('Available elements:', {
            emailInput: document.getElementById('add-email'),
            addButton: document.getElementById('add-email-btn')
        });
        return;
    }

    console.log('Setting up group creation autocomplete');

    // Get all users for autocomplete
    let allUsers = [];
    try {
        console.log('Fetching users for autocomplete...');
        allUsers = await api.getAllUsers();
        console.log('Fetched users:', allUsers);
    } catch (error) {
        console.error('Error fetching users for autocomplete:', error);
        // Show user-friendly error
        emailInput.placeholder = 'Ошибка загрузки пользователей';
        return;
    }

    if (!allUsers || allUsers.length === 0) {
        console.log('No users found for autocomplete');
        emailInput.placeholder = 'Нет пользователей в системе';
        return;
    }

    // Create autocomplete dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    dropdown.id = 'group-creation-dropdown';

    // Remove any existing dropdown
    const existingDropdown = document.getElementById('group-creation-dropdown');
    if (existingDropdown) {
        existingDropdown.remove();
    }

    emailInput.parentNode.style.position = 'relative';
    emailInput.parentNode.appendChild(dropdown);

    // Filter users based on input
    const filterUsers = (input) => {
        console.log('Filtering users for input:', input);
        const searchTerm = input.toLowerCase().trim();

        if (!searchTerm) {
            dropdown.style.display = 'none';
            return;
        }

        const filtered = allUsers.filter(user =>
            (user.email && user.email.toLowerCase().includes(searchTerm)) ||
            (user.name && user.name.toLowerCase().includes(searchTerm))
        ).filter(user =>
            !selectedUsers.some(selected => selected.id === user.id)
        );

        console.log('Filtered users:', filtered.length);

        dropdown.innerHTML = '';

        if (filtered.length === 0) {
            dropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
            dropdown.style.display = 'block';
            return;
        }

        filtered.forEach(user => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `
                <div style="font-weight: 500;">${user.email}</div>
                <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
            `;

            item.addEventListener('click', () => {
                console.log('User selected:', user.email);
                emailInput.value = user.email;
                dropdown.style.display = 'none';
                // Trigger input event to validate
                emailInput.dispatchEvent(new Event('input'));
            });

            dropdown.appendChild(item);
        });

        dropdown.style.display = 'block';
    };

    // Show dropdown on input focus
    emailInput.addEventListener('focus', () => {
        console.log('Input focused');
        if (emailInput.value.trim()) {
            filterUsers(emailInput.value);
        }
    });

    // Filter on input
    emailInput.addEventListener('input', (e) => {
        console.log('Input event triggered:', e.target.value);
        filterUsers(e.target.value);
    });

    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!emailInput.parentNode.contains(e.target)) {
            dropdown.style.display = 'none';
        }
    });

    // Add user to selected list
    addButton.addEventListener('click', () => {
        const email = emailInput.value.trim();
        if (!email) {
            alert('Пожалуйста, введите email');
            return;
        }

        const user = allUsers.find(u => u.email === email);
        if (!user) {
            alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
            return;
        }

        if (selectedUsers.some(u => u.id === user.id)) {
            alert('Этот пользователь уже добавлен');
            return;
        }

        console.log('Adding user to selected list:', user);
        selectedUsers.push(user);
        emailInput.value = '';
        dropdown.style.display = 'none';
        updateSelectedUsersList(selectedUsers);
    });

    // Allow Enter key to add user
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addButton.click();
        }
    });

    console.log('Group creation autocomplete setup complete');
};

// Update the selected users list display
const updateSelectedUsersList = (selectedUsers) => {
    const container = document.getElementById('group-emails-container');

    if (!container) {
        console.error('Group emails container not found');
        return;
    }

    container.innerHTML = '';

    if (selectedUsers.length === 0) {
        container.innerHTML = '<div class="empty-state">Нет выбранных участников</div>';
        return;
    }

    selectedUsers.forEach(user => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div>
                <div>${user.email}</div>
                <div class="text-tertiary">${user.name}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-danger remove-user" data-id="${user.id}">Удалить</button>
            </div>
        `;
        container.appendChild(div);
    });

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-user').forEach(btn => {
        btn.addEventListener('click', () => {
            const userId = parseInt(btn.dataset.id);
            const index = selectedUsers.findIndex(u => u.id === userId);
            if (index > -1) {
                selectedUsers.splice(index, 1);
                updateSelectedUsersList(selectedUsers);
            }
        });
    });
};

// Инициализация страницы деталей группы
const initGroupDetailsPage = async () => {
    console.log('Initializing group details page');
    const groupId = localStorage.getItem('currentGroup');
    console.log('Retrieved group ID from localStorage:', groupId);

    try {
        // Fetch fresh group data from API
        const groups = await api.getAllGroups();
        console.log('Fetched groups from API:', groups);
        const group = groups.find(g => g.id == parseInt(groupId));
        console.log('Found group:', group);

        if (!group) {
            console.log('Group not found, returning to groups page');
            loadContent('groups');
            return;
        }

        // Set up the group details page content here
        const container = document.getElementById('group-details-container');
        if (container) {
            container.innerHTML = `
                <div class="header">
                    <h1 class="welcome-title">Редактирование группы: ${group.name}</h1>
                </div>
                <div class="group-details-content">
                    <div class="form-group">
                        <label for="group-name">Название группы:</label>
                        <input type="text" id="group-name" value="${group.name}" class="form-input">
                    </div>
                    <div class="form-group">
                        <label>Участники группы</label>
                            <div class="add-member-section">
                            <div class="search">
                                    <input type="text" id="add-member-email" class="form-input" placeholder="Введите email пользователя">
                                <button type="button" class="btn btn-primary" id="add-member-btn">Добавить</button>
                                </div>
                            </div>
                        <div id="group-members-list" class="list-container"></div>
                            </div>
                    <div class="form-actions">
                        <button class="btn btn-secondary" id="cancel-edit-group">Отмена</button>
                        <button class="btn btn-primary" id="save-group">Сохранить</button>
                        <button class="btn btn-danger" id="delete-group">Удалить группу</button>
                    </div>
                </div>
            `;

            // --- New logic: maintain selectedUsers array for editing ---
            let allUsers = [];
            let selectedUsers = [];
            let originalMembers = [];
            try {
                allUsers = await api.getAllUsers();
                originalMembers = (await api.getGroupMembers(groupId)) || [];
                selectedUsers = [...originalMembers];
            } catch (error) {
                alert('Ошибка загрузки пользователей или участников группы');
                return;
            }

            // Render selected users list
            const updateSelectedUsersList = (selectedUsers) => {
                const container = document.getElementById('group-members-list');
                if (!container) {
                    alert('[EDIT] Не найден контейнер для участников группы!');
                    console.error('[EDIT] group-members-list not found');
                    return;
                }
                container.innerHTML = '';
                if (selectedUsers.length === 0) {
                    container.innerHTML = '<div class="empty-state">Нет выбранных участников</div>';
                    return;
                }
                selectedUsers.forEach(user => {
                    const div = document.createElement('div');
                    div.className = 'list-item';
                    div.innerHTML = `
                        <div>
                            <div>${user.email}</div>
                            <div class="text-tertiary">${user.name || ''}</div>
                        </div>
                        <div class="list-item-actions">
                            <button class="btn btn-danger remove-user" data-id="${user.id}">Удалить</button>
                        </div>
                    `;
                    container.appendChild(div);
                });
                // Remove user event
                container.querySelectorAll('.remove-user').forEach(btn => {
                    btn.addEventListener('click', () => {
                        const userId = parseInt(btn.dataset.id);
                        const index = selectedUsers.findIndex(u => u.id === userId);
                        if (index > -1) {
                            console.log('[EDIT] Removing user:', selectedUsers[index]);
                            selectedUsers.splice(index, 1);
                            updateSelectedUsersList(selectedUsers);
                        }
                    });
                });
                console.log('[EDIT] Rendered selected users:', selectedUsers);
            };
            updateSelectedUsersList(selectedUsers);

            // Autocomplete dropdown logic
            const emailInput = document.getElementById('add-member-email');
            const addButton = document.getElementById('add-member-btn');
            if (!emailInput || !addButton) {
                alert('[EDIT] Не найдены поля для добавления пользователя!');
                console.error('[EDIT] add-member-email or add-member-btn not found');
            }
            const dropdown = document.createElement('div');
            dropdown.className = 'autocomplete-dropdown';
            dropdown.id = 'group-edit-dropdown';
            const existingDropdown = document.getElementById('group-edit-dropdown');
            if (existingDropdown) existingDropdown.remove();
            if (emailInput && emailInput.parentNode) {
                emailInput.parentNode.style.position = 'relative';
                emailInput.parentNode.appendChild(dropdown);
            }
            const filterUsers = (input) => {
                const searchTerm = input.toLowerCase().trim();
                if (!searchTerm) {
                    dropdown.style.display = 'none';
                    return;
                }
                const filtered = allUsers.filter(user =>
                    (user.email && user.email.toLowerCase().includes(searchTerm)) ||
                    (user.name && user.name.toLowerCase().includes(searchTerm))
                ).filter(user =>
                    !selectedUsers.some(selected => selected.id === user.id)
                );
                dropdown.innerHTML = '';
                if (filtered.length === 0) {
                    dropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены</div>';
                    dropdown.style.display = 'block';
                    return;
                }
                filtered.forEach(user => {
                    const item = document.createElement('div');
                    item.className = 'autocomplete-item';
                    item.innerHTML = `
                        <div style="font-weight: 500;">${user.email}</div>
                        <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
                    `;
                    item.addEventListener('click', () => {
                        emailInput.value = user.email;
                        dropdown.style.display = 'none';
                        emailInput.dispatchEvent(new Event('input'));
                    });
                    dropdown.appendChild(item);
                });
                dropdown.style.display = 'block';
            };
            if (emailInput) {
                emailInput.addEventListener('focus', () => {
                    if (emailInput.value.trim()) filterUsers(emailInput.value);
                });
                emailInput.addEventListener('input', (e) => {
                    filterUsers(e.target.value);
                });
                emailInput.addEventListener('keypress', (e) => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        addButton.click();
                    }
                });
            }
            document.addEventListener('click', (e) => {
                if (emailInput && !emailInput.parentNode.contains(e.target)) dropdown.style.display = 'none';
            });
            if (addButton) {
                addButton.addEventListener('click', () => {
                    if (!emailInput) return;
                    const email = emailInput.value.trim();
                    if (!email) {
                        alert('Пожалуйста, введите email');
                        return;
                    }
                    const user = allUsers.find(u => u.email === email);
                    if (!user) {
                        alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
                        return;
                    }
                    if (selectedUsers.some(u => u.id === user.id)) {
                        alert('Этот пользователь уже добавлен');
                        return;
                    }
                    selectedUsers.push(user);
                    emailInput.value = '';
                    dropdown.style.display = 'none';
                    updateSelectedUsersList(selectedUsers);
                    console.log('[EDIT] Added user:', user);
                });
            }

            // Save group changes
            document.getElementById('save-group')?.addEventListener('click', async () => {
                const newName = document.getElementById('group-name').value;
                // Update group name, description, and status (send all required fields)
                const updatePayload = {
                    name: newName,
                    description: group.description || null,
                    status: group.status || 'active',
                };
                try {
                    await api.updateGroup(group.id, updatePayload);
                } catch (error) {
                    alert('Ошибка при обновлении группы');
                    return;
                }
                // Sync group members: add new, remove missing
                const originalIds = new Set(originalMembers.map(u => u.id));
                const selectedIds = new Set(selectedUsers.map(u => u.id));
                // Add new users
                for (const user of selectedUsers) {
                    if (!originalIds.has(user.id)) {
                        try {
                            await api.addStudentToGroup(group.id, user.email);
                        } catch (error) {
                            alert(`Ошибка при добавлении пользователя ${user.email}`);
                        }
                    }
                }
                // Remove users
                for (const user of originalMembers) {
                    if (!selectedIds.has(user.id)) {
                        try {
                            await api.removeStudentFromGroup(group.id, user.id);
                        } catch (error) {
                            alert(`Ошибка при удалении пользователя ${user.email}`);
                        }
                    }
                }
                alert('Группа обновлена!');
                loadContent('groups');
            });
            document.getElementById('cancel-edit-group')?.addEventListener('click', () => {
                loadContent('groups');
            });
            document.getElementById('delete-group')?.addEventListener('click', async () => {
                if (confirm('Вы уверены, что хотите удалить эту группу?')) {
                    try {
                        await api.deleteGroup(group.id);
                        alert('Группа удалена успешно!');
                        loadContent('groups');
                    } catch (error) {
                        alert('Ошибка при удалении группы');
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error fetching group data:', error);
        loadContent('groups');
        return;
    }
};

// Load group members
const loadGroupMembers = async (groupId) => {
    try {
        const members = await api.getGroupMembers(groupId);
        const membersList = document.getElementById('group-members-list');

        if (members && members.length > 0) {
            membersList.innerHTML = members.map(member => `
                <div class="member-item">
                    <div class="member-info">
                        <div class="member-email">${member.email}</div>
                        <div class="member-name">${member.name || 'Без имени'}</div>
                    </div>
                    <button class="btn btn-danger btn-sm remove-member" data-email="${member.email}">Удалить</button>
                </div>
            `).join('');
        } else {
            membersList.innerHTML = '<div class="no-members">В группе пока нет участников</div>';
        }
    } catch (error) {
        console.error('Error loading group members:', error);
        document.getElementById('group-members-list').innerHTML =
            '<div class="error">Ошибка загрузки участников группы</div>';
    }
};

// Setup group member management
const setupGroupMemberManagement = async (groupId) => {
    const emailInput = document.getElementById('add-member-email');
    const addButton = document.getElementById('add-member-btn');
    const membersList = document.getElementById('group-members-list');

    if (!emailInput || !addButton || !membersList) {
        console.error('Email input, add button, or members list not found');
        return;
    }

    // Get all users for suggestions
    let allUsers = [];
    try {
        allUsers = await api.getAllUsers();
    } catch (error) {
        console.error('Error fetching users:', error);
        emailInput.placeholder = 'Ошибка загрузки пользователей';
        return;
    }

    // Helper to refresh and render current group members
    const refreshMembers = async () => {
    let currentMembers = [];
    try {
        currentMembers = await api.getGroupMembers(groupId);
    } catch (error) {
        console.error('Error fetching current members:', error);
            membersList.innerHTML = '<div class="error">Ошибка загрузки участников группы</div>';
            return;
        }

        if (!currentMembers || currentMembers.length === 0) {
            membersList.innerHTML = '<div class="no-members">В группе пока нет участников</div>';
            return;
        }

        membersList.innerHTML = '';
        currentMembers.forEach(member => {
            const div = document.createElement('div');
            div.className = 'member-item';
            div.innerHTML = `
                <div class="member-info">
                    <div class="member-email">${member.email}</div>
                    <div class="member-name">${member.name || 'Без имени'}</div>
                </div>
                <button class="btn btn-danger btn-sm remove-member" data-email="${member.email}">Удалить</button>
            `;
            membersList.appendChild(div);
        });

        // Remove member event
        membersList.querySelectorAll('.remove-member').forEach(btn => {
            btn.addEventListener('click', async () => {
                const email = btn.dataset.email;
                try {
                    await api.removeStudentFromGroup(groupId, email);
                    await refreshMembers();
                } catch (error) {
                    alert('Ошибка при удалении пользователя из группы');
                }
            });
        });
    };

    // Initial load
    await refreshMembers();

    // --- Autocomplete dropdown logic (same as group creation) ---
    let currentMemberEmails = [];
    try {
        const currentMembers = await api.getGroupMembers(groupId);
        currentMemberEmails = currentMembers.map(m => m.email);
    } catch {}

    // Create autocomplete dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    dropdown.id = 'group-edit-dropdown';
    const existingDropdown = document.getElementById('group-edit-dropdown');
    if (existingDropdown) existingDropdown.remove();
    emailInput.parentNode.style.position = 'relative';
    emailInput.parentNode.appendChild(dropdown);

    // Filter users based on input
    const filterUsers = (input) => {
        const searchTerm = input.toLowerCase().trim();
        if (!searchTerm) {
            dropdown.style.display = 'none';
            return;
        }
        const filtered = allUsers.filter(user =>
            (user.email && user.email.toLowerCase().includes(searchTerm)) ||
            (user.name && user.name.toLowerCase().includes(searchTerm))
        ).filter(user =>
            !currentMemberEmails.includes(user.email)
        );
        dropdown.innerHTML = '';
        if (filtered.length === 0) {
            dropdown.innerHTML = '<div class="autocomplete-item" style="padding: 10px; color: #666; font-style: italic;">Пользователи не найдены или уже в группе</div>';
            dropdown.style.display = 'block';
            return;
        }
        filtered.forEach(user => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.innerHTML = `
                <div style="font-weight: 500;">${user.email}</div>
                <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
            `;
            item.addEventListener('click', () => {
                emailInput.value = user.email;
                dropdown.style.display = 'none';
                emailInput.dispatchEvent(new Event('input'));
            });
            dropdown.appendChild(item);
        });
        dropdown.style.display = 'block';
    };

    // Show dropdown on input focus
    emailInput.addEventListener('focus', () => {
        if (emailInput.value.trim()) filterUsers(emailInput.value);
    });
    // Filter on input
    emailInput.addEventListener('input', (e) => {
        filterUsers(e.target.value);
    });
    // Hide dropdown when clicking outside
    document.addEventListener('click', (e) => {
        if (!emailInput.parentNode.contains(e.target)) dropdown.style.display = 'none';
    });

    // Add member button
    addButton.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        if (!email) {
            alert('Пожалуйста, введите email');
            return;
        }
        const user = allUsers.find(u => u.email === email);
        if (!user) {
            alert('Пользователь с таким email не найден. Пожалуйста, выберите пользователя из списка.');
            return;
        }
        if (currentMemberEmails.includes(email)) {
            alert('Этот пользователь уже в группе');
            return;
        }
        try {
            await api.addStudentToGroup(groupId, email);
            emailInput.value = '';
            dropdown.style.display = 'none';
            // Refresh members and update currentMemberEmails
            await refreshMembers();
            const updatedMembers = await api.getGroupMembers(groupId);
            currentMemberEmails = updatedMembers.map(m => m.email);
        } catch (error) {
            alert('Ошибка при добавлении пользователя в группу');
        }
    });
    // Allow Enter key to add user
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addButton.click();
        }
    });
};

// Инициализация страницы создания теста/задания
const initQuizCreationPage = () => {
    console.log('Initializing quiz creation page...'); // Debug log

    // Close modal handler
    document.querySelector('.modal-close')?.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        loadContent('quizzes');
    });

    // Cancel button handler
    document.getElementById('cancel-quiz')?.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        loadContent('quizzes');
    });

    // Form submission handler
    document.getElementById('quiz-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Quiz form submitted'); // Debug log
        // TODO: Implement quiz creation logic
        alert('Quiz creation functionality will be implemented here');
    });
};

// Инициализация страницы начала теста для студента
const initStudentQuizStart = () => {
    console.log('Initializing student quiz start page...'); // Debug log

    // Close modal handler
    document.querySelector('.modal-close')?.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        loadContent('quizzes');
    });

    // Cancel button handler
    document.getElementById('cancel-quiz-start')?.addEventListener('click', () => {
        document.querySelector('.modal').style.display = 'none';
        loadContent('quizzes');
    });

    // Start quiz button handler
    document.getElementById('start-quiz')?.addEventListener('click', () => {
        console.log('Starting quiz...'); // Debug log
        loadContent('student_quiz_view');
    });
};

// Инициализация страницы прохождения теста для студента
const initStudentQuizView = () => {
    console.log('Initializing student quiz view page...'); // Debug log

    // Submit quiz button handler
    document.getElementById('submit-quiz')?.addEventListener('click', async (e) => {
        e.preventDefault();
        console.log('Submitting quiz...'); // Debug log
        // TODO: Implement quiz submission logic
        alert('Quiz submission functionality will be implemented here');
        loadContent('quizzes');
    });
};

// Инициализация страницы базы данных
const initDatabasePage = async () => {
    console.log('Initializing database page...'); // Debug log

    // Обработчик добавления почты
    document.getElementById('add-email-db')?.addEventListener('click', () => {
        loadContent('email_add');
    });

    try {
    // Заполняем список почт
        console.log('=== DATABASE PAGE DEBUG ===');
        console.log('Fetching users from API...'); // Debug log
        console.log('API service available:', typeof api); // Debug log
        console.log('API service methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(api))); // Debug log
        console.log('API token:', api.token); // Debug log
        console.log('localStorage token:', localStorage.getItem('authToken')); // Debug log

        // Test if API service is working
        if (typeof api === 'undefined') {
            console.error('API service is not defined!');
            return;
        }

        if (!api.token) {
            console.error('No authentication token found!');
            return;
        }

        const emails = await api.getAllUsers();
        console.log('Users received:', emails); // Debug log

    const dbContainer = document.getElementById('database-container');
    dbContainer.innerHTML = '';

        if (!emails || emails.length === 0) {
            dbContainer.innerHTML = '<div class="empty-state">Нет пользователей в базе данных</div>';
            return;
        }

    emails.forEach(email => {
        const div = document.createElement('div');
        div.className = 'list-item';
        div.innerHTML = `
            <div>
                <div>${email.email}</div>
                <div class="text-tertiary">${email.role === 'teacher' ? 'Преподаватель' : 'Студент'}</div>
            </div>
            <div class="list-item-actions">
                <button class="btn btn-danger delete-email" data-id="${email.id}">Удалить</button>
            </div>
        `;
        dbContainer.appendChild(div);
    });

    // Обработчики удаления почты
    document.querySelectorAll('.delete-email').forEach(btn => {
            btn.addEventListener('click', async () => {
            const emailId = btn.dataset.id;
                if (confirm('Вы уверены, что хотите удалить этого пользователя?')) {
                    try {
                        await api.deleteUser(emailId);
                        initDatabasePage(); // Refresh the page
                    } catch (error) {
                        console.error('Error deleting user:', error);
                        alert('Ошибка при удалении пользователя');
                    }
                }
            });
        });
    } catch (error) {
        console.error('Error loading users:', error);
        document.getElementById('database-container').innerHTML =
            '<div class="error">Ошибка загрузки пользователей</div>';
    }
};

// Инициализация страницы добавления почты
const initEmailAddPage = () => {
    // Отмена добавления
    document.getElementById('cancel-email')?.addEventListener('click', () => {
        loadContent('database');
    });

    // Сохранение почты
    document.getElementById('email-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        const role = document.getElementById('email-role').value;

        try {
            const userData = {
                email: email,
                name: email.split('@')[0], // Use email prefix as name
                role: role,
                password: 'defaultpassword123' // In production, this would be generated or required
            };

            console.log('Creating user with data:', userData); // Debug log
            await api.createUser(userData);
            console.log('User created successfully'); // Debug log

            // Clear the form
            document.getElementById('email-form').reset();

            // Go back to database page and refresh
            loadContent('database');
        } catch (error) {
            console.error('Error creating user:', error);
            alert('Ошибка при создании пользователя');
        }
    });
};

const initUserCoursesPage = async () => {
    try {
    const container = document.getElementById('user-courses-container');
        const userProfile = await api.getCurrentUserProfile();
        const userEmail = userProfile.email;

        const userCourses = await api.getUserCourses(userEmail);

        if (!userCourses || userCourses.length === 0) {
        container.innerHTML = '<div class="empty-message">Курсы вам пока не доступны :(</div>';
        return;
    }

    // Отображаем курсы пользователя
    userCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__body">
                    <h2 class="card__title">${course.name}</h2>
            </div>
        `;
        card.addEventListener('click', () => {
            localStorage.setItem('currentCourse', course.id);
            loadContent('course_detail');
        });
        container.appendChild(card);
    });
    } catch (error) {
        console.error('Error loading user courses:', error);
        document.getElementById('user-courses-container').innerHTML =
            '<div class="error">Ошибка загрузки курсов</div>';
    }
};

// Инициализация страницы деталей курса
const initCourseDetailPage = () => {
    const courseId = localStorage.getItem('currentCourse');
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(c => c.id == courseId);

    if (!course) {
        loadContent('user_courses');
        return;
    }

    // Определяем роль пользователя в курсе
    const userEmail = JSON.parse(localStorage.getItem('userProfile')).email;
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    const user = emails.find(e => e.email === userEmail);
    const isTeacher = course.teachers?.includes(user.id);

    // Настраиваем course bar
    const courseBar = document.getElementById('course-bar');
    courseBar.innerHTML = '';

    const tabs = [
        { id: 'course', text: 'Курс' },
        { id: 'settings', text: 'Настройки' },
        { id: 'stats', text: 'Статистика' }
    ];

    // Для студента убираем вкладку настроек
    if (!isTeacher) {
        tabs.splice(1, 1); // Удаляем вкладку настроек
        tabs[1].text = 'Успеваемость'; // Переименовываем статистику
    }

    tabs.forEach((tab, index) => {
        const btn = document.createElement('button');
        btn.className = 'course-bar-btn';
        if (index === (isTeacher ? 1 : 0)) btn.classList.add('active');
        btn.dataset.tab = tab.id;
        btn.textContent = tab.text;
        courseBar.appendChild(btn);
    });

    // Настраиваем сайдбар
    const courseSidebar = document.getElementById('course-sidebar');
    courseSidebar.innerHTML = '';

    // Добавляем кнопку "Назад"
    const backItem = document.createElement('div');
    backItem.className = 'course-sidebar-item';
    backItem.innerHTML = '&larr; Назад к курсам';
    backItem.addEventListener('click', () => loadContent('user_courses'));
    courseSidebar.appendChild(backItem);

    // Добавляем разделы в зависимости от вкладки
    const activeTab = document.querySelector('.course-bar-btn.active').dataset.tab;

    if (activeTab === 'settings') {
        const sections = [
            'О курсе', 'Описание', 'Изображение курса',
            'Часы работы', 'Формат курса', 'Внешний вид', 'Группы'
        ];

        sections.forEach(section => {
            const item = document.createElement('div');
            item.className = 'course-sidebar-item';
            item.textContent = section;
            courseSidebar.appendChild(item);
        });

        // Загружаем контент настроек
        loadContent('course_settings');

    } else if (activeTab === 'course') {
        // Добавляем разделы для контента курса
        const sections = ['Общее', 'Тема 1', 'Тема 2', 'Тема 3'];

        sections.forEach(section => {
            const item = document.createElement('div');
            item.className = 'course-sidebar-item';
            item.textContent = section;
            courseSidebar.appendChild(item);
        });

        // Загружаем контент курса
        loadContent('course_content');

    } else {
        // Для статистики/успеваемости
        const item = document.createElement('div');
        item.className = 'course-sidebar-item active';
        item.textContent = 'Общая статистика';
        courseSidebar.appendChild(item);

        // Загружаем контент статистики
        const content = document.getElementById('course-content');
        content.innerHTML = '<h2>Статистика успеваемости</h2><p>Здесь будут отображаться статистические данные...</p>';
    }

    // Обработчики переключения вкладок
    document.querySelectorAll('.course-bar-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.course-bar-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            initCourseDetailPage(); // Перезагружаем контент
        });
    });
};

// Инициализация страницы настроек курса
const initCourseSettings = () => {
    const courseId = localStorage.getItem('currentCourse');
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(c => c.id == courseId);

    if (!course) {
        loadContent('user_courses');
        return;
    }

    // Заполняем поля данными курса
    if (course.fullName) document.getElementById('course-full-name').value = course.fullName;
    if (course.shortName) document.getElementById('course-short-name').value = course.shortName;
    if (course.chatLink) document.getElementById('course-chat-link').value = course.chatLink;
    if (course.materialsLink) document.getElementById('course-materials-link').value = course.materialsLink;
    if (course.description) document.getElementById('course-description').innerHTML = course.description;
    if (course.image) document.getElementById('course-main-image').src = course.image;
    if (course.visibility) document.getElementById('course-visibility').value = course.visibility;
    if (course.allowDownload) document.getElementById('course-download').value = course.allowDownload;
    if (course.startDate) document.getElementById('course-start-date').value = course.startDate;
    if (course.courseId) document.getElementById('course-id').value = course.courseId;
    if (course.hiddenSections) document.getElementById('hidden-sections').value = course.hiddenSections;
    if (course.showGrades) document.getElementById('show-grades').value = course.showGrades;
    if (course.showReports) document.getElementById('show-reports').value = course.showReports;
    if (course.showDates) document.getElementById('show-dates').value = course.showDates;
    if (course.groupMode) document.getElementById('group-mode').value = course.groupMode;
    if (course.groupGrades) document.getElementById('group-grades').value = course.groupGrades;

    // Обработчик загрузки изображения
    document.getElementById('course-image-upload')?.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = document.createElement('img');
                    img.src = event.target.result;
                    img.alt = "Изображение курса";
                    document.getElementById('course-image-upload').innerHTML = '';
                    document.getElementById('course-image-upload').appendChild(img);
                    course.image = event.target.result;
                    localStorage.setItem('courses', JSON.stringify(courses));
                };
                reader.readAsDataURL(file);
            }
        };
        input.click();
    });

    // Обработчик добавления куратора
    document.getElementById('add-curator')?.addEventListener('click', () => {
        // В реальном приложении здесь должен быть список преподавателей курса
        alert('Функция добавления куратора в разработке');
    });

    // Обработчики сохранения данных при изменении
    const saveFields = [
        'course-full-name', 'course-short-name', 'course-chat-link', 'course-materials-link',
        'course-visibility', 'course-download', 'course-start-date', 'hidden-sections',
        'show-grades', 'show-reports', 'show-dates', 'group-mode', 'group-grades'
    ];

    saveFields.forEach(id => {
        document.getElementById(id)?.addEventListener('change', () => {
            course[id.replace('course-', '')] = document.getElementById(id).value;
            localStorage.setItem('courses', JSON.stringify(courses));
        });
    });

    // Сохранение описания
    document.getElementById('course-description')?.addEventListener('input', () => {
        course.description = document.getElementById('course-description').innerHTML;
        localStorage.setItem('courses', JSON.stringify(courses));
    });
};

// Инициализация страницы контента курса
const initCourseContent = () => {
    const courseId = localStorage.getItem('currentCourse');
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const course = courses.find(c => c.id == courseId);

    if (!course) {
        loadContent('user_courses');
        return;
    }

    // Заполняем общую информацию
    document.getElementById('course-main-name').textContent = course.fullName || course.title;
    document.getElementById('course-main-description').innerHTML = course.description || '';
    if (course.image) {
        document.getElementById('course-main-image').src = course.image;
    }

    // Обработчик создания темы
    document.getElementById('create-theme')?.addEventListener('click', () => {
        if (!course.themes) course.themes = [];

        course.themes.push({
            id: Date.now(),
            title: 'Новая тема',
            description: '',
            assignments: []
        });

        localStorage.setItem('courses', JSON.stringify(courses));
        initCourseContent(); // Перезагружаем контент
    });

    // Отображаем темы
    const container = document.getElementById('themes-container');
    container.innerHTML = '';

    if (course.themes && course.themes.length > 0) {
        course.themes.forEach(theme => {
            const themeElement = document.createElement('div');
            themeElement.className = 'theme-card';
            themeElement.innerHTML = `
                <div class="theme-header">
                    <h3 class="theme-title">${theme.title}</h3>
                    <button class="btn btn-danger delete-theme">Удалить</button>
                </div>
                <div class="form-group">
                    <label>Название темы</label>
                    <input class="form-input theme-name" type="text" value="${theme.title}">
                </div>
                <div class="form-group">
                    <label>Описание темы</label>
                    <textarea class="form-input theme-description" rows="3">${theme.description}</textarea>
                </div>
                <div class="theme-content">
                    <h4>Задания и тесты</h4>
                    <button class="btn btn-secondary add-assignment">Добавить задание/тест</button>
                    <div class="assignments-container"></div>
                </div>
            `;

            // Обработчики для темы
            themeElement.querySelector('.theme-name').addEventListener('change', (e) => {
                theme.title = e.target.value;
                localStorage.setItem('courses', JSON.stringify(courses));
            });

            themeElement.querySelector('.theme-description').addEventListener('change', (e) => {
                theme.description = e.target.value;
                localStorage.setItem('courses', JSON.stringify(courses));
            });

            themeElement.querySelector('.delete-theme').addEventListener('click', () => {
                course.themes = course.themes.filter(t => t.id !== theme.id);
                localStorage.setItem('courses', JSON.stringify(courses));
                initCourseContent();
            });

            // Обработчик добавления задания
            themeElement.querySelector('.add-assignment').addEventListener('click', () => {
                if (!theme.assignments) theme.assignments = [];

                theme.assignments.push({
                    id: Date.now(),
                    title: 'Новое задание',
                    type: 'assignment',
                    description: '',
                    files: []
                });

                localStorage.setItem('courses', JSON.stringify(courses));
                initCourseContent();
            });

            // Отображаем задания
            const assignmentsContainer = themeElement.querySelector('.assignments-container');
            if (theme.assignments && theme.assignments.length > 0) {
                theme.assignments.forEach(assignment => {
                    const assignmentElement = document.createElement('div');
                    assignmentElement.className = 'assignment-item';
                    assignmentElement.innerHTML = `
                        <div class="assignment-header">
                            <div class="assignment-title">${assignment.title}</div>
                            <button class="btn btn-danger delete-assignment">Удалить</button>
                        </div>
                        <div class="form-group">
                            <label>Тип</label>
                            <div class="assignment-type">
                                <button class="type-btn ${assignment.type === 'assignment' ? 'active' : ''}" data-type="assignment">Задание</button>
                                <button class="type-btn ${assignment.type === 'quiz' ? 'active' : ''}" data-type="quiz">Тест</button>
                            </div>
                        </div>
                        <div class="assignment-content">
                            <div class="form-group">
                                <label>Название</label>
                                <input class="form-input assignment-title" type="text" value="${assignment.title}">
                            </div>
                            <div class="form-group">
                                <label>Описание</label>
                                <textarea class="form-input assignment-description" rows="2">${assignment.description || ''}</textarea>
                            </div>
                        </div>
                    `;

                    // Обработчики для задания
                    assignmentElement.querySelector('.assignment-title').addEventListener('change', (e) => {
                        assignment.title = e.target.value;
                        localStorage.setItem('courses', JSON.stringify(courses));
                    });

                    assignmentElement.querySelector('.assignment-description').addEventListener('change', (e) => {
                        assignment.description = e.target.value;
                        localStorage.setItem('courses', JSON.stringify(courses));
                    });

                    assignmentElement.querySelector('.delete-assignment').addEventListener('click', () => {
                        theme.assignments = theme.assignments.filter(a => a.id !== assignment.id);
                        localStorage.setItem('courses', JSON.stringify(courses));
                        initCourseContent();
                    });

                    // Обработчики изменения типа
                    assignmentElement.querySelectorAll('.type-btn').forEach(btn => {
                        btn.addEventListener('click', () => {
                            assignment.type = btn.dataset.type;
                            assignmentElement.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                            btn.classList.add('active');
                            localStorage.setItem('courses', JSON.stringify(courses));
                        });
                    });

                    assignmentsContainer.appendChild(assignmentElement);
                });
            }

            container.appendChild(themeElement);
        });
    }
};

// Обновлённая инициализация страницы тестов и заданий (заменить существующую функцию)
const initQuizzesPage = async () => {
    try {
    const container = document.getElementById('my-quizzes-container');
    const deadlineContainer = document.getElementById('deadline-container');
    const createBtn = document.getElementById('create-quiz-btn');
        const userProfile = await api.getCurrentUserProfile();
        const quizzes = await api.getAllQuizzes();

    // Определяем роль текущего пользователя
        const isTeacher = userProfile.role === 'teacher';
        const isAdmin = userProfile.role === 'admin';

    // Показываем кнопку создания теста/задания для преподавателей и админов
    if (isTeacher || isAdmin) {
        createBtn.style.display = 'block';
        createBtn.addEventListener('click', () => loadContent('quiz_creation'));
    } else {
        createBtn.style.display = 'none';
    }

    // «Созданные мной»
    container.innerHTML = '';
    if (isTeacher || isAdmin) {
            if (!quizzes || quizzes.length === 0) {
                container.innerHTML = '<div class="empty-message">Нет созданных тестов или заданий</div>';
            } else {
                quizzes.forEach(quiz => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <div class="card__body">
                            <h2 class="card__title">${quiz.name}</h2>
                  </div>
              `;
              card.addEventListener('click', () => {
                  localStorage.setItem('currentQuiz', quiz.id);
                  loadContent('quiz_creation');
              });
              container.appendChild(card);
          });
            }
    } else {
        container.innerHTML = '<div class="empty-message">Здесь нет созданных вами тестов или заданий.</div>';
    }

    // «Дедлайны» для студентов
    deadlineContainer.innerHTML = '';
        if (quizzes && quizzes.length > 0) {
            quizzes.forEach(q => {
        const item = document.createElement('div');
                item.className = 'deadline-item deadline-quiz';
        item.innerHTML = `
                    <span>${q.name} : ${new Date(q.end).toLocaleString()}</span>
            <button type="button" class="btn btn-secondary">К тесту/заданию →</button>
        `;
        item.querySelector('button').addEventListener('click', () => {
            localStorage.setItem('currentQuiz', q.id);
            loadContent('student_quiz_start');
        });
        deadlineContainer.appendChild(item);
    });
        }
    } catch (error) {
        console.error('Error loading quizzes:', error);
        document.getElementById('my-quizzes-container').innerHTML =
            '<div class="error">Ошибка загрузки тестов и заданий</div>';
    }
};

// Инициализация страницы успеваемости
const initPerformancePage = () => {
    const tbody = document.getElementById('performance-table-body');
    const userEmail = JSON.parse(localStorage.getItem('userProfile')).email;
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const emails = JSON.parse(localStorage.getItem('emails')) || [];

    // Находим ID пользователя по email
    const user = emails.find(e => e.email === userEmail);
    if (!user) {
        tbody.innerHTML = '<tr><td colspan="2">Вы не зарегистрированы в системе</td></tr>';
        return;
    }

    // Фильтруем курсы, где пользователь является студентом
    const studentCourses = courses.filter(course => {
        if (!course.groups) return false;
        for (const groupId of course.groups) {
            const group = groups.find(g => g.id == groupId);
            if (group && group.emails.includes(user.id)) return true;
        }
        return false;
    });

    if (studentCourses.length === 0) {
        tbody.innerHTML = '<tr><td colspan="2">Вы не является студентом ни в одном из доступных курсов :(</td></tr>';
        return;
    }

    // Отображаем курсы и оценки
    studentCourses.forEach(course => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${course.title}</td>
            <td>${course.grades?.[user.id] || 'Нет оценки'}</td>
        `;
        tbody.appendChild(row);
    });
};

// Инициализация страницы профиля
const initProfilePage = () => {
    const profile = JSON.parse(localStorage.getItem('userProfile')) || {};

    // Заполняем поля профиля
    if (profile.name) document.getElementById('profile-name').value = profile.name;
    if (profile.email) document.getElementById('profile-email').value = profile.email;
};

// Navigation setup (should only be called once after DOM is ready)
const setupNavigation = () => {
    console.log('Setting up navigation...'); // Debug log

    const navLinks = document.querySelectorAll('.sidebar__nav a');
    console.log('Found nav links:', navLinks.length); // Debug log

    navLinks.forEach((link, index) => {
        console.log(`Setting up link ${index}:`, link.dataset.section); // Debug log
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            console.log('Navigation clicked:', section); // Debug log
            loadContent(section);
        });
    });

    // Кнопка "Назад"
    const backLink = document.getElementById('back-link');
    if (backLink) {
        console.log('Setting up back link'); // Debug log
        backLink.addEventListener('click', (e) => {
            e.preventDefault();
            console.log('Back button clicked'); // Debug log
            loadContent('dashboard');
        });
    } else {
        console.log('Back link not found'); // Debug log
    }

    console.log('Navigation setup complete'); // Debug log
};

// Main initialization (only once)
const initializeApp = async () => {
    console.log('initializeApp called, isInitialized:', isInitialized); // Debug log
    if (isInitialized) return;
    isInitialized = true;
    console.log('Starting app initialization...'); // Debug log

    try {
        console.log('Calling initData...'); // Debug log
        await initData();
        console.log('Calling initTheme...'); // Debug log
        initTheme();
        console.log('Calling setupThemeToggle...'); // Debug log
        setupThemeToggle();
        console.log('Calling updateRoleVisibility...'); // Debug log
        updateRoleVisibility();
        console.log('Calling setupNavigation...'); // Debug log
        setupNavigation();
        // Load last section or dashboard
        const currentSection = localStorage.getItem('currentSection') || 'dashboard';
        console.log('Loading current section:', currentSection); // Debug log
        loadContent(currentSection);
        // Logout handler
        const logoutLink = document.getElementById('logout-link');
        if (logoutLink) {
            console.log('Setting up logout handler'); // Debug log
            logoutLink.addEventListener('click', (e) => {
                e.preventDefault();
                if (window.api && typeof window.api.clearToken === 'function') {
                    window.api.clearToken();
                }
                localStorage.clear();
                window.location.href = 'index.html';
            });
        }
        console.log('App initialization complete!'); // Debug log
    } catch (error) {
        console.error('Error during initialization:', error);
        alert('Error during initialization: ' + error.message);
    }
};

// Wait for DOMContentLoaded
console.log('Current document.readyState:', document.readyState); // Debug log
if (document.readyState === 'loading') {
    console.log('DOM is loading, waiting for DOMContentLoaded...'); // Debug log
    document.addEventListener('DOMContentLoaded', () => {
        console.log('DOMContentLoaded fired, calling initializeApp...'); // Debug log
        initializeApp();
    });
} else {
    console.log('DOM is already ready, calling initializeApp immediately...'); // Debug log
    initializeApp();
}

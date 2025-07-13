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
        localStorage.setItem('currentSection', 'dashboard');
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
            case 'course_editing':
                initCourseCreationPage(section);
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
                    <p class="card__progress">Полнота: ${course.completeness || 0}%</p>
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

    // Заполняем список преподавателей из системной группы "teachers"
    const teachersList = document.getElementById('teachers-list');
    teachersList.innerHTML = ''; // очистка на всякий случай
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    const groups = JSON.parse(localStorage.getItem('groups')) || [];

    let teachersGroup = groups.find(g => g.id === 'teachers');
    if (!teachersGroup) {
        teachersGroup = { id: 'teachers', name: 'Преподаватели', emails: [] };
        groups.push(teachersGroup);
        localStorage.setItem('groups', JSON.stringify(groups));
    }

            if (teachersGroup.emails && Array.isArray(teachersGroup.emails)) {
                teachersGroup.emails.forEach(emailId => {
                    const email = emails.find(e => e.id == emailId);
                    if (email) {
                        const div = document.createElement('div');
                        div.className = 'checkbox-item';
                        div.innerHTML = `
                            <input type="checkbox" id="teacher-${email.id}" value="${email.id}">
                            <label for="teacher-${email.id}">${email.email}</label>
                        `;
                        teachersList.appendChild(div);
                    }
                });
            }

    // Заполняем список групп студентов (все кроме системы "teachers")
    const groupsList = document.getElementById('student-groups-list');
    groupsList.innerHTML = '';
    groups
      .filter(g => g.id !== 'teachers')
      .forEach(group => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        div.innerHTML = `
            <input type="checkbox" id="group-${group.id}" value="${group.id}">
            <label for="group-${group.id}">${group.name}</label>
        `;
        groupsList.appendChild(div);
    });

    // Обработчик сохранения курса
    document.getElementById('course-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        console.log('Course form submitted'); // Debug log
        const name = document.getElementById('course-title').value;
        console.log('Course name:', name); // Debug log

        try {
            const courseData = {
                name: name,
                completeness: 0
            };

            console.log('Sending course data:', courseData); // Debug log
            await api.createCourse(courseData);
            console.log('Course created successfully'); // Debug log
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
            const newGroup = await api.createGroup(groupData);

            // Add selected users to the group
            for (const user of selectedUsers) {
                try {
                    await api.addStudentToGroup(newGroup.id, user.email);
                } catch (error) {
                    console.error(`Error adding user ${user.email} to group:`, error);
                    // Continue with other users even if one fails
                }
            }

            alert('Группа создана успешно!');
            loadContent('groups');
        } catch (error) {
            console.error('Error creating group:', error);
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
        return;
    }

    // Get all users for autocomplete
    let allUsers = [];
    try {
        allUsers = await api.getAllUsers();
    } catch (error) {
        console.error('Error fetching users for autocomplete:', error);
    }

    // Create autocomplete dropdown
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        width: 100%;
        z-index: 1000;
        display: none;
    `;

    emailInput.parentNode.style.position = 'relative';
    emailInput.parentNode.appendChild(dropdown);

    // Filter users based on input
    const filterUsers = (input) => {
        const searchTerm = input.toLowerCase();
        const filtered = allUsers.filter(user =>
            (user.email.toLowerCase().includes(searchTerm) ||
             user.name.toLowerCase().includes(searchTerm)) &&
            !selectedUsers.some(selected => selected.id === user.id)
        );

        dropdown.innerHTML = '';

        if (filtered.length === 0) {
            dropdown.style.display = 'none';
            return;
        }

        filtered.forEach(user => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.style.cssText = `
                padding: 10px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
            `;
            item.innerHTML = `
                <div>${user.email}</div>
                <div style="font-size: 12px; color: #666;">${user.name}</div>
            `;

            item.addEventListener('click', () => {
                emailInput.value = user.email;
                dropdown.style.display = 'none';
            });

            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f5f5f5';
            });

            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'white';
            });

            dropdown.appendChild(item);
        });

        dropdown.style.display = 'block';
    };

    // Show dropdown on input focus
    emailInput.addEventListener('focus', () => {
        if (emailInput.value.trim()) {
            filterUsers(emailInput.value);
        }
    });

    // Filter on input
    emailInput.addEventListener('input', (e) => {
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
            alert('Пользователь с таким email не найден');
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
    });

    // Allow Enter key to add user
    emailInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            addButton.click();
        }
    });
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

        // Continue with group details page setup
        console.log('Setting up group details page for group:', group);

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
                        <label for="group-description">Описание:</label>
                        <textarea id="group-description" class="form-input">${group.description || ''}</textarea>
                    </div>

                    <div class="form-group">
                        <label>Участники группы</label>
                        <div class="group-members-section">
                            <div class="add-member-section">
                                <div class="input-group">
                                    <input type="text" id="add-member-email" class="form-input" placeholder="Введите email пользователя">
                                    <button type="button" class="btn btn-secondary" id="add-member-btn">Добавить</button>
                                </div>
                            </div>
                            <div id="group-members-list" class="members-list">
                                <!-- Список участников будет загружен динамически -->
                            </div>
                        </div>
                    </div>

                    <div class="form-actions">
                        <button class="btn btn-secondary" id="cancel-edit-group">Отмена</button>
                        <button class="btn btn-primary" id="save-group">Сохранить</button>
                        <button class="btn btn-danger" id="delete-group">Удалить группу</button>
                    </div>
                </div>
            `;

            // Load current group members
            await loadGroupMembers(group.id);

            // Setup member management functionality
            setupGroupMemberManagement(group.id);

            // Add event listeners
            document.getElementById('cancel-edit-group')?.addEventListener('click', () => {
                loadContent('groups');
            });

            document.getElementById('save-group')?.addEventListener('click', async () => {
                const updatedGroup = {
                    name: document.getElementById('group-name').value,
                    description: document.getElementById('group-description').value
                };

                try {
                    await api.updateGroup(group.id, updatedGroup);
                    alert('Группа обновлена успешно!');
                    loadContent('groups');
                } catch (error) {
                    console.error('Error updating group:', error);
                    alert('Ошибка при обновлении группы');
                }
            });

            document.getElementById('delete-group')?.addEventListener('click', async () => {
                if (confirm('Вы уверены, что хотите удалить эту группу?')) {
                    try {
                        await api.deleteGroup(group.id);
                        alert('Группа удалена успешно!');
                        loadContent('groups');
                    } catch (error) {
                        console.error('Error deleting group:', error);
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

    if (!emailInput || !addButton) {
        console.error('Email input or add button not found');
        return;
    }

    console.log('Setting up group member management for group:', groupId);

    // Get all users for suggestions
    let allUsers = [];
    try {
        allUsers = await api.getAllUsers();
        console.log('Fetched all users:', allUsers.length);
    } catch (error) {
        console.error('Error fetching users:', error);
    }

    // Get current group members to avoid duplicates
    let currentMembers = [];
    try {
        currentMembers = await api.getGroupMembers(groupId);
        console.log('Current group members:', currentMembers);
    } catch (error) {
        console.error('Error fetching current members:', error);
    }

    const currentMemberEmails = currentMembers.map(m => m.email);

    // Create autocomplete dropdown dynamically (like in group creation)
    const dropdown = document.createElement('div');
    dropdown.className = 'autocomplete-dropdown';
    dropdown.style.cssText = `
        position: absolute;
        background: white;
        border: 1px solid #ddd;
        border-top: none;
        max-height: 200px;
        overflow-y: auto;
        width: 100%;
        z-index: 1000;
        display: none;
    `;

    emailInput.parentNode.style.position = 'relative';
    emailInput.parentNode.appendChild(dropdown);

    // Filter users based on input
    const filterUsers = (input) => {
        console.log('Filtering users for input:', input);
        const searchTerm = input.toLowerCase();
        const filtered = allUsers.filter(user =>
            (user.email.toLowerCase().includes(searchTerm) ||
             (user.name && user.name.toLowerCase().includes(searchTerm))) &&
            !currentMemberEmails.includes(user.email)
        );

        console.log('Filtered users:', filtered.length);

        dropdown.innerHTML = '';

        if (filtered.length === 0 || !input.trim()) {
            dropdown.style.display = 'none';
            return;
        }

        filtered.forEach(user => {
            const item = document.createElement('div');
            item.className = 'autocomplete-item';
            item.style.cssText = `
                padding: 10px;
                cursor: pointer;
                border-bottom: 1px solid #eee;
            `;
            item.innerHTML = `
                <div>${user.email}</div>
                <div style="font-size: 12px; color: #666;">${user.name || 'Без имени'}</div>
            `;

            item.addEventListener('click', () => {
                console.log('Suggestion clicked:', user.email);
                emailInput.value = user.email;
                dropdown.style.display = 'none';
            });

            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = '#f5f5f5';
            });

            item.addEventListener('mouseleave', () => {
                item.style.backgroundColor = 'white';
            });

            dropdown.appendChild(item);
        });

        dropdown.style.display = 'block';
        console.log('Dropdown shown with', filtered.length, 'items');
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

    // Add member button
    addButton.addEventListener('click', async () => {
        const email = emailInput.value.trim();
        if (!email) {
            alert('Пожалуйста, введите email');
            return;
        }

        try {
            await api.addStudentToGroup(groupId, email);
            emailInput.value = '';
            dropdown.style.display = 'none';
            await loadGroupMembers(groupId);
            alert('Пользователь добавлен в группу');
        } catch (error) {
            console.error('Error adding member to group:', error);
            alert('Ошибка при добавлении пользователя в группу');
        }
    });

    // Remove member functionality
    document.addEventListener('click', async (e) => {
        if (e.target.classList.contains('remove-member')) {
            const email = e.target.dataset.email;
            if (confirm(`Удалить пользователя ${email} из группы?`)) {
                try {
                    await api.removeStudentFromGroup(groupId, email);
                    await loadGroupMembers(groupId);
                    alert('Пользователь удален из группы');
                } catch (error) {
                    console.error('Error removing member from group:', error);
                    alert('Ошибка при удалении пользователя из группы');
                }
            }
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
                    <p class="card__progress">Полнота: ${course.completeness || 0}%</p>
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
                            <p class="card__progress">Тест/Задание</p>
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

    document.querySelectorAll('.role-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const newRole = btn.dataset.role;
            localStorage.setItem('role', newRole);
            updateRoleVisibility();  // ← обновляем
            loadContent('dashboard');
        });
    });

    // Сохранение изменений профиля
    document.getElementById('profile-name').addEventListener('change', e => {
        profile.name = e.target.value;
        localStorage.setItem('userProfile', JSON.stringify(profile));
    });

    document.getElementById('profile-email').addEventListener('change', e => {
        profile.email = e.target.value;
        localStorage.setItem('userProfile', JSON.stringify(profile));
    });
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

// Инициализация данных
const initData = () => { // +
    if (!localStorage.getItem('role')) { // +
        localStorage.setItem('role', 'admin'); // +
    } // +
    
    if (!localStorage.getItem('emails')) { // +
        const emails = [ // +
            { id: 1, email: 'student1@innopolis.ru', role: 'student' }, // +
            { id: 2, email: 'student2@innopolis.ru', role: 'student' }, // +
            { id: 3, email: 'teacher1@innopolis.ru', role: 'teacher' }, // +
            { id: 4, email: 'teacher2@innopolis.ru', role: 'teacher' } // +
        ]; // +
        localStorage.setItem('emails', JSON.stringify(emails)); // +
    } // +
    
    // Гарантируем создание группы преподавателей // -
    let groups = JSON.parse(localStorage.getItem('groups')) || []; // -
    if (!groups.some(g => g.id === 'teachers')) { // -
        groups.push({ // -
            id: 'teachers', // -
            name: 'Преподаватели', // -
            emails: [3, 4] // Добавляем существующих преподавателей // -
        }); // -
        localStorage.setItem('groups', JSON.stringify(groups)); // -
    } // -
    
    if (!localStorage.getItem('courses')) { // +
        localStorage.setItem('courses', JSON.stringify([])); // +
    } // +
    
    if (!localStorage.getItem('quizzes')) { // +
        localStorage.setItem('quizzes', JSON.stringify([])); // +
    } // +
    
    if (!localStorage.getItem('userCourses')) { // +
        localStorage.setItem('userCourses', JSON.stringify([])); // +
    } // +
    
    if (!localStorage.getItem('currentSection')) { // +
        localStorage.setItem('currentSection', 'dashboard'); // +
    } // +
    
    if (!localStorage.getItem('userProfile')) { // +
        localStorage.setItem('userProfile', JSON.stringify({ // +
            name: 'Иван Иванов', // +
            email: 'i.ivanov@innopolis.ru' // +
        })); // +
    } // +
}; // +
// Получение текущей роли // +
const getCurrentRole = () => { // +
    return localStorage.getItem('role') || 'admin'; // +
}; // +



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
    document.getElementById('themeToggle').addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        initTheme();
    });
};

// Обновление сайдбара
const updateSidebar = (section) => {
    const isDashboard = section === 'dashboard';
    document.getElementById('menu-header').style.display = isDashboard ? 'block' : 'none';
    document.getElementById('back-link').style.display = isDashboard ? 'none' : 'block';
    
    document.querySelectorAll('.sidebar__nav a').forEach(a => {
        a.classList.remove('active');
        if (a.dataset.section === section) {
            a.classList.add('active');
        }
    });
};

// Рендеринг страницы
const renderPage = (templateId) => {
    const template = document.getElementById(templateId);
    if (template) {
        document.getElementById('main-content').innerHTML = '';
        document.getElementById('main-content').appendChild(template.content.cloneNode(true));
    }
};

// Загрузка контента для раздела
const loadContent = (section) => {
    try {
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
            case 'student_quiz_start':
                templateId = 'student_quiz_start-template';
                break;
            case 'student_quiz_view':
                templateId = 'student_quiz_view-template';
                break;
            default:
                templateId = 'dashboard-template';
        }
        
        renderPage(templateId);
        updateSidebar(section);
        localStorage.setItem('currentSection', section);
        initPageSpecificLogic(section);
        
    } catch (error) {
        document.getElementById('main-content').innerHTML = `
            <div class="error">
                <h2>Ошибка загрузки</h2>
                <p>${error.message}</p>
            </div>
        `;
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

// Инициализация страницы курсов (админ)
const initCoursesPage = () => {
    document.getElementById('create-course-btn')?.addEventListener('click', () => {
        loadContent('course_creation');
    });
    
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__body">
                <h2 class="card__title">${course.title}</h2>
                <p class="card__progress">${course.teachers?.length || 0} преподавателей, ${course.groups?.length || 0} групп</p>
            </div>
        `;
        card.addEventListener('click', () => {
            localStorage.setItem('currentCourse', course.id);
            loadContent('course_editing');
        });
        container.appendChild(card);
    });
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

    // Обработчик сохранения курса перенесён сюда, но если он уже есть ниже, ничего не меняйте
    document.getElementById('course-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('course-title').value;
        const courses = JSON.parse(localStorage.getItem('courses')) || [];

        // Выбранные преподаватели
        const teachers = Array.from(
            document.querySelectorAll('#teachers-list input:checked'),
            input => parseInt(input.value)
        );

        // Выбранные группы студентов
        const selGroups = Array.from(
            document.querySelectorAll('#student-groups-list input:checked'),
            input => input.value
        );

        courses.push({
            id: Date.now(),
            title,
            teachers,
            groups: selGroups
        });
        localStorage.setItem('courses', JSON.stringify(courses));
        loadContent('courses');
    });
};

// Инициализация страницы групп
const initGroupsPage = () => {
    document.getElementById('create-group-btn')?.addEventListener('click', () => {
        loadContent('group_creation');
    });

    const groupsContainer = document.getElementById('groups-container');
    groupsContainer.innerHTML = '';

    // Получаем группы из localStorage
    let groups = JSON.parse(localStorage.getItem('groups')) || [];
    
    // Проверяем, существует ли группа преподавателей
    let teachersGroup = groups.find(g => g.id === 'teachers');
    
    // Если группа преподавателей не найдена, создаем ее
    if (!teachersGroup) {
        teachersGroup = {
            id: 'teachers',
            name: 'Преподаватели',
            emails: []
        };
        groups.push(teachersGroup);
        localStorage.setItem('groups', JSON.stringify(groups));
    }

    // Добавляем группу преподавателей в интерфейс
    const teachersCard = document.createElement('div');
    teachersCard.className = 'group-card';
    teachersCard.innerHTML = `
        <div class="group-header">
            <div class="group-title">Преподаватели</div>
            <button class="btn btn-primary edit-group" data-id="teachers">Редактировать</button>
        </div>
        <div class="group-emails" id="teachers-emails"></div>
    `;
    groupsContainer.appendChild(teachersCard);

    // Заполняем список преподавателей
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    const teachersEmails = teachersCard.querySelector('.group-emails');
    
    teachersGroup.emails.forEach(emailId => {
        const email = emails.find(e => e.id == emailId);
        if (email) {
            const div = document.createElement('div');
            div.className = 'group-email-item';
            div.textContent = email.email;
            teachersEmails.appendChild(div);
        }
    });

    // Обработчик для группы преподавателей
    teachersCard.querySelector('.edit-group').addEventListener('click', () => {
        localStorage.setItem('currentGroup', 'teachers');
        loadContent('group_details');
    });

    // Заполняем список остальных групп
    groups.filter(g => g.id !== 'teachers').forEach(group => {
        const groupCard = document.createElement('div');
        groupCard.className = 'group-card';
        
        // Получаем список email для группы
        const groupEmails = group.emails.map(emailId => {
            const email = emails.find(e => e.id == emailId);
            return email ? email.email : '';
        }).filter(email => email);
        
        groupCard.innerHTML = `
            <div class="group-header">
                <div class="group-title">${group.name}</div>
                <button class="btn btn-primary edit-group" data-id="${group.id}">Редактировать</button>
            </div>
            <div class="group-emails">
                ${groupEmails.map(email => `
                    <div class="group-email-item">
                        <div>${email}</div>
                    </div>
                `).join('')}
            </div>
        `;
        
        groupCard.querySelector('.edit-group').addEventListener('click', () => {
            const groupId = groupCard.querySelector('.edit-group').dataset.id;
            localStorage.setItem('currentGroup', groupId);
            loadContent('group_details');
        });
        
        groupsContainer.appendChild(groupCard);
    });
};

// Инициализация страницы создания группы
const initGroupCreationPage = () => {
    // Заполняем список почт
    const emailsList = document.getElementById('group-emails-list');
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    
    emails.forEach(email => {
        const div = document.createElement('div');
        div.className = 'checkbox-item';
        div.innerHTML = `
            <input type="checkbox" id="group-email-${email.id}" value="${email.id}">
            <label for="group-email-${email.id}">${email.email}</label>
        `;
        emailsList.appendChild(div);
    });
    
    // Поиск почт
    document.getElementById('email-search')?.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        emailsList.querySelectorAll('.checkbox-item').forEach(item => {
            const label = item.querySelector('label').textContent.toLowerCase();
            item.style.display = label.includes(searchTerm) ? 'block' : 'none';
        });
    });
    
    // Отмена
    document.getElementById('cancel-group')?.addEventListener('click', () => {
        loadContent('groups');
    });
    
    // Сохранение группы
    document.getElementById('group-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('group-name').value;
        const groups = JSON.parse(localStorage.getItem('groups')) || [];
        
        // Собираем выбранные почты
        const emails = [];
        document.querySelectorAll('#group-emails-list input:checked').forEach(input => {
            emails.push(parseInt(input.value));
        });
        
        // Сохраняем новую группу
        groups.push({
            id: Date.now().toString(),
            name,
            emails
        });
        
        localStorage.setItem('groups', JSON.stringify(groups));
        loadContent('groups');
    });
};

// Инициализация страницы деталей группы
const initGroupDetailsPage = () => {
    const groupId = localStorage.getItem('currentGroup');
  const groups = JSON.parse(localStorage.getItem('groups')) || [];
  const group = groups.find(g => g.id == groupId);

if (!group) {
    loadContent('groups');
    return;
}

// Устанавливаем название группы
document.getElementById('group-title').textContent = `Группа: ${group.name}`;

// Заполняем список почт группы
const emailsContainer = document.getElementById('group-emails-container');
emailsContainer.innerHTML = '';

const allEmails = JSON.parse(localStorage.getItem('emails')) || [];
    group.emails.forEach(emailId => {
        const email = allEmails.find(e => e.id == emailId);
        if (email) {
            const div = document.createElement('div');
            div.className = 'list-item';
            div.innerHTML = `
                <div>${email.email}</div>
                <div class="list-item-actions">
                    <button class="btn btn-danger remove-email" data-id="${email.id}">Удалить</button>
                </div>
            `;
            emailsContainer.appendChild(div);
        }
    });

// Обработчик добавления почты
document.getElementById('add-email-btn')?.addEventListener('click', () => {
        const email = document.getElementById('add-email').value.trim();
        if (!email) return;

        // Для группы преподавателей: проверка роли
        if (groupId === 'teachers') {
            const emails = JSON.parse(localStorage.getItem('emails')) || [];
            const emailObj = emails.find(e => e.email === email);
            
            if (!emailObj || emailObj.role !== 'teacher') {
                alert('Этот email не является преподавателем. Сначала измените его роль в базе данных.');
                return;
            }
        }

    if (!emailExists) {
        // Добавляем новую почту
        const newEmail = {
            id: Date.now(),
            email,
            role: 'student'
        };
        emails.push(newEmail);
        localStorage.setItem('emails', JSON.stringify(emails));

        // Добавляем почту в группу
        group.emails.push(newEmail.id);
        localStorage.setItem('groups', JSON.stringify(groups));
        
        // Обновляем список
        initGroupDetailsPage();
    } else {
        alert('Этот email уже существует в базе');
    }
});

// Обработчики удаления почты
document.querySelectorAll('.remove-email').forEach(btn => {
    btn.addEventListener('click', () => {
        const emailId = btn.dataset.id;
        group.emails = group.emails.filter(id => id != emailId);
        localStorage.setItem('groups', JSON.stringify(groups));
        initGroupDetailsPage();
    });
});

// Обработчик удаления группы (не для преподавателей)
if (groupId !== 'teachers') {
        document.getElementById('delete-group')?.addEventListener('click', () => {
            const updatedGroups = groups.filter(g => g.id != groupId);
            localStorage.setItem('groups', JSON.stringify(updatedGroups));
            loadContent('groups');
        });
    } else {
        document.getElementById('delete-group').style.display = 'none';
    }
};

// Инициализация страницы базы данных
const initDatabasePage = () => {
    // Обработчик добавления почты
    document.getElementById('add-email-db')?.addEventListener('click', () => {
        loadContent('email_add');
    });

    // Заполняем список почт
    const dbContainer = document.getElementById('database-container');
    const emails = JSON.parse(localStorage.getItem('emails')) || [];
    dbContainer.innerHTML = '';

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
        btn.addEventListener('click', () => {
            const emailId = btn.dataset.id;
            const emails = JSON.parse(localStorage.getItem('emails')) || [];
            const updatedEmails = emails.filter(e => e.id != emailId);
            localStorage.setItem('emails', JSON.stringify(updatedEmails));
            
            // Удаляем email из всех групп
            const groups = JSON.parse(localStorage.getItem('groups')) || [];
            groups.forEach(group => {
                group.emails = group.emails.filter(id => id != emailId);
            });
            localStorage.setItem('groups', JSON.stringify(groups));
            
            initDatabasePage();
        });
    });
};

// Инициализация страницы добавления почты
const initEmailAddPage = () => {
    // Отмена добавления
    document.getElementById('cancel-email')?.addEventListener('click', () => {
        loadContent('database');
    });

    // Сохранение почты
    document.getElementById('email-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email-address').value;
        const role = document.getElementById('email-role').value;

        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        emails.push({
            id: Date.now(),
            email,
            role
        });

        localStorage.setItem('emails', JSON.stringify(emails));
        
        // Если это преподаватель, добавляем в группу преподавателей
        if (role === 'teacher') {
            const groups = JSON.parse(localStorage.getItem('groups')) || [];
            const teachersGroup = groups.find(g => g.id === 'teachers');
            if (teachersGroup) {
                teachersGroup.emails.push(emails[emails.length - 1].id);
                localStorage.setItem('groups', JSON.stringify(groups));
            }
        }
        
        loadContent('database');
    });
};

const initUserCoursesPage = () => {
    const container = document.getElementById('user-courses-container');
    const userEmail = JSON.parse(localStorage.getItem('userProfile')).email;
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    const emails = JSON.parse(localStorage.getItem('emails')) || [];

    // Находим ID пользователя по email
    const user = emails.find(e => e.email === userEmail);
    if (!user) {
        container.innerHTML = '<div class="empty-message">Курсы вам пока не доступны :(</div>';
        return;
    }

    // Фильтруем курсы, где пользователь является участником
    const userCourses = courses.filter(course => {
        // Проверяем преподавателей
        if (course.teachers?.includes(user.id)) return true;
        
        // Проверяем группы студентов
        if (course.groups) {
            for (const groupId of course.groups) {
                const group = groups.find(g => g.id == groupId);
                if (group && group.emails.includes(user.id)) return true;
            }
        }
        return false;
    });

    if (userCourses.length === 0) {
        container.innerHTML = '<div class="empty-message">Курсы вам пока не доступны :(</div>';
        return;
    }

    // Отображаем курсы пользователя
    userCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="card__body">
                <h2 class="card__title">${course.title}</h2>
                <p class="card__progress">Ваша роль: ${course.teachers?.includes(user.id) ? 'Преподаватель' : 'Студент'}</p>
            </div>
        `;
        card.addEventListener('click', () => {
            localStorage.setItem('currentCourse', course.id);
            loadContent('course_detail');
        });
        container.appendChild(card);
    });
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
const initQuizzesPage = () => {
    const container = document.getElementById('my-quizzes-container');
    const deadlineContainer = document.getElementById('deadline-container');
    const createBtn = document.getElementById('create-quiz-btn');
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const userProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    const emails = JSON.parse(localStorage.getItem('emails')) || [];

    // Определяем роль текущего пользователя
    const user = emails.find(e => e.email === userProfile.email);
    const isTeacher = user && user.role === 'teacher';
    const isAdmin   = user && user.role === 'admin';

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
        quizzes
          .filter(q => q.creatorId === user.id)
          .forEach(quiz => {
              const card = document.createElement('div');
              card.className = 'card';
              card.innerHTML = `
                  <div class="card__body">
                      <h2 class="card__title">${quiz.title}</h2>
                      <p class="card__progress">${quiz.type === 'test' ? 'Тест' : 'Задание'}</p>
                  </div>
              `;
              card.addEventListener('click', () => {
                  localStorage.setItem('currentQuiz', quiz.id);
                  loadContent('quiz_creation');
              });
              container.appendChild(card);
          });
    } else {
        container.innerHTML = '<div class="empty-message">Здесь нет созданных вами тестов или заданий.</div>';
    }

    // «Дедлайны» для студентов
    deadlineContainer.innerHTML = '';
    const studentQuizzes = quizzes
      .filter(q => q.participants?.includes(user.id))
      .sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

    studentQuizzes.forEach(q => {
        const item = document.createElement('div');
        item.className = 'deadline-item ' + (q.type === 'assignment' ? 'deadline-assignment' : 'deadline-quiz');
        item.innerHTML = `
            <span>${q.courseTitle} / ${q.title} : ${new Date(q.deadline).toLocaleString()}</span>
            <button type="button" class="btn btn-secondary">К тесту/заданию →</button>
        `;
        item.querySelector('button').addEventListener('click', () => {
            localStorage.setItem('currentQuiz', q.id);
            loadContent('student_quiz_start');
        });
        deadlineContainer.appendChild(item);
    });
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

// Навигация по разделам
const setupNavigation = () => {
    document.querySelectorAll('.sidebar__nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const section = link.dataset.section;
            loadContent(section);
        });
    });

    // Кнопка "Назад"
    document.getElementById('back-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('dashboard');
    });
};

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
    initData();
    initTheme();
    setupThemeToggle();
    updateRoleVisibility();
    setupNavigation();

    // Загружаем последний открытый раздел
    const currentSection = localStorage.getItem('currentSection') || 'dashboard';
    loadContent(currentSection);

    // Обработчик выхода
    document.getElementById('logout-link')?.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'login.html';
    });
});

const initQuizCreationPage = () => {
    const modal = document.querySelector('.modal');
    const closeBtn = modal.querySelector('.modal-close');
    
    // Закрытие модального окна
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        loadContent('quizzes');
    });
    
    // Заполнение выбора курсов
    const courseSelect = document.getElementById('quiz-course');
    const courses = JSON.parse(localStorage.getItem('courses')) || [];
    
    courses.forEach(course => {
        const option = document.createElement('option');
        option.value = course.id;
        option.textContent = course.title;
        courseSelect.appendChild(option);
    });
    
    // Обработчик изменения типа задания/теста
    const quizTypeSelect = document.getElementById('quiz-type');
    const quizContent = document.getElementById('quiz-content');
    
    quizTypeSelect.addEventListener('change', () => {
        quizContent.innerHTML = '';
        
        if (quizTypeSelect.value === 'test') {
            const testTemplate = document.getElementById('test-content-template');
            quizContent.appendChild(testTemplate.content.cloneNode(true));
            initTestContent();
        } else {
            const assignmentTemplate = document.getElementById('assignment-content-template');
            quizContent.appendChild(assignmentTemplate.content.cloneNode(true));
            initAssignmentContent();
        }
    });
    
    // Инициализация контента по умолчанию
    quizTypeSelect.dispatchEvent(new Event('change'));
    
    // Обработчик добавления вопроса
    document.getElementById('add-question')?.addEventListener('click', () => {
        addQuestion();
    });
    
    // Обработчик отправки формы
    const quizForm = document.getElementById('quiz-form');
    quizForm.addEventListener('submit', (e) => {
        e.preventDefault();
        saveQuiz();
    });
    
    // Обработчик отмены
    document.getElementById('cancel-quiz')?.addEventListener('click', () => {
        modal.style.display = 'none';
        loadContent('quizzes');
    });
    
    // Загрузка существующего теста/задания для редактирования
    const quizId = localStorage.getItem('currentQuiz');
    if (quizId) {
        const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
        const quiz = quizzes.find(q => q.id == quizId);
        
        if (quiz) {
            // Заполняем форму данными
            document.getElementById('quiz-title').value = quiz.title;
            document.getElementById('quiz-description').value = quiz.description || '';
            document.getElementById('quiz-type').value = quiz.type;
            document.getElementById('quiz-start').value = quiz.start;
            document.getElementById('quiz-end').value = quiz.end;
            document.getElementById('quiz-course').value = quiz.courseId;
            
            // Обновляем контент в соответствии с типом
            quizTypeSelect.dispatchEvent(new Event('change'));
            
            // Заполняем контент
            if (quiz.type === 'test' && quiz.questions) {
                quiz.questions.forEach(q => {
                    const question = addQuestion();
                    question.querySelector('.question-text').value = q.text;
                    
                    // Заполняем варианты ответов
                    const optionsList = question.querySelector('.options-list');
                    q.options.forEach((opt, i) => {
                        const option = addOption(optionsList);
                        option.querySelector('.option-text').value = opt.text;
                        
                        if (q.type === 'choice') {
                            option.querySelector('.option-correct').checked = opt.correct;
                        }
                    });
                    
                    // Устанавливаем тип вопроса
                    question.querySelector('.question-type').value = q.type;
                });
            } else if (quiz.files) {
                const fileList = document.getElementById('file-list');
                quiz.files.forEach(file => {
                    addFileItem(fileList, file.name);
                });
            }
        }
    }
    
    // Автосохранение каждые 30 секунд
    setInterval(saveDraft, 30000);
};

// Добавление нового вопроса
const addQuestion = () => {
    const questionsContainer = document.getElementById('questions-container');
    const questionTemplate = document.getElementById('question-template');
    const questionElement = questionTemplate.content.cloneNode(true);
    
    // Обработчик изменения типа вопроса
    const questionType = questionElement.querySelector('.question-type');
    questionType.addEventListener('change', () => {
        const optionsContainer = questionElement.querySelector('.question-options');
        optionsContainer.style.display = questionType.value === 'choice' ? 'block' : 'none';
    });
    
    // Обработчик добавления варианта ответа
    const addOptionBtn = questionElement.querySelector('.add-option');
    addOptionBtn.addEventListener('click', () => {
        const optionsList = questionElement.querySelector('.options-list');
        addOption(optionsList);
    });
    
    // Обработчик удаления вопроса
    const deleteBtn = questionElement.querySelector('.delete-question');
    deleteBtn.addEventListener('click', () => {
        questionsContainer.removeChild(questionElement);
    });
    
    questionsContainer.appendChild(questionElement);
    return questionElement;
};

// Добавление варианта ответа
const addOption = (container) => {
    const optionTemplate = document.createElement('div');
    optionTemplate.className = 'option';
    optionTemplate.innerHTML = `
        <input type="${container.closest('.question-editor') ? 'checkbox' : 'radio'}" 
               class="option-correct" name="correct-option">
        <input type="text" class="option-text form-input" placeholder="Вариант ответа">
        <button type="button" class="btn btn-danger delete-option">×</button>
    `;
    
    // Обработчик удаления варианта
    optionTemplate.querySelector('.delete-option').addEventListener('click', () => {
        container.removeChild(optionTemplate);
    });
    
    container.appendChild(optionTemplate);
    return optionTemplate;
};

// Инициализация контента для теста
const initTestContent = () => {
    // Добавляем первый вопрос
    document.getElementById('add-question')?.click();
};

// Инициализация контента для задания
const initAssignmentContent = () => {
    const fileUpload = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('assignment-files');
    const fileList = document.getElementById('file-list');
    
    // Обработчик клика по области загрузки
    fileUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Обработчик изменения файлов
    fileInput.addEventListener('change', () => {
        for (const file of fileInput.files) {
            addFileItem(fileList, file.name);
        }
    });
    
    // Обработчик перетаскивания файлов
    fileUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        fileUpload.classList.add('dragover');
    });
    
    fileUpload.addEventListener('dragleave', () => {
        fileUpload.classList.remove('dragover');
    });
    
    fileUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        fileUpload.classList.remove('dragover');
        
        for (const file of e.dataTransfer.files) {
            addFileItem(fileList, file.name);
        }
    });
};

// Добавление элемента файла
const addFileItem = (container, fileName) => {
    const fileItem = document.createElement('div');
    fileItem.className = 'file-item';
    fileItem.innerHTML = `
        <div>${fileName}</div>
        <button class="btn btn-danger delete-file">×</button>
    `;
    
    // Обработчик удаления файла
    fileItem.querySelector('.delete-file').addEventListener('click', () => {
        container.removeChild(fileItem);
    });
    
    container.appendChild(fileItem);
};

// Сохранение черновика
const saveDraft = () => {
    const quizData = getQuizFormData();
    localStorage.setItem('draftQuiz', JSON.stringify(quizData));
};

// Получение данных формы
const getQuizFormData = () => {
    const questions = [];
    document.querySelectorAll('.question-editor').forEach(question => {
        const text = question.querySelector('.question-text').value;
        const type = question.querySelector('.question-type').value;
        const options = [];
        
        if (type === 'choice') {
            question.querySelectorAll('.option').forEach(option => {
                const text = option.querySelector('.option-text').value;
                const correct = option.querySelector('.option-correct').checked;
                options.push({ text, correct });
            });
        }
        
        questions.push({ text, type, options });
    });
    
    const files = [];
    document.querySelectorAll('#file-list .file-item').forEach(file => {
        files.push(file.querySelector('div').textContent);
    });
    
    return {
        title: document.getElementById('quiz-title').value,
        description: document.getElementById('quiz-description').value,
        type: document.getElementById('quiz-type').value,
        courseId: document.getElementById('quiz-course').value,
        start: document.getElementById('quiz-start').value,
        end: document.getElementById('quiz-end').value,
        questions,
        files
    };
};

// Сохранение теста/задания
const saveQuiz = () => {
    const quizData = getQuizFormData();
    const quizzes = JSON.parse(localStorage.getItem('quizzes')) || [];
    const quizId = localStorage.getItem('currentQuiz');
    
    if (quizId) {
        // Редактирование существующего
        const index = quizzes.findIndex(q => q.id == quizId);
        if (index !== -1) {
            quizzes[index] = { ...quizzes[index], ...quizData };
        }
    } else {
        // Создание нового
        const userEmail = JSON.parse(localStorage.getItem('userProfile')).email;
        const emails = JSON.parse(localStorage.getItem('emails')) || [];
        const user = emails.find(e => e.email === userEmail);
        
        quizzes.push({
            id: Date.now(),
            ...quizData,
            creatorId: user.id
        });
    }
    
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
    localStorage.removeItem('draftQuiz');
    
    // Закрываем модальное окно
    document.querySelector('.modal').style.display = 'none';
    loadContent('quizzes');
};

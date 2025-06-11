// Переключение между разделами, переключение языка и темы
const translations = {
  ru: {
    title: 'Teacher Dashboard',
    nav: {
      dashboard: 'Overview',
      courses: 'Courses',
      createCourse: 'Create Course',
      quizzes: 'Quizzes',
      performance: 'Performance',
      profile: 'Profile',
      logout: 'Logout'
    },
    overview: 'Overview',
    welcome: 'Welcome!',
    welcomeDesc: 'Here you can see quick stats about your courses.',
    stats: {
      courses: 'Courses',
      students: 'Total Students',
      quizzes: 'Quizzes'
    },
    myCourses: 'My Courses',
    createNewCourse: 'Create New Course',
    courseTitleLabel: 'Course Title',
    courseTitlePlaceholder: 'Enter course title',
    courseDescriptionLabel: 'Description',
    courseDescriptionPlaceholder: 'Short description',
    createCourseBtn: 'Create Course',
    quizzesSection: 'Quizzes',
    createQuizBtn: 'Create New Quiz',
    performanceSection: 'Student Performance',
    selectCourseForPerf: 'Select a course to view details.',
    selectCourseOption: '-- Select Course --',
    profileSection: 'Profile',
    displayNameLabel: 'Display Name',
    emailLabel: 'Email',
    saveBtn: 'Save',
    notifications: 'Notifications',
    switchLanguage: 'Switch Language',
    switchTheme: 'Switch Theme'
  },
  en: {
    title: 'Панель преподавателя',
    nav: {
      dashboard: 'Обзор',
      courses: 'Курсы',
      createCourse: 'Создать курс',
      quizzes: 'Квизы',
      performance: 'Успеваемость',
      profile: 'Профиль',
      logout: 'Выйти'
    },
    overview: 'Обзор',
    welcome: 'Добро пожаловать!',
    welcomeDesc: 'Здесь вы можете увидеть быструю статистику по вашим курсам.',
    stats: {
      courses: 'Курсов',
      students: 'Студентов всего',
      quizzes: 'Квизов'
    },
    myCourses: 'Мои курсы',
    createNewCourse: 'Создать новый курс',
    courseTitleLabel: 'Название курса',
    courseTitlePlaceholder: 'Введите название',
    courseDescriptionLabel: 'Описание',
    courseDescriptionPlaceholder: 'Краткое описание',
    createCourseBtn: 'Создать курс',
    quizzesSection: 'Квизы',
    createQuizBtn: 'Создать новый квиз',
    performanceSection: 'Успеваемость студентов',
    selectCourseForPerf: 'Выберите курс, чтобы увидеть детали.',
    selectCourseOption: '-- Выберите курс --',
    profileSection: 'Профиль',
    displayNameLabel: 'Имя для отображения',
    emailLabel: 'Email',
    saveBtn: 'Сохранить',
    notifications: 'Уведомления',
    switchLanguage: 'Сменить язык',
    switchTheme: 'Сменить тему'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // Элементы переключения
  const langToggle = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');

  // Загрузка сохранённых настроек или по умолчанию
  let language = localStorage.getItem('language') || 'en';
  let theme = localStorage.getItem('theme') || 'light';

  // Применяем язык и тему
  applyLanguage(language);
  applyTheme(theme);

  // Обработчики переключателей
  langToggle.addEventListener('click', () => {
    language = (language === 'en') ? 'ru' : 'en';
    localStorage.setItem('language', language);
    applyLanguage(language);
  });

  themeToggle.addEventListener('click', () => {
    theme = (theme === 'light') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  });

  // Переключение между разделами
  const navLinks = document.querySelectorAll('.sidebar__nav a[data-section]');
  const sections = document.querySelectorAll('.section');
  const pageTitle = document.getElementById('page-title');

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('data-section');
      // Убираем active у ссылок
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      // Показываем нужную секцию
      sections.forEach(sec => {
        if (sec.id === target) sec.classList.add('active');
        else sec.classList.remove('active');
      });
      // Меняем заголовок
      const key = link.getAttribute('data-i18n');
      pageTitle.textContent = translations[language].nav[key];
    });
  });

  // Здесь можно прописать загрузку данных через fetch к вашему API
  function loadDashboardStats() {
    // TODO: fetch('/api/teacher/stats')...
    // Заглушки:
    document.getElementById('stat-courses-count').textContent = '3';
    document.getElementById('stat-students-count').textContent = '120';
    document.getElementById('stat-quizzes-count').textContent = '15';
  }

  function loadCourses() {
    const container = document.getElementById('courses-list');
    container.innerHTML = '';
    // TODO: fetch ваших курсов
    const courses = [
      { id: 1, title: 'Программирование на Python', description: 'Введение в Python' },
      { id: 2, title: 'Алгоритмы и структуры данных', description: 'Основы алгоритмов' },
      { id: 3, title: 'Базы данных', description: 'SQL и NoSQL' }
    ];
    courses.forEach(course => {
      const card = document.createElement('div');
      card.className = 'course-card';
      // При необходимости перевести статический текст
      const title = course.title; // Предполагается, что backend возвращает в нужном языке или на одном языке
      const description = course.description;
      const btnOpen = translations[language].nav.courses === 'Courses' ? 'Open' : (language === 'ru' ? 'Открыть' : 'Open');
      const btnEdit = translations[language].nav.courses === 'Courses' ? 'Edit' : (language === 'ru' ? 'Редактировать' : 'Edit');
      card.innerHTML = `
        <h3>${title}</h3>
        <p>${description}</p>
        <div class="btn-group">
          <button data-action="view" data-id="${course.id}">${language === 'ru' ? 'Открыть' : 'Open'}</button>
          <button data-action="edit" data-id="${course.id}">${language === 'ru' ? 'Редактировать' : 'Edit'}</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function loadQuizzes() {
    const container = document.getElementById('quizzes-list');
    container.innerHTML = '';
    // TODO: fetch ваших квизов
    const quizzes = [
      { id: 1, title: 'Quiz 1' },
      { id: 2, title: 'Quiz 2' }
    ];
    quizzes.forEach(q => {
      const card = document.createElement('div');
      card.className = 'quiz-card';
      card.innerHTML = `
        <h3>${q.title}</h3>
        <div class="btn-group">
          <button data-action="view" data-id="${q.id}">${language === 'ru' ? 'Открыть' : 'Open'}</button>
          <button data-action="edit" data-id="${q.id}">${language === 'ru' ? 'Редактировать' : 'Edit'}</button>
        </div>
      `;
      container.appendChild(card);
    });
  }

  function loadPerformanceCourses() {
    const select = document.getElementById('courseSelectForPerf');
    select.innerHTML = '';
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.textContent = translations[language].selectCourseOption;
    select.appendChild(defaultOption);
    // TODO: fetch курсы для успеваемости
    const courses = [
      { id: 1, title: 'Программирование на Python' },
      { id: 2, title: 'Алгоритмы и структуры данных' }
    ];
    courses.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.title;
      select.appendChild(opt);
    });
  }

  document.getElementById('courseSelectForPerf').addEventListener('change', (e) => {
    const courseId = e.target.value;
    const details = document.getElementById('perf-details');
    details.innerHTML = '';
    if (courseId) {
      // TODO: fetch('/api/course/' + courseId + '/performance')...
      details.innerHTML = `<p>${language === 'ru' ? 'Успеваемость для курса ID' : 'Performance for course ID'} ${courseId} ${language === 'ru' ? 'будет здесь.' : 'will be displayed here.'}</p>`;
    }
  });

  // Инициализация данных
  loadDashboardStats();
  loadCourses();
  loadQuizzes();
  loadPerformanceCourses();

  // TODO: форма создания курса, квиза, обновление профиля и т.д.
});

function applyLanguage(lang) {
  // Устанавливаем атрибут lang на html
  document.documentElement.lang = lang;
  // Обновляем текст всех элементов с data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    const path = key.split('.');
    let text = translations[lang];
    path.forEach(p => { if (text) text = text[p]; });
    if (text) el.textContent = text;
  });
  // Обновляем placeholders
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    const text = translations[lang][key];
    if (text) el.setAttribute('placeholder', text);
  });
  // Обновляем состояние кнопки переключения языка
  const langToggle = document.getElementById('langToggle');
  langToggle.textContent = (lang === 'en') ? 'RU' : 'EN';
  langToggle.title = translations[lang].switchLanguage;
}

function applyTheme(theme) {
  // Устанавливаем data-theme на html
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (theme === 'light') {
    themeToggle.textContent = '✸'; // переключиться на тёмную
  } else {
    themeToggle.textContent = '☾'; // переключиться на светлую
  }
  themeToggle.title = translations[localStorage.getItem('language') || 'en'].switchTheme;

setTimeout(() => {
    logout.disabled = false;
    logout.textContent = textMap[currentLang].submit;
    window.location.href = "login.html";
  }, 1500);
}
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
    switchTheme: 'Switch Theme',
    user: 'Teacher'
    
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
    switchTheme: 'Сменить тему',
    user: 'Преподаватель'
  }
};

// Основной код
document.addEventListener('DOMContentLoaded', () => {
  const langToggle  = document.getElementById('langToggle');
  const themeToggle = document.getElementById('themeToggle');
  const navLinks    = document.querySelectorAll('.sidebar__nav a[data-section]');
  const sections    = document.querySelectorAll('.section');

  // Загрузка настроек
  let language = localStorage.getItem('language') || 'en';
  let theme    = localStorage.getItem('theme')    || 'light';
  applyLanguage(language);
  applyTheme(theme);

  langToggle.addEventListener('click', () => {
    language = (language === 'en' ? 'ru' : 'en');
    localStorage.setItem('language', language);
    applyLanguage(language);
  });

  themeToggle.addEventListener('click', () => {
    theme = (theme === 'light' ? 'dark' : 'light');
    localStorage.setItem('theme', theme);
    applyTheme(theme);
  });

  // Навигация между секциями
  navLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      sections.forEach(sec => {
        sec.id === link.dataset.section
          ? sec.classList.add('active')
          : sec.classList.remove('active');
      });
    });
  });

  // Загрузка данных (заглушки)
  document.getElementById('stat-courses-count').textContent  = '3';
  document.getElementById('stat-students-count').textContent = '120';
  document.getElementById('stat-quizzes-count').textContent  = '15';

  renderCourses();
  renderQuizzes();
  renderPerfCourses();

  // Рендер курсов
  function renderCourses() {
    const cont = document.getElementById('courses-list');
    cont.innerHTML = '';
    const data = [
      { id:1, title:'Python', description:'Intro to Python' },
      { id:2, title:'Алгоритмы', description:'Basics' },
      { id:3, title:'БД', description:'SQL & NoSQL' }
    ];
    data.forEach(c => {
      const card = document.createElement('div');
      card.className = 'card course-card';
      card.innerHTML = `
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <div class="btn-group">
          <button data-action="view" data-id="${c.id}">${language==='ru'?'Открыть':'Open'}</button>
          <button data-action="edit" data-id="${c.id}">${language==='ru'?'Редактировать':'Edit'}</button>
        </div>`;
      cont.append(card);
    });
  }

  // Рендер квизов
  function renderQuizzes() {
    const cont = document.getElementById('quizzes-list');
    cont.innerHTML = '';
    const data = [{id:1,title:'Quiz 1'},{id:2,title:'Quiz 2'}];
    data.forEach(q => {
      const card = document.createElement('div');
      card.className = 'card quiz-card';
      card.innerHTML = `
        <h3>${q.title}</h3>
        <div class="btn-group">
          <button data-action="view" data-id="${q.id}">${language==='ru'?'Открыть':'Open'}</button>
          <button data-action="edit" data-id="${q.id}">${language==='ru'?'Редактировать':'Edit'}</button>
        </div>`;
      cont.append(card);
    });
  }

  // Список курсов для успеваемости
  function renderPerfCourses() {
    const sel = document.getElementById('courseSelectForPerf');
    sel.innerHTML = `<option value="">${translations[language].selectCourseOption}</option>`;
    [{id:1,title:'Python'},{id:2,title:'Алгоритмы'}]
      .forEach(c => {
        const opt = document.createElement('option');
        opt.value = c.id; opt.textContent = c.title;
        sel.append(opt);
      });
    sel.addEventListener('change', e => {
      const d = document.getElementById('perf-details');
      d.innerHTML = e.target.value
        ? `<p>${language==='ru'
            ?`Успеваемость для курса ID ${e.target.value}`
            :`Performance for course ID ${e.target.value}`}</p>`
        : '';
    });
  }
});

// Функции applyLanguage/applyTheme оставляем без изменений из твоего кода
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
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
let savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '✸' : '☾';

themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('light') ? 'dark' : 'light';
  body.classList.replace(savedTheme, newTheme);
  localStorage.setItem('theme', newTheme);
  savedTheme = newTheme;
  themeToggle.textContent = newTheme === 'light' ? '✸' : '☾';
});

const langData = {
      en: {
        mainTitle: "Привет, студент!",
        home: "Главная",
        courses: "Курсы",
        schedule: "Расписание",
        messages: "Сообщения",
        search: "Поиск...",
        logo: "Мой Университет",
        widgets: [
          { title: "Мои курсы", text: "Вы записаны на 5 курсов.", action: "Перейти" },
          { title: "Расписание на сегодня", text: "Следующая пара в 14:00 — Математика.", action: "Открыть" },
          { title: "Уведомления", text: "3 новых сообщения.", action: "Просмотреть" },
          { title: "Статистика", text: "Ваш средний балл: 4.7.", action: "Подробнее" }
        ]
      },
      ru: {
        mainTitle: "Hello, student!",
        home: "Home",
        courses: "Courses",
        schedule: "Schedule",
        messages: "Messages",
        search: "Search...",
        logo: "My University",
        widgets: [
          { title: "My Courses", text: "You are enrolled in 5 courses.", action: "Go to" },
          { title: "Today's Schedule", text: "Next class at 14:00 – Math.", action: "Open" },
          { title: "Notifications", text: "3 new messages.", action: "View" },
          { title: "Statistics", text: "Your GPA: 4.7", action: "Details" }
        ]
      }
    };

    let currentLang = 'ru';

    const updateLanguage = () => {
      const lang = langData[currentLang];
      document.getElementById('main-title').innerText = lang.mainTitle;
      document.getElementById('search-input').placeholder = lang.search;
      document.getElementById('logo-text').innerText = lang.logo;

      document.querySelectorAll('[data-key]').forEach(el => {
        const key = el.dataset.key;
        el.textContent = lang[key];
      });

      renderWidgets(lang.widgets);
    };

    const renderWidgets = (widgets) => {
      const container = document.getElementById('widgets');
      container.innerHTML = '';
      widgets.forEach(w => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <h3>${w.title}</h3>
          <p>${w.text}</p>
          <button class="btn">${w.action}</button>
        `;
        container.appendChild(card);
      });
    };

    // Смена темы
    document.getElementById('theme-toggle').onclick = () => {
      document.documentElement.classList.toggle('dark-theme');
    };

    // Смена языка
    document.getElementById('language-toggle').onclick = () => {
      currentLang = currentLang === 'ru' ? 'en' : 'ru';
      document.getElementById('language-toggle').innerText = currentLang.toUpperCase() === 'RU' ? 'EN' : 'RU';
      updateLanguage();
    };

    // Сайдбар
    const sidebar = document.querySelector('.sidebar');
    document.getElementById('menu-toggle').onclick = () => sidebar.classList.toggle('collapsed');
    document.getElementById('sidebar-collapse').onclick = () => sidebar.classList.toggle('collapsed');

    // Инициализация
    document.addEventListener('DOMContentLoaded', () => {
      updateLanguage();
    });
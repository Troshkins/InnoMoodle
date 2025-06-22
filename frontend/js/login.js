// Получение элементов
const body = document.body;
// Пример из registration.js
document.getElementById('langToggle').addEventListener('click', () => {
  const current = localStorage.getItem('language') || 'en';
  const next = (current === 'en') ? 'ru' : 'en';
  localStorage.setItem('language', next);
  // Применить перевод на странице регистрации
  applyLanguage(next);
});

document.getElementById('themeToggle').addEventListener('click', () => {
  const current = localStorage.getItem('theme') || 'light';
  const next = (current === 'light') ? 'dark' : 'light';
  localStorage.setItem('theme', next);
  applyTheme(next);
});
const loginForm = document.getElementById('loginForm');
const submitBtn = document.getElementById('submitBtn');

// Инициализация темы из localStorage
let savedTheme = localStorage.getItem('theme') || 'light';
body.classList.add(savedTheme);
themeToggle.textContent = savedTheme === 'light' ? '✸' : '☾';

// Маппинг текстов для языков
const textMap = {
  ru: {
    title: 'InnoMoodle',
    // username: 'Username',
    // password: 'Password',
    submit: 'Log in with SSO',
    checking: 'Checking...',
    success: 'Login successful!',
    footer: '© 2025 Your Company'
  },
  en: {
    title: 'InnoMoodle',
    // username: 'Логин',
    // password: 'Пароль',
    submit: 'Войти через SSO',
    checking: 'Проверка...',
    success: 'Успешный вход!',
    footer: '© 2025 Ваша Компания'
  }
};

// Инициализация языка из localStorage
let currentLang = localStorage.getItem('lang') || 'ru';
const applyLanguage = () => {
  const map = textMap[currentLang];
  document.getElementById('title').textContent = map.title;
//   document.getElementById('username').placeholder = map.username;
//   document.getElementById('password').placeholder = map.password;
  submitBtn.textContent = map.submit;
  document.getElementById('footerText').textContent = map.footer;
  langToggle.textContent = currentLang === 'ru' ? 'EN' : 'RU';
};
applyLanguage();

// Переключатель темы
themeToggle.addEventListener('click', () => {
  const newTheme = body.classList.contains('light') ? 'dark' : 'light';
  body.classList.replace(savedTheme, newTheme);
  localStorage.setItem('theme', newTheme);
  savedTheme = newTheme;
  themeToggle.textContent = newTheme === 'light' ? '✸' : '☾';
});

// Переключатель языка
langToggle.addEventListener('click', () => {
  currentLang = currentLang === 'ru' ? 'en' : 'ru';
  localStorage.setItem('lang', currentLang);
  applyLanguage();
});

// Обработка формы
loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
//   const username = document.getElementById('username').value.trim();
//   const password = document.getElementById('password').value.trim();

//   if (!username || !password) {
//     alert(currentLang === 'en' ? 'Please fill in all fields.' : 'Пожалуйста, заполните все поля.');
//     return;
//   }

  submitBtn.disabled = true;
  submitBtn.textContent = textMap[currentLang].checking;

  setTimeout(() => {
    alert(textMap[currentLang].success);
    submitBtn.disabled = false;
    submitBtn.textContent = textMap[currentLang].submit;
  }, 1500);
});

function updateDiagonal() {
const w = window.innerWidth;
const h = window.innerHeight;
const d = Math.sqrt(w * w + h * h); // px
document.documentElement.style.setProperty('--screen-diagonal', `${d}px`);
}

updateDiagonal();
window.addEventListener('resize', updateDiagonal);

submitBtn.addEventListener('click', function () {
  submitBtn.disabled = true;
  submitBtn.textContent = textMap[currentLang].checking;

  // Имитация проверки
  setTimeout(() => {
    submitBtn.disabled = false;
    submitBtn.textContent = textMap[currentLang].submit;

    // Только после успешной проверки — переход
    window.location.href = "home.html";//'https://sso.university.innopolis.ru/adfs/oauth2/authorize?response_type=code&client_id=00eeb856-d2ef-41d1-9002-46e481d9b5a2&redirect_uri=https%3A%2F%2Fmy.innopolis.university%2Fauth%2Fcallback%2Fadfs';
  }, 1500);
});
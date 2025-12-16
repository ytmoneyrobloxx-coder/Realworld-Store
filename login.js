const nickname = document.getElementById('nickname');
const password = document.getElementById('password');
const loginBtn = document.getElementById('loginBtn');

// Мобилки — корректная высота
function adjustHeight() {
  document.body.style.minHeight = window.innerHeight + 'px';
}
window.addEventListener('resize', adjustHeight);
adjustHeight();

// Кнопка входа
loginBtn.addEventListener('click', () => {

  if (!nickname.value || !password.value) {
    alert('Введите никнейм и пароль');
    return;
  }

  // Переход после входа
  localStorage.setItem('username', nickname.value);
  window.location.href = "index.html";
});

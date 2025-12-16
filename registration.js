const nickname = document.getElementById('nickname');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const ageCheck = document.getElementById('ageCheck');
const submitBtn = document.getElementById('submitBtn');

// Адаптация под высоту экрана (мобилки)
function adjustHeight() {
  document.body.style.minHeight = window.innerHeight + 'px';
}
window.addEventListener('resize', adjustHeight);
adjustHeight();

// Включение кнопки при галочке 14+
ageCheck.addEventListener('change', () => {
  submitBtn.disabled = !ageCheck.checked;
});

// Нажатие на кнопку
submitBtn.addEventListener('click', () => {

  if (!nickname.value || !password.value || !confirmPassword.value) {
    alert('Заполните все поля');
    return;
  }

  if (password.value !== confirmPassword.value) {
    alert('Пароли не совпадают');
    return;
  }

  if (!ageCheck.checked) {
    alert('Подтвердите, что вам есть 14 лет');
    return;
  }

  // 👉 СОХРАНЕНИЕ ДАННЫХ И ПЕРЕХОД
  localStorage.setItem('username', nickname.value);
  window.location.href = "index.html";
});

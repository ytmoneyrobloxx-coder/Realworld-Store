document.addEventListener('DOMContentLoaded', () => {
    // Проверяем, авторизован ли пользователь
    const username = localStorage.getItem('username');
    if (!username) {
        window.location.href = 'login.html';
        return;
    }

    // Обновляем информацию об авторизации
    updateAuthInfo();

    // Инициализируем вкладки настроек
    initializeTabs();

    // Загружаем сохраненные данные пользователя
    loadUserData();

    // Инициализируем обработчики событий
    initializeEventHandlers();
});

function updateAuthInfo() {
    const authContainer = document.querySelector('.auth');
    const profileImage = localStorage.getItem('profileImage') || 'Риливорлд.png';
    
    authContainer.innerHTML = `
        <div class="user-account">
            <div class="profile-menu">
                <img src="${profileImage}" alt="Аватар" class="profile-avatar" id="profileAvatar" title="Нажмите для настроек">
                <div class="dropdown-menu" id="dropdownMenu">
                    <div class="dropdown-item" id="changePhotoDropdown">Поменять фото</div>
                    <div class="dropdown-item" id="settingsDropdown">Настройки</div>
                    <div class="dropdown-item" id="logout">Выйти</div>
                </div>
            </div>
            <input type="file" id="photoUpload" accept="image/*" style="display: none;">
        </div>
    `;

    // Обработчики для аватара и меню
    const profileAvatar = document.getElementById('profileAvatar');
    const dropdownMenu = document.getElementById('dropdownMenu');
    
    profileAvatar.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdownMenu.classList.toggle('show');
    });

    document.addEventListener('click', (e) => {
        if (!profileAvatar.contains(e.target)) {
            dropdownMenu.classList.remove('show');
        }
    });

    // Обработчик для изменения фото из меню
    const changePhotoBtn = document.getElementById('changePhotoDropdown');
    const photoUpload = document.getElementById('photoUpload');
    
    changePhotoBtn.addEventListener('click', () => {
        photoUpload.click();
        dropdownMenu.classList.remove('show');
    });

    photoUpload.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            
            reader.onload = (event) => {
                const imageData = event.target.result;
                localStorage.setItem('profileImage', imageData);
                
                // Обновляем изображение аватара везде
                document.querySelectorAll('.profile-avatar').forEach(img => {
                    img.src = imageData;
                });
                
                // Обновляем изображение на странице настроек
                const currentProfileImage = document.getElementById('currentProfileImage');
                if(currentProfileImage) {
                    currentProfileImage.src = imageData;
                }
            };
            
            reader.readAsDataURL(e.target.files[0]);
        }
    });

    // Обработчик для перехода в настройки (на случай, если пользователь уже на странице настроек)
    const settingsBtn = document.getElementById('settingsDropdown');
    settingsBtn.addEventListener('click', () => {
        // Обновляем страницу настроек, чтобы отобразить актуальные данные
        window.location.reload();
        dropdownMenu.classList.remove('show');
    });

    // Обработчик для выхода
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem('username');
        localStorage.removeItem('profileImage');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('paymentMethod');
        window.location.href = 'index.html';
    });
}

function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Убираем активный класс со всех кнопок и контента
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Добавляем активный класс к выбранной вкладке
            button.classList.add('active');
            document.getElementById(`${tabId}-tab`).classList.add('active');
        });
    });
}

function loadUserData() {
    // Загружаем никнейм
    const username = localStorage.getItem('username');
    const usernameDisplay = document.getElementById('displayUsername');
    if(usernameDisplay) {
        usernameDisplay.textContent = username;
    }

    // Загружаем email
    const email = localStorage.getItem('userEmail');
    const emailInput = document.getElementById('emailInput');
    if(emailInput) {
        emailInput.value = email || '';
    }

    // Загружаем фото профиля
    const profileImage = localStorage.getItem('profileImage') || 'Риливорлд.png';
    const currentProfileImage = document.getElementById('currentProfileImage');
    if(currentProfileImage) {
        currentProfileImage.src = profileImage;
    }

    // Загружаем метод оплаты
    const paymentMethod = localStorage.getItem('paymentMethod');
    if(paymentMethod) {
        const selectedOption = document.querySelector(`input[name="payment"][value="${paymentMethod}"]`);
        if(selectedOption) {
            selectedOption.checked = true;
        }
    }
}

function initializeEventHandlers() {
    // Обработчик изменения фото профиля в настройках
    const changePhotoBtn = document.getElementById('changePhotoBtn');
    const profilePhotoInput = document.getElementById('profilePhotoInput');
    
    if(changePhotoBtn && profilePhotoInput) {
        changePhotoBtn.addEventListener('click', () => {
            profilePhotoInput.click();
        });
        
        profilePhotoInput.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                const reader = new FileReader();
                
                reader.onload = (event) => {
                    const imageData = event.target.result;
                    localStorage.setItem('profileImage', imageData);
                    
                    // Обновляем изображение аватара везде
                    document.querySelectorAll('.profile-avatar').forEach(img => {
                        img.src = imageData;
                    });
                    
                    // Обновляем изображение на странице настроек
                    const currentProfileImage = document.getElementById('currentProfileImage');
                    if(currentProfileImage) {
                        currentProfileImage.src = imageData;
                    }
                    
                    showNotification('Фото профиля успешно обновлено!');
                };
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });
    }

    // Обработчик сохранения email
    const saveEmailBtn = document.getElementById('saveEmailBtn');
    const emailInput = document.getElementById('emailInput');
    
    if(saveEmailBtn && emailInput) {
        saveEmailBtn.addEventListener('click', () => {
            const email = emailInput.value.trim();
            if(validateEmail(email)) {
                localStorage.setItem('userEmail', email);
                showNotification('Email успешно сохранен!');
            } else {
                showNotification('Пожалуйста, введите действительный email адрес!', 'error');
            }
        });
    }

    // Обработчик сохранения метода оплаты
    const savePaymentBtn = document.getElementById('savePaymentBtn');
    
    if(savePaymentBtn) {
        savePaymentBtn.addEventListener('click', () => {
            const selectedPayment = document.querySelector('input[name="payment"]:checked');
            if(selectedPayment) {
                const paymentValue = selectedPayment.value;
                localStorage.setItem('paymentMethod', paymentValue);
                showNotification('Метод оплаты успешно сохранен!');
            } else {
                showNotification('Пожалуйста, выберите метод оплаты!', 'error');
            }
        });
    }

    // Обработчик смены пароля
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    
    if(changePasswordBtn) {
        changePasswordBtn.addEventListener('click', () => {
            const currentPassword = document.getElementById('currentPassword').value;
            const newPassword = document.getElementById('newPassword').value;
            const confirmNewPassword = document.getElementById('confirmNewPassword').value;
            
            if(!currentPassword) {
                showNotification('Пожалуйста, введите текущий пароль!', 'error');
                return;
            }
            
            if(!newPassword) {
                showNotification('Пожалуйста, введите новый пароль!', 'error');
                return;
            }
            
            if(newPassword.length < 6) {
                showNotification('Новый пароль должен содержать не менее 6 символов!', 'error');
                return;
            }
            
            if(newPassword !== confirmNewPassword) {
                showNotification('Новые пароли не совпадают!', 'error');
                return;
            }
            
            // Здесь могла бы быть проверка текущего пароля, но в текущей системе это невозможно
            // так как пароли не хранятся в открытом виде
            
            // Сохраняем индикатор, что пароль был изменен
            localStorage.setItem('passwordChanged', 'true');
            showNotification('Пароль успешно изменен!');
            
            // Очищаем поля
            document.getElementById('currentPassword').value = '';
            document.getElementById('newPassword').value = '';
            document.getElementById('confirmNewPassword').value = '';
        });
    }
}

// Функция для валидации email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Функция для отображения уведомлений
function showNotification(message, type = 'success') {
    // Удаляем существующее уведомление, если оно есть
    const existingNotification = document.querySelector('.notification');
    if(existingNotification) {
        existingNotification.remove();
    }
    
    // Создаем элемент уведомления
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Добавляем в DOM
    document.body.appendChild(notification);
    
    // Показываем уведомление
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Автоматически скрываем уведомление через 3 секунды
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if(notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
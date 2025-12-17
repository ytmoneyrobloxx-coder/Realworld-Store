document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth');
    const username = localStorage.getItem('username');

    if (username) {
        // Получаем сохраненное фото профиля или используем стандартное
        const profileImage = localStorage.getItem('profileImage') || 'Риливорлд.png';
        
        authContainer.innerHTML = `
            <div class="user-account">
                <div class="profile-menu">
                    <img src="${profileImage}" alt="Аватар" class="profile-avatar" id="profileAvatar" title="Нажмите для настроек">
                    <div class="dropdown-menu" id="dropdownMenu">
                        <div class="dropdown-item" id="changePhoto">Поменять фото</div>
                        <div class="dropdown-item" id="settings">Настройки</div>
                        <div class="dropdown-item" id="logout">Выйти</div>
                    </div>
                </div>
                <input type="file" id="photoUpload" accept="image/*" style="display: none;">
            </div>
        `;

        // Обработчик для аватара (показывает/скрывает меню)
        const profileAvatar = document.getElementById('profileAvatar');
        const dropdownMenu = document.getElementById('dropdownMenu');
        
        profileAvatar.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdownMenu.classList.toggle('show');
        });

        // Обработчик для скрытия меню при клике вне его области
        document.addEventListener('click', (e) => {
            if (!profileAvatar.contains(e.target)) {
                dropdownMenu.classList.remove('show');
            }
        });

        // Обработчик для изменения фото
        const changePhotoBtn = document.getElementById('changePhoto');
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
                    
                    // Обновляем изображение аватара
                    profileAvatar.src = imageData;
                };
                
                reader.readAsDataURL(e.target.files[0]);
            }
        });

        // Обработчик для кнопки "Настройки"
        const settingsBtn = document.getElementById('settings');
        settingsBtn.addEventListener('click', () => {
            window.location.href = 'settings.html';
            dropdownMenu.classList.remove('show');
        });

        // Обработчик для кнопки "Выйти"
        const logoutButton = document.getElementById('logout');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('username');
            localStorage.removeItem('profileImage'); // Удаляем фото при выходе
            window.location.reload();
        });
    } else {
        // Отображение ссылок "Войти" и "Регистрация" для неавторизованных пользователей
        authContainer.innerHTML = `
            <a href="login.html" class="login">Войти</a>
            <a href="registration.html" class="register">Регистрация</a>
        `;
    }
});

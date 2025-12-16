document.addEventListener('DOMContentLoaded', () => {
    const authContainer = document.querySelector('.auth');
    const username = localStorage.getItem('username');

    if (username) {
        authContainer.innerHTML = `
            <div class="user-account">
                <span class="username">Привет, ${username}</span>
                <a href="#" id="logout" class="logout">Выйти</a>
            </div>
        `;

        const logoutButton = document.getElementById('logout');
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('username');
            window.location.reload();
        });
    }
});

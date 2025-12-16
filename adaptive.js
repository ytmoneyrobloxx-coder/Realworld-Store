function setDeviceClass() {
    const width = window.innerWidth;
    const body = document.body;

    // Удаляем старые классы
    body.classList.remove('mobile', 'tablet', 'desktop');

    if (width <= 768) {
        body.classList.add('mobile');
    } else if (width <= 1024) {
        body.classList.add('tablet');
    } else {
        body.classList.add('desktop');
    }
}

// Запуск при загрузке
window.addEventListener('load', setDeviceClass);

// Запуск при изменении размера экрана
window.addEventListener('resize', setDeviceClass);

// Реакция на поворот устройства
window.addEventListener('orientationchange', setDeviceClass);

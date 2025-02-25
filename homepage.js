let currentIndex = 0;

function showSlide(index) {
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    if (index >= totalSlides) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = totalSlides - 1;
    }
    const offset = -100 * currentIndex;
    const slider = document.querySelector('.slider');
    slider.style.transform = `translateX(${offset}%)`;
}

function nextSlide() {
    currentIndex++;
    showSlide(currentIndex);
}

function previousSlide() {
    currentIndex--;
    showSlide(currentIndex);
}

document.addEventListener('DOMContentLoaded', () => {
    showSlide(currentIndex);

    // Touch events for drag
    const slider = document.querySelector('.slider');
    let startX = 0;
    let endX = 0;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    slider.addEventListener('touchmove', (e) => {
        endX = e.touches[0].clientX;
    });

    slider.addEventListener('touchend', () => {
        if (startX - endX > 50) {
            nextSlide();
        } else if (startX - endX < -50) {
            previousSlide();
        }
    });
});

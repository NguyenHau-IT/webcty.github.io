function redirectToOtherPage(page) {
    window.location.href = page;
}

let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let dots = document.querySelectorAll('.slider .dots li');
let lengthItems = items.length - 1;
let active = 0;

function next() {
    active = active + 1 <= lengthItems ? active + 1 : 0;
    reloadSlider();
}

function prev() {
    active = active - 1 >= 0 ? active - 1 : lengthItems;
    reloadSlider();
}

let refreshInterval = setInterval(next, 5000);

function reloadSlider() {
    slider.style.left = -items[active].offsetLeft + 'px';
    let last_active_dot = document.querySelector('.slider .dots li.active');
    last_active_dot.classList.remove('active');
    dots[active].classList.add('active');

    clearInterval(refreshInterval);
    refreshInterval = setInterval(next, 5000);
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key;
        reloadSlider();
    });
});

const carousel = document.querySelector('.carousel');
const newsItems = document.querySelectorAll('.news-item');
const totalItems = newsItems.length;
let itemsPerSlide = 3; // Default for desktop
let currentIndex = 0;

// Function to update carousel based on currentIndex and itemsPerSlide
function updateCarousel() {
    const visibleItems = [];

    // Calculate how many items to show
    const itemsToShow = Math.min(itemsPerSlide, totalItems - currentIndex);

    // Push the next items to the visibleItems array
    for (let i = 0; i < itemsToShow; i++) {
        const index = (currentIndex + i) % totalItems;
        visibleItems.push(newsItems[index]);
    }

    // Hide all items first
    newsItems.forEach((item) => item.style.display = 'none');

    // Display only the selected items
    visibleItems.forEach((item) => item.style.display = 'flex');
}

// Function to go to the next set of items
function showNextItems() {
    currentIndex = (currentIndex + itemsPerSlide) % totalItems;
    updateCarousel();
}

// Function to go to the previous set of items
function showPrevItems() {
    currentIndex = (currentIndex - itemsPerSlide + totalItems) % totalItems;
    updateCarousel();
}

// Check the screen width and adjust itemsPerSlide accordingly
function checkScreenSize() {
    if (window.matchMedia("(max-width: 768px)").matches) {
        // For mobile devices, show 1 item per slide
        itemsPerSlide = 1;
    } else {
        // For desktop, show 3 items per slide
        itemsPerSlide = 3;
    }
    // Reset currentIndex to avoid out-of-bound errors
    currentIndex = 0;
    updateCarousel();
}

// Auto-slide every 8 seconds
setInterval(showNextItems, 8000);

// Re-check screen size on window resize
window.addEventListener('resize', checkScreenSize);

// Initial check on page load
checkScreenSize();

reloadSlider();
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
const itemsPerSlide = 3; // Số tin hiển thị mỗi lần
let currentIndex = 0;

// Hàm cập nhật carousel để hiển thị 3 tin hoặc ít hơn nếu không đủ
function updateCarousel() {
    const visibleItems = [];

    // Kiểm tra nếu số tin còn lại ít hơn số tin mỗi slide
    const itemsToShow = Math.min(itemsPerSlide, totalItems - currentIndex);

    // Tính toán các chỉ số tin cần hiển thị
    for (let i = 0; i < itemsToShow; i++) {
        const index = (currentIndex + i) % totalItems; // Lấy tin tiếp theo, lặp lại nếu cần
        visibleItems.push(newsItems[index]);
    }

    // Ẩn tất cả tin trước
    newsItems.forEach((item) => item.style.display = 'none');

    // Hiển thị các tin đã chọn
    visibleItems.forEach((item) => item.style.display = 'flex');
}

// Hàm chuyển đến nhóm tin tiếp theo
function showNextItems() {
    // Nếu còn ít hơn itemsPerSlide tin thì quay lại đầu
    currentIndex = (currentIndex + itemsPerSlide) % totalItems;
    updateCarousel();
}

// Hàm quay lại nhóm tin trước đó
function showPrevItems() {
    // Quay lại nhóm 3 tin trước đó, nếu đang ở đầu thì quay lại cuối
    currentIndex = (currentIndex - itemsPerSlide + totalItems) % totalItems;
    updateCarousel();
}
// Auto-slide every 5 seconds
setInterval(showNextItems, 3000);
reloadSlider();
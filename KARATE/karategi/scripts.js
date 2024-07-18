document.addEventListener('DOMContentLoaded', () => {
    const cartCountElement = document.getElementById('cart-count');
    const cartButton = document.getElementById('cart-button');
    const cartModal = document.getElementById('cart-modal');
    const closeModalButtons = document.querySelectorAll('.close');
    const cartItemsElement = document.getElementById('cart-items');
    const placeOrderButton = document.getElementById('place-order');
    const orderFormModal = document.getElementById('order-form');
    const contactForm = document.getElementById('contact-form');
    const modals = document.querySelectorAll('.modal');
    const viewDetailsButtons = document.querySelectorAll('.view-details');
    const modal = document.querySelector('.modal');
    const productImage = document.querySelector('.product-image');
    const productName = document.querySelector('.product-name');
    const productPrice = document.querySelector('.product-price');
    const productDescription = document.querySelector('.product-description');

    let cart = [];

    const updateCartCount = () => {
        cartCountElement.textContent = cart.length;
    };

    const updateCartModal = () => {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.textContent = `${item.name} - ${item.price} VND`;
            cartItemsElement.appendChild(itemElement);
        });
    };

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const id = productElement.getAttribute('data-id');
            const name = productElement.getAttribute('data-name');
            const price = productElement.getAttribute('data-price');
            
            cart.push({ id, name, price });
            updateCartCount();
        });
    });

    cartButton.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'block';
    });

    closeModalButtons.forEach(button => {
        button.addEventListener('click', () => {
            modals.forEach(modal => modal.style.display = 'none');
        });
    });

    placeOrderButton.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Giỏ hàng của bạn đang trống!');
        } else {
            orderFormModal.style.display = 'block';
        }
    });

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        formData.append('order', JSON.stringify(cart));

        fetch('https://formspree.io/f/xblrleor', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi gửi đơn hàng.');
            }
            alert('Đặt hàng thành công! Chúng tôi sẽ liên hệ với bạn sớm nhất có thể.');
            cart = [];
            updateCartCount();
            modals.forEach(modal => modal.style.display = 'none');
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Đã có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
        });
    });

    viewDetailsButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productElement = button.parentElement;
            const name = productElement.getAttribute('data-name');
            const price = productElement.getAttribute('data-price');
            const imageSrc = productElement.querySelector('img').src;

            productName.textContent = name;
            productPrice.textContent = `Giá: ${price} VND`;
            productImage.src = imageSrc;
            productDescription.textContent = `Mô tả chi tiết của ${name}`;

            modal.style.display = 'block';
        });
    });
});

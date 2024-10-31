document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('data-target');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        }
    });
});


let cart = [];
let total = 0; 

function addToCart(name, description, price) {
    const product = { name, description, price };
    cart.push(product);
    total += price;
    updateCartCount();
    renderCart();
}

function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.description} - Precio: $${item.price}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total}`;
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Gracias por su compra!');
    cart = [];
    total = 0;
    updateCartCount();
    renderCart();
});


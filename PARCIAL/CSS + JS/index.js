document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('data-target');

        if (targetId) {
            e.preventDefault();
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center'
                });
            }
        }
    });
});

document.getElementById('profile-link').addEventListener('click', function (e) {
    e.stopPropagation();
    window.location.href = '/HTML/profile.html';
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

document.getElementById("btnFinalizarCompra").addEventListener("click", function () {
    let productos = JSON.stringify(cart);

    if (cart.length === 0) {
        alert("Error: No hay productos en el carrito.");
        return;
    }

    fetch("guardar_compra.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `productos=${encodeURIComponent(productos)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Mensaje del servidor
        if (data.includes("éxito")) {
            cart = [];
            total = 0;
            updateCartCount();
            renderCart();
            window.location.href = "index.php?mensaje=compra_exitosa";
        }
    })
    .catch(error => console.error("Error:", error));
});

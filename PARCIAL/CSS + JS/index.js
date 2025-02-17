// Agrega un evento a los enlaces de la barra de navegación para hacer scroll suave
// al hacer clic en los enlaces de navegación

document.querySelectorAll('.navbar a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('data-target');

        if (targetId) {
            e.preventDefault(); // Evita la navegación predeterminada
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Desplazamiento suave
                    block: 'center'
                });
            }
        }
    });
});

// Redirige al usuario a la página de perfil al hacer clic en el enlace de perfil
document.getElementById('profile-link').addEventListener('click', function (e) {
    e.stopPropagation(); // Evita que el evento burbujee
    window.location.href = '/HTML/profile.html';
});

// Variables para almacenar los productos del carrito y el total
// declara un array vacío para el carrito
let cart = [];
let total = 0;

// Función para agregar productos al carrito
function addToCart(name, description, price) {
    const product = { name, description, price };
    cart.push(product);
    total += price;
    updateCartCount(); // Actualiza el contador del carrito
    renderCart(); // Renderiza el carrito con los productos añadidos
}

// Función para renderizar el carrito en la interfaz
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    cart.forEach((item) => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.description} - Precio: $${item.price}`;
        cartItems.appendChild(li);
    });

    cartTotal.textContent = `Total: $${total}`; // Muestra el total en la interfaz
}

// Función para actualizar el número de productos en el carrito
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

// Evento para finalizar la compra
document.getElementById("btnFinalizarCompra").addEventListener("click", function () {
    let productos = JSON.stringify(cart);

    if (cart.length === 0) {
        alert("Error: No hay productos en el carrito.");
        return;
    }

    // Envía la compra al servidor mediante una solicitud fetch
    fetch("guardar_compra.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `productos=${encodeURIComponent(productos)}`
    })
    .then(response => response.text())
    .then(data => {
        alert(data); // Muestra el mensaje de respuesta del servidor
        if (data.includes("éxito")) {
            cart = []; // Vacía el carrito tras la compra
            total = 0;
            updateCartCount(); // Actualiza el contador del carrito
            renderCart(); // Refresca la vista del carrito
            window.location.href = "index.php?mensaje=compra_exitosa"; // Redirige tras la compra
        }
    })
    .catch(error => console.error("Error:", error));
});

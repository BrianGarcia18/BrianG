// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function() {
    // Obtiene los parámetros de la URL para extraer el id del producto
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('product'); // Obtiene el id del producto desde la URL

    // Definición de los detalles de los productos disponibles
    const productDetails = {
        1: {
            name: "Redragon K587 PRO MAGIC-WAND TKL",
            description: "Teclado gamer Redragon Magic Wand Pro K587-PRO QWERTY Redragon<br>Opto-Mecánico Red español latinoamérica color negro con luz RGB",
            specifications: [
                { title: "Idioma", detail: "Español Latinoamérica" },
                { title: "Layout", detail: "QWERTY" },
                { title: "Retroiluminacion", detail: "RGB" },
                { title: "Tiene reposamuñecas?", detail: "SI" },
                { title: "Con cable removible?", detail: "SI" }
            ],
            image: "/img/compragamer_Imganen_general_21329_Teclado_Optico_Redragon_K587_PRO_MAGIC-WAND_TKL_838e2858-grn.jpg"
        },
        2: {
            name: "Redragon VATA K580 RGB",
            description: "PRO RGB Switch Brown QWERTY Redragon Opto-Mecánico<br>español latinoamérica color negro con luz RGB",
            specifications: [
                { title: "Idioma", detail: "Español Latinoamérica" },
                { title: "Layout", detail: "QWERTY" },
                { title: "Retroiluminacion", detail: "RGB" },
                { title: "Tiene reposamuñecas?", detail: "No" },
                { title: "Tiene Pad numerico?", detail: "Si" }
            ],
            image: "/img/compragamer_Imganen_general_21949_Teclado_Mecanico_Redragon_VATA_K580_RGB_PRO_RGB_Switch_Brown_ESP_b7bd3a3b-grn.jpg"
        }
    };

    // Verifica si el id del producto existe y es válido
    if (productId && productDetails[productId]) {
        // Obtiene los detalles del producto correspondiente
        const product = productDetails[productId];
        const detailsContainer = document.getElementById('product-details'); // Contenedor donde se mostrarán los detalles

        // Crear las especificaciones del producto en formato HTML
        const specificationsHTML = product.specifications.map(spec => `
            <div class="specification">
                <span class="specification-title">${spec.title}:</span>
                <span>${spec.detail}</span>
            </div>
        `).join(''); // Unir todas las especificaciones

        // Inserta los detalles del producto en el contenedor
        detailsContainer.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <h2>${product.name}</h2>
            <p>${product.description}</p>
            <div class="specifications">
                ${specificationsHTML} <!-- Inserta las especificaciones aquí -->
            </div>
        `;
    } else {
        // Si no se encuentra el producto, se muestra un mensaje de error
        const detailsContainer = document.getElementById('product-details');
        detailsContainer.innerHTML = `<p>Producto no encontrado.</p>`;
    }
});

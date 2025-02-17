// Espera a que el DOM esté completamente cargado antes de ejecutar el código
document.addEventListener('DOMContentLoaded', function () {
    console.log("profile.js cargado correctamente");

    // Recuperando los elementos del formulario
    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('save-profile-btn');

    // Comprobando si el botón de guardar existe
    if (!saveButton) {
        console.error("Botón 'Guardar Cambios' no encontrado.");
        return;
    }

    // Recuperando los datos del perfil guardados en el almacenamiento local (localStorage)
    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

    // Si hay datos guardados, los carga en los campos del formulario
    if (savedProfile) {
        nameInput.value = savedProfile.nombre || '';
        lastnameInput.value = savedProfile.apellido || '';
        emailInput.value = savedProfile.email || '';
        dobInput.value = savedProfile.dob || '';
        phoneInput.value = savedProfile.telefono || '';
        addressInput.value = savedProfile.direccion || '';
        passwordInput.value = savedProfile.password || '';
    }

    // Función para alternar la visibilidad de la contraseña (mostrar/ocultar)
    document.getElementById('togglePassword').addEventListener('click', function () {
        // Alterna el tipo de input entre 'password' y 'text'
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        // Cambia el ícono del ojo dependiendo del tipo de campo
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });

    // Al hacer clic en el botón "Guardar Cambios", se guardan los datos en localStorage
    saveButton.addEventListener('click', function () {
        console.log("Botón 'Guardar Cambios' presionado");

        // Se crea un objeto con los datos del perfil
        const profileData = {
            nombre: nameInput.value.trim(),
            apellido: lastnameInput.value.trim(),
            email: emailInput.value.trim(),
            dob: dobInput.value.trim(),
            telefono: phoneInput.value.trim(),
            direccion: addressInput.value.trim(),
            password: passwordInput.value.trim()
        };

        // Verifica que todos los campos estén completos
        for (const key in profileData) {
            if (!profileData[key]) {
                alert('Por favor, completa todos los campos.');
                return; // Detiene la ejecución si falta algún campo
            }
        }

        // Guarda los datos en localStorage
        localStorage.setItem('userProfile', JSON.stringify(profileData));
        alert('¡Cambios guardados correctamente!');

        console.log("Redirigiendo a index.html...");

        // Redirige al usuario a la página de inicio
        window.location.href = '/HTML/index.html';
    });
});

document.addEventListener('DOMContentLoaded', function () {
    console.log("profile.js cargado correctamente");

    const nameInput = document.getElementById('name');
    const lastnameInput = document.getElementById('lastname');
    const emailInput = document.getElementById('email');
    const dobInput = document.getElementById('dob');
    const phoneInput = document.getElementById('phone');
    const addressInput = document.getElementById('address');
    const passwordInput = document.getElementById('password');
    const saveButton = document.getElementById('save-profile-btn');

    if (!saveButton) {
        console.error("Botón 'Guardar Cambios' no encontrado.");
        return;
    }

    const savedProfile = JSON.parse(localStorage.getItem('userProfile'));

    if (savedProfile) {
        nameInput.value = savedProfile.nombre || '';
        lastnameInput.value = savedProfile.apellido || '';
        emailInput.value = savedProfile.email || '';
        dobInput.value = savedProfile.dob || '';
        phoneInput.value = savedProfile.telefono || '';
        addressInput.value = savedProfile.direccion || '';
        passwordInput.value = savedProfile.password || '';
    }

    document.getElementById('togglePassword').addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        this.textContent = type === 'password' ? '👁️' : '🙈';
    });

    saveButton.addEventListener('click', function () {
        console.log("Botón 'Guardar Cambios' presionado");

        const profileData = {
            nombre: nameInput.value.trim(),
            apellido: lastnameInput.value.trim(),
            email: emailInput.value.trim(),
            dob: dobInput.value.trim(),
            telefono: phoneInput.value.trim(),
            direccion: addressInput.value.trim(),
            password: passwordInput.value.trim()
        };

        for (const key in profileData) {
            if (!profileData[key]) {
                alert('Por favor, completa todos los campos.');
                return;
            }
        }

        localStorage.setItem('userProfile', JSON.stringify(profileData));
        alert('¡Cambios guardados correctamente!');
        
        console.log("Redirigiendo a index.html...");

        window.location.href = '/HTML/index.html';
    });
});

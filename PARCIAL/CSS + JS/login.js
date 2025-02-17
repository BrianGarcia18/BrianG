function validarFormulario() {
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.innerHTML = '';

    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate());
    const selectedDate = new Date(dob);

    if (selectedDate > minAgeDate) {
        errorMessage.innerHTML = 'Debes tener al menos 8 años de edad.';
        return false;
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.innerHTML = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
        return false;
    }

    if (password !== confirmPassword) {
        errorMessage.innerHTML = 'Las contraseñas no coinciden.';
        return false;
    }

    // ✅ Recuperando datos
    console.log("Correo:", email);
    console.log("Fecha de nacimiento:", dob);
    console.log("Contraseña:", password);

    return true;
}

// Mostrar/ocultar contraseñas
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.type === 'password' ? 'text' : 'password';
    passwordInput.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
    confirmPasswordInput.type = type;
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

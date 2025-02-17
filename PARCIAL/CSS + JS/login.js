// Función para validar el formulario de registro
function validarFormulario() {
    // Recuperando los valores de los campos del formulario
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value; // Fecha de nacimiento
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const errorMessage = document.getElementById('errorMessage'); // Donde se mostrarán los errores
    errorMessage.innerHTML = ''; // Limpiar mensajes previos de error

    // Creando un objeto de fecha con la fecha actual
    const today = new Date();
    // Creando una fecha mínima de 8 años atrás desde hoy
    const minAgeDate = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate());
    const selectedDate = new Date(dob); // Convierte la fecha seleccionada en un objeto Date

    // Comprobando si la persona tiene al menos 8 años
    if (selectedDate > minAgeDate) {
        errorMessage.innerHTML = 'Debes tener al menos 8 años de edad.';
        return false; // Detener la ejecución si no cumple la condición
    }

    // Expresión regular para validar la contraseña (mínimo 8 caracteres, 1 mayúscula, 1 minúscula y 1 número)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
        errorMessage.innerHTML = 'La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.';
        return false; // Detener la ejecución si no cumple la condición
    }

    // Verificando que la contraseña y la confirmación coincidan
    if (password !== confirmPassword) {
        errorMessage.innerHTML = 'Las contraseñas no coinciden.';
        return false; // Detener la ejecución si no coinciden
    }

    // ✅ Recuperando datos y mostrando en la consola para depuración
    console.log("Correo:", email);
    console.log("Fecha de nacimiento:", dob);
    console.log("Contraseña:", password);

    return true; // Si todo está bien, se permite el envío del formulario
}

// Función para mostrar u ocultar la contraseña
document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password'); // Campo de la contraseña
    const type = passwordInput.type === 'password' ? 'text' : 'password'; // Alterna el tipo de campo
    passwordInput.type = type;
    // Cambia el ícono de ojo según el tipo de campo
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

// Función para mostrar u ocultar la contraseña de confirmación
document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
    const confirmPasswordInput = document.getElementById('confirmPassword'); // Campo de confirmación de contraseña
    const type = confirmPasswordInput.type === 'password' ? 'text' : 'password'; // Alterna el tipo de campo
    confirmPasswordInput.type = type;
    // Cambia el ícono de ojo según el tipo de campo
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

function validarFormulario() {
    var nombre = document.getElementById("nombre").value;
    var contraseña = document.getElementById("contraseña").value;

    if (nombre === "") {
        alert("Por favor, ingrese su nombre.");
        return false;
    }

    if (contraseña === "") {
        alert("Por favor, ingrese su contraseña.");
        return false;
    }

    return true;
}
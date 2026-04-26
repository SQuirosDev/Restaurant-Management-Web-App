//Animation Pre-Loader
window.addEventListener("load", function () {
    const preloader = document.querySelector(".preloader");
    const content = document.querySelector(".content");
  
    setTimeout(() => {
      preloader.style.opacity = "0"; 
      setTimeout(() => {
        preloader.style.display = "none"; 
        content.style.display = "block"; 
      }, 1000); 
    }, 875); 
  });
//Oculta el registro utilizando los botones de login y registro
const btnSignIn = document.getElementById("sign-in"),
      btnSignUp = document.getElementById("sign-up"),
      formRegister = document.querySelector(".register"),
      formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e =>{
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
})

btnSignUp.addEventListener("click", e =>{
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
})

// Obtener las referencias de los formularios
const formularioRegistro = document.getElementById('formularioRegistro');
const formularioLogin = document.getElementById('formularioLogin');
const mensajeBienvenida = document.getElementById('mensajeBienvenida');
const datosUsuario = document.getElementById('datosUsuario');
const correoUsuario = document.getElementById('correoUsuario');

// Función para registrar al usuario
formularioRegistro.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir la recarga de la página al enviar el formulario

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombreRegistro').value;
    const correo = document.getElementById('correoRegistro').value;
    const contrasena = document.getElementById('contrasenaRegistro').value;

    // Validación simple
    if (nombre && correo && contrasena) {
        // Guardar en el almacenamiento local
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('correo', correo);
        localStorage.setItem('contrasena', contrasena);

        alert('Usuario registrado exitosamente');
        formularioRegistro.reset(); // Limpiar el formulario
    } else {
        alert('Por favor, complete todos los campos.');
    }
});

// Función para iniciar sesión
formularioLogin.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevenir la recarga de la página al enviar el formulario

    // Obtener los datos del formulario de inicio de sesión
    const nombreLogin = document.getElementById('nombreLogin').value;
    const contrasenaLogin = document.getElementById('contrasenaLogin').value;

    // Verificar si el nombre y la contraseña coinciden con los datos almacenados
    const nombreRegistrado = localStorage.getItem('nombre');
    const correoRegistrado = localStorage.getItem('correo');
    const contrasenaRegistrada = localStorage.getItem('contrasena');

    if (nombreLogin === nombreRegistrado && contrasenaLogin === contrasenaRegistrada) {
        // Si las credenciales son correctas, mostrar los datos del usuario
        mensajeBienvenida.style.display = 'block';
        datosUsuario.innerHTML = `Nombre de usuario: ${nombreLogin}`;
        correoUsuario.innerHTML = `Correo: ${correoRegistrado}`;
    } else {
        alert('Credenciales incorrectas. Intenta nuevamente.');
    }

    formularioLogin.reset(); // Limpiar el formulario
});











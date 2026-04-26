function registrarse() {
    let nombre = document.getElementById("username").value
    let correo = document.getElementById("email").value
    let contrasena = document.getElementById("password").value
    let rol = "Usuario / Cliente"

    let validaciones = ""
    let entrar = false

    try {

        if (nombre.trim() === "") {
            validaciones += "Falta el nombre \n"
            entrar = true
        } 
        if (correo.trim() === "") {
            validaciones += "Falta el correo \n"
            entrar = true
        } 
        if (contrasena.trim() === "") {
            validaciones += "Falta la contrasena \n"
            entrar = true
        }
          
        if (entrar){
            alert(validaciones)
        } else {
            console.log(nombre)
            console.log(correo)
            console.log(contrasena)
            console.log(rol)

            registrarseCB(nombre, correo, contrasena, rol)
            alert("Se guardo")
        }

    } catch (error) {
        alert("ERROR GRAVE: Error no controlado")
        console.log(error)
    }
}

// Conexion Backend

function registrarseCB(dato1, dato2, dato3, dato4) {
    // URL del endpoint
    const url = 'https://localhost:44398/api/usuario/registrarse';

    // Datos a enviar
    const data = {
        usuario: {
            nombre: dato1,
            correo: dato2,
            contrasena: dato3,
            rol: dato4
        }
    };

    // Realizar la solicitud POST
    axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(respuesta => {
        console.log("Respuesta del servidor:", respuesta.data);
    })
    .catch(error => {
        // Manejo del error
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            console.error("Código de estado:", error.response.status);
        } else if (error.request) {
            console.error("No hubo respuesta del servidor:", error.request);
        } else {
            console.error("Error en la configuración de la solicitud:", error.message);
        }
    });
}
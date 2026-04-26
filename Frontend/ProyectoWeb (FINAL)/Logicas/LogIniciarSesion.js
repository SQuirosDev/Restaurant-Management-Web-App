function iniciarSesion() {
    let nombre = ""
    let correo = document.getElementById("correo").value
    let contrasena = document.getElementById("contrasena").value
    let rol = ""

    let validaciones = ""
    let entrar = false

    try {
        if (correo.trim() === "") {
            validaciones += "Falta el correo \n"
            entrar = true
        } 
        if (contrasena.trim() === "") {
            validaciones += "Falta la contraseña \n"
            entrar = true
        } 
          
        if (entrar){
            alert(validaciones)
        } else {
            console.log(correo)
            console.log(contrasena)

            let user;

            user = iniciarSesionCB(nombre, correo, contrasena, rol)
            alert("Se inicio sesion con exito")
        }

    } catch (error) {
        console.log("ERROR GRAVE: Error no controlado")
        console.log(error)
    }
}

// Conexion Backend (CB)

function iniciarSesionCB(dato1, dato2, dato3, dato4) {
    // URL del endpoint
    const url = 'https://localhost:44398/api/usuario/iniciarSesion';

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
        return respuesta.data.usuario
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
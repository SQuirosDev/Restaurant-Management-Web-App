function insertarFeedback() {
    let idUsuario = 0
    let comentario = document.getElementById("comentario").value
    let calificacion = document.getElementById("calificacion").value

    let validaciones = ""
    let entrar = false

    try {
        if (comentario.trim() === "") {
            validaciones += "Falta el comentario \n"
            entrar = true
        }
        if (calificacion.trim() === "") {
            validaciones += "Falta la calificacion \n"
            entrar = true
        }

        if (entrar) {
            alert(validaciones)
        } else {
            console.log(comentario)
            console.log(calificacion)

            ingresarFeedbackCB(idUsuario, comentario, calificacion)
            alert("Se guardo")
        }

    } catch (error) {
        alert("ERROR GRAVE: Error no controlado")
    }
}

function obtenerFeedback() {
    obtenerFeedbackCB()
}

// Conexion Backend

function ingresarFeedbackCB(dato1, dato2, dato3) {
    // URL del endpoint
    const url = 'https://localhost:44398/api/feedback/insertar';

    // Datos a enviar
    const data = {
        feedback: {
            idUsuario: dato1,
            comentario: dato2,
            calificacion: dato3
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

function obtenerFeedbackCB() {
    // URL del endpoint
    const url = 'https://localhost:44398/api/feedback/obtener'

    // Realizar la solicitud GET
    axios.get(url)
    .then(respuesta => {
        console.log(respuesta.data)

        //JQuery

        // Limpiamos el div antes de mostrar los comentarios
        $("#verComentario").empty();

        if (respuesta.data && Object.keys(respuesta.data).length > 0) {
            // Iteramos los comentarios obtenidos del backend
            for(let i = 0; i < Object.keys(respuesta.data).length; i++){
                let comentarioHTML = `
                    <hr>
                    <div class="comentario-item">
                        <p><strong>Comentario:</strong> ${respuesta.data.listaFeedBacks[i].comentario}</p>
                        <p><strong>Calificación:</strong> ${respuesta.data.listaFeedBacks[i].calificacion}</p>
                    </div>
                `;
                $("#verComentario").append(comentarioHTML);
            }  
        } else {
            $('#verComentario').html('<p>No hay comentarios disponibles.</p>');
        }          
    })
    .catch(error => { 
        // Manejo del error
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data)
            console.error("Código de estado:", error.response.status)
        } else if (error.request) {
            console.error("No hubo respuesta del servidor:", error.request)
        } else {
            console.error("Error en la configuración de la solicitud:", error.message)
        }
    });
}
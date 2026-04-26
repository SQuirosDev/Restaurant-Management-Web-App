function insertarReserva() {
    let id = 0
    let fechaReserva = document.getElementById("date").value
    let numeroPersonas = document.getElementById("people").value

    let validaciones = ""
    let entrar = false

    try {
        
        if (fechaReserva.trim() === "") {
            validaciones += "Falta la fecha de la reserva \n"
            entrar = true
        } 
        if (numeroPersonas.trim() === "") {
            validaciones += "Falta el numero de personas de la reserva \n"
            entrar = true
        }
          
        if (entrar){
            alert(validaciones)
        } 
        else {
            console.log(id)
            console.log(fechaReserva)
            console.log(numeroPersonas)

            ingresarReservaCB(id, fechaReserva, numeroPersonas)
            alert("Se guardo")
        }
        
    } catch (error) {
        alert("ERROR GRAVE: Error no controlado")
    }

}

function obtenerReserva() {
    obtenerReservaCB()
}

// Conexion Backend

function ingresarReservaCB(dato1, dato2, dato3) {

    // URL del endpoint
    const url = 'https://localhost:44398/api/reserva/insertar';

    // Datos a enviar
    const data = {
        reserva: {
            idCliente: dato1,
            fechaReserva: dato2,
            numeroPersonas: dato3
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

function obtenerReservaCB() {
      // URL del endpoint
      const url = 'https://localhost:44398/api/reserva/obtener';

      // Realizar la solicitud GET
      axios.get(url)
      .then(respuesta => {
        console.log(respuesta.data)

        // jquery
        console.log(respuesta.data.listaReservas[1].fechaReserva)
        
        // Limpiar el contenido anterior del div
        $('#mostrarReserva').empty();

        // Verificar si hay datos
        if (respuesta.data && Object.keys(respuesta.data).length > 0) {
            // Recorrer los datos y construir el contenido HTML
            for(let i = 0; i < Object.keys(respuesta.data).length; i++){
                const reservaHtml = `
                    <hr>
                    <div class="reserva-item">
                        <p><strong>Fecha de reserva:</strong> ${respuesta.data.listaReservas[i].fechaReserva}</p>
                        <p><strong>Número de personas:</strong> ${respuesta.data.listaReservas[i].numeroPersonas}</p>
                    </div>
                `;
                // Insertar el contenido en el div
                $('#mostrarReserva').append(reservaHtml);
            }
            ;
        } else {
            $('#mostrarReserva').html('<p>No hay reservas disponibles.</p>');
        }
          console.log(respuesta.data)
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
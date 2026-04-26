async function insertarFactura() {
    let idReserva = 0
    let numeroMesa = document.getElementById("numeroMesa").value
    let platos = document.getElementById("listaAlimentos").value
    let listaPrecios = ""
    let precios = document.getElementById("listaPrecios").value
    let total = 0

    let validaciones = ""
    let entrar = false

    try {

        if (numeroMesa.trim() === "") {
            validaciones += "Falta el numero de mesa \n"
            entrar = true
        }
        if (platos.trim() === "") {
            validaciones += "Faltan los platos de la lista \n"
            entrar = true
        }
        if (precios.trim() === "") {
            validaciones += "Faltan los precios de la lista \n"
            entrar = true
        }

        if (entrar) {
            alert(validaciones)
        } else {
            /*
            console.log(idReserva)
            console.log(numeroMesa)
            console.log(platos)
            console.log(listaPrecios)
            console.log(precios)
            console.log(total)
            */

            let resTotal = 0
            
            resTotal = await ingresarFacturaCB(idReserva, numeroMesa, platos, listaPrecios, precios, total)
            console.log(resTotal)
            alert("Se guardo")

            facturaActual(numeroMesa,platos,precios,resTotal)
        }

    } catch (error) {
        alert("ERROR GRAVE: Error no controlado")
        console.log(error)
    }
}

function obtenerFactura() {
    obtenerFacturaCB()
}

// Conexion Backend

function ingresarFacturaCB(dato1, dato2, dato3, dato4, dato5, dato6) {
    // URL del endpoint
    const url = 'https://localhost:44398/api/factura/insertar'

    // Datos a enviar
    const data = {
        factura: {
            idReserva: dato1,
            numeroMesa: dato2,
            platos: dato3,
            listaPrecios: dato4,
            precios: dato5,
            total: dato6
        }
    };

    // Realizar la solicitud POST
    return axios.post(url, data, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(respuesta => {
        console.log("Respuesta del servidor:", respuesta.data);
        return respuesta.data.totalF
    })
    .catch(error => {
        // Manejo del error
        if (error.response) {
            console.error("Error en la respuesta del servidor:", error.response.data);
            console.error("Código de estado:", error.response.status);
        } else if (error.request) {
            console.error("No hubo respuesta del servidor:", error.request);
        } else {
            console.error("Error en la configuración de la solicitud:", error);
        }
    });
}

function obtenerFacturaCB() {
    // URL del endpoint
    const url = 'https://localhost:44398/api/factura/obtener'

    // Realizar la solicitud GET
    axios.get(url)
    .then(respuesta => {
        console.log(respuesta.data)

        //JQuery

        // Limpiar el contenido actual del div
        $('#verFacturas').empty()

        // Verificar si hay datos
        if (respuesta.data && Object.keys(respuesta.data).length > 0) {
            let facturasHTML = ''

            // Iterar sobre las facturas y generar el contenido HTML
            for(let i = 0; i < Object.keys(respuesta.data).length; i++){
                facturasHTML += `
                    <hr>
                    <div class="factura card mb-3">
                        <h5>Mesa: ${respuesta.data.listaFacturas[i].numeroMesa}</h5>
                        <p><strong>Platos:</strong> ${respuesta.data.listaFacturas[i].platos}</p>
                        <p><strong>Precios:</strong> ${respuesta.data.listaFacturas[i].precios}</p>
                        <p><strong>Total:</strong> ${respuesta.data.listaFacturas[i].total}</p>
                    </div>
                `
            }
            
            // Insertar las facturas generadas en el div
            $('#verFacturas').append(facturasHTML)
        } else {
            // Si no hay facturas, mostrar un mensaje
            $('#verFacturas').html('<p>No hay facturas disponibles.</p>')
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

function facturaActual(mesa, platos, precios, total) {

    // Limpiar el contenido actual del div
    $('#facturaActual').html('');

    // Verificar si hay datos
    let facturasMostrar = '';

    // Generar el contenido HTML con los valores proporcionados
    facturasMostrar += `
        <div class="factura mb-3">
            <h1>Datos de la factura</h1>
            <h5><strong>Mesa:</strong> ${mesa}</h5>
            <p><strong>Platos:</strong> ${platos}</p>
            <p><strong>Precios:</strong> ${precios}</p>
            <p><strong>Total:</strong> ${total}</p>
        </div>
    `;

    // Insertar las facturas generadas en el div
    $('#facturaActual').html(facturasMostrar);
}
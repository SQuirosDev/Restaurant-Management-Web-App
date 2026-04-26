using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace APIReserva.Controllers
{
    public class ReservaController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("insertar")]
        public ResIngresarReserva InsertarReserva(ReqIngresarReserva req)
        {
            return new LogReserva().insertarReserva(req);
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("obtener")]
        public ResObtenerReserva ObtenerReservas()
        {
            return new LogReserva().obtenerReserva(new ReqObtenerReserva());
        }

    }
}
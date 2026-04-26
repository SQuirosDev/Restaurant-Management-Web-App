using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace RestAPI.Controllers
{
    public class FacturaController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/factura/insertar")]
        public ResIngresarFactura InsertarFactura(ReqIngresarFactura req)
        {
            return new LogFactura().insertarFactura(req);
        }
        
        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/factura/obtener")]
        public ResObtenerFactura ObtenerFactura()
        {
            return new LogFactura().obtenerFactura();
        }
        
    }
}
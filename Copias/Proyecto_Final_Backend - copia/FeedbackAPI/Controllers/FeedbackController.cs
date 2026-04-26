using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace FeedbackAPI.Controllers
{
    public class FeedbackController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/publicacion/insertar")]
        public ResIngresarFeedback insertarFeedback(ReqIngresarFeedback req)
        {
            return new LogFeedback().insertarFeedback(req);
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/publicacion/obtener")]
        public ResObtenerFeedBack obtenerFeedback(ReqObtenerFeedBack req)
        {
            return new LogFeedback().obtenerFeedback(req);
        }

    }
}
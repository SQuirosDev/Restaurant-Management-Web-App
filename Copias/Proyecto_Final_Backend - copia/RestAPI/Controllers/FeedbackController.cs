using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace RestAPI.Controllers
{
    public class FeedbackController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/feedback/insertar")]
        public ResIngresarFeedback insertarFeedback(ReqIngresarFeedback req)
        {
            return new LogFeedback().insertarFeedback(req);
        }

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/feedback/obtener")]
        public ResObtenerFeedBack obtenerFeedback()
        {
            return new LogFeedback().obtenerFeedback();
        }
    }
}
using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace RestAPI.Controllers
{
    public class RegistrarseController : ApiController
    {
        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/usuario/registrarse")]
        public ResRegistrarse Registrarse(ReqRegistrarse req)
        {
            return new LogRegistrarse().registrarse(req);
        }
    }
}
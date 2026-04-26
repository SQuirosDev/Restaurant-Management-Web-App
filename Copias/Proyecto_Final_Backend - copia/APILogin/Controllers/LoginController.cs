using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace APILogin.Controllers
{
    public class LoginController : ApiController
    {

        [System.Web.Http.HttpGet]
        [System.Web.Http.Route("api/usuario/iniciarSesion")]
        public ResIniciarSesion IniciarSesion(ReqIniciarSesion req)
        {
            return new LogIniciarSesion().iniciarSesion(req);
        }
    }
}
using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using Proyecto_Final_Backend.Logicas;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Http;

namespace APIRegistro.Controllers
{
    public class RegistrarseController : ApiController
    {

        private string HashPassword(string password)
        {
            using (var sha256 = SHA256.Create())
            {
                var bytes = Encoding.UTF8.GetBytes(password);
                var hash = sha256.ComputeHash(bytes);
                return Convert.ToBase64String(hash);
            }
        }

        [System.Web.Http.HttpPost]
        [System.Web.Http.Route("api/usuario/registrarse")]
        public ResRegistrarse Registrarse(ReqRegistrarse req)
        {
            return new LogRegistrarse().registrarse(req);
        }
    }
}
using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Logicas
{
    public class LogRegistrarse
    {
        public ResRegistrarse registrarse(ReqRegistrarse req)
        {
            ResRegistrarse res = new ResRegistrarse();
            //req.usuario = new Usuario();
            res.listaErrores = new List<string>();
            res.listaDatos = new List<string>();

            bool respuesta = false;

            try
            {
                if (req == null)
                {
                    res.listaErrores.Add("Request vacio, sin informacion");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(req.usuario.nombre))
                {
                    res.listaErrores.Add("Falta el nombre");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(req.usuario.correo))
                {
                    res.listaErrores.Add("Falta el correo");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(req.usuario.contrasena))
                {
                    res.listaErrores.Add("Falta la contraseña");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(req.usuario.rol))
                {
                    res.listaErrores.Add("Falta el rol");
                    respuesta = true;
                }

                if (respuesta)
                {
                    res.resultado = false;
                }
                else
                {
                    res.listaDatos.Add(req.usuario.nombre.ToString());
                    res.listaDatos.Add(req.usuario.correo.ToString());
                    res.listaDatos.Add(req.usuario.contrasena.ToString());
                    res.listaDatos.Add(req.usuario.rol.ToString());

                    conexionDataContext miConexionLinq = new conexionDataContext();
                    miConexionLinq.spRegistrarUsuario(req.usuario.nombre, req.usuario.correo, req.usuario.contrasena, req.usuario.rol); 
                        
                    res.resultado = true; 
                }
            }
            catch (Exception error)
            {
                res.resultado = false;
                res.listaErrores.Add("ERROR GRAVE: Error no controlado");
                res.listaErrores.Add(error.Message);
            }

            return res;

        }
    }
}

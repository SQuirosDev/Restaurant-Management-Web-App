using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Logicas
{
    public class LogIniciarSesion
    {
        public ResIniciarSesion iniciarSesion(ReqIniciarSesion req)
        {
            ResIniciarSesion res = new ResIniciarSesion();
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

                    conexionDataContext miLinq = new conexionDataContext();
                    List<spIniciarSesionResult> listaUsuariosBD = new List<spIniciarSesionResult>();
                    listaUsuariosBD = miLinq.spIniciarSesion().ToList();

                    List<Usuario> listaUsuarios = new List<Usuario>();

                    foreach (spIniciarSesionResult usuarios in listaUsuariosBD)
                    {
                        listaUsuarios.Add(this.factoriaUsuario(usuarios));
                    }


                    foreach (Usuario usuario in listaUsuarios)
                    {
                        if (req.usuario.correo == usuario.correo)
                        {
                            if (req.usuario.contrasena == usuario.contrasena)
                            {
                                res.resultado = true;
                                res.usuario = usuario;
                                break;
                            }
                            else
                            {
                                res.resultado = false;
                                res.listaErrores.Add("Credenciales invalidas");
                                continue;
                            }
                        }
                        else
                        {
                            continue;
                        }
                    }
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

        //La factoriía
        private Usuario factoriaUsuario(spIniciarSesionResult usuario)
        {
            Usuario usuarioRetornar = new Usuario();

            usuarioRetornar.nombre = usuario.nombre;
            usuarioRetornar.correo = usuario.correo;
            usuarioRetornar.contrasena = usuario.contrasena;

            return usuarioRetornar;

        }

    }
}

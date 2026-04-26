using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Logicas
{
    public class LogReserva
    {
        public ResIngresarReserva insertarReserva(ReqIngresarReserva req)
        {
            ResIngresarReserva res = new ResIngresarReserva();
            //req.reserva = new Reserva();
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
                if (string.IsNullOrEmpty(req.reserva.fechaReserva))
                {
                    res.listaErrores.Add("Falta la fecha de reserva");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(Convert.ToString(req.reserva.numeroPersonas)))
                {
                    res.listaErrores.Add("Falta la cantidad de personas de la reserva");
                    respuesta = true;
                }

                if (respuesta)
                {
                    res.resultado = false;
                }
                else
                {
                    res.listaDatos.Add(req.reserva.idCliente.ToString());
                    res.listaDatos.Add(req.reserva.fechaReserva.ToString());
                    res.listaDatos.Add(req.reserva.numeroPersonas.ToString());

                    conexionDataContext miLinq = new conexionDataContext();
                    miLinq.spInsertarReserva(Convert.ToDateTime(req.reserva.fechaReserva), req.reserva.numeroPersonas);

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

        public ResObtenerReserva obtenerReserva()
        {
            ResObtenerReserva res = new ResObtenerReserva();
            res.listaErrores = new List<string>();
            res.listaReservas = new List<Reserva>();

            try
            {
                conexionDataContext miLinq = new conexionDataContext();
                List<spObtenerReservasResult> listaReservasBD = new List<spObtenerReservasResult>();
                listaReservasBD = miLinq.spObtenerReservas().ToList();

                foreach (spObtenerReservasResult reserva in listaReservasBD)
                {
                    res.listaReservas.Add(this.factoriaReservas(reserva));
                }

                res.resultado = true;
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
        private Reserva factoriaReservas(spObtenerReservasResult reserva)
        {
            Reserva reservaRetornar = new Reserva();

            reservaRetornar.fechaReserva = Convert.ToString(reserva.fecha_reserva);
            reservaRetornar.numeroPersonas = reserva.numero_personas;

            return reservaRetornar;
        }
    }
}

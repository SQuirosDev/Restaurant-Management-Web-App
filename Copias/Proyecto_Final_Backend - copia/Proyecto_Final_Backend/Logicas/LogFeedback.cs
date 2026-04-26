using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Logicas
{
    public class LogFeedback
    {
        public ResIngresarFeedback insertarFeedback(ReqIngresarFeedback req)
        {
            ResIngresarFeedback res = new ResIngresarFeedback();
            //req.feedback = new Feedback();
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
                if (String.IsNullOrEmpty(req.feedback.comentario))
                {
                    res.listaErrores.Add("Falta el comentario");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(Convert.ToString(req.feedback.calificacion)))
                {
                    res.listaErrores.Add("Falta la calificacion");
                    respuesta = true;
                }

                if (respuesta)
                {
                    res.resultado = false;
                }
                else
                {
                    res.listaDatos.Add(req.feedback.idUsuario.ToString());
                    res.listaDatos.Add(req.feedback.comentario.ToString());
                    res.listaDatos.Add(req.feedback.calificacion.ToString());

                    conexionDataContext miLinq = new conexionDataContext();
                    miLinq.spInsertarFeedback(req.feedback.comentario, req.feedback.calificacion);

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

        public ResObtenerFeedBack obtenerFeedback()
        {
            ResObtenerFeedBack res = new ResObtenerFeedBack();
            res.listaErrores = new List<string>();
            res.listaFeedBacks = new List<Feedback>();

            try
            {
                conexionDataContext miLinq = new conexionDataContext();
                List<spObtenerFeedbackResult> listaFeedBacksBD = new List<spObtenerFeedbackResult>();
                listaFeedBacksBD = miLinq.spObtenerFeedback().ToList();

                foreach (spObtenerFeedbackResult feedback in listaFeedBacksBD)
                {
                    res.listaFeedBacks.Add(this.factoriaFeedback(feedback));
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
        private Feedback factoriaFeedback(spObtenerFeedbackResult feedback)
        {
            Feedback feedbackRetornar = new Feedback();

            feedbackRetornar.comentario = feedback.comentario;
            feedbackRetornar.calificacion = (int)feedback.calificacion;

            return feedbackRetornar;

        }
    }
}
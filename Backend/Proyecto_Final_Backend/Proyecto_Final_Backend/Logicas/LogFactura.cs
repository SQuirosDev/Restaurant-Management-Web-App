using Proyecto_Final_Backend.AccesoDatos;
using Proyecto_Final_Backend.Entidades;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Schema;

namespace Proyecto_Final_Backend.Logicas
{
    public class LogFactura
    {
        public ResIngresarFactura insertarFactura(ReqIngresarFactura req)
        {
            ResIngresarFactura res = new ResIngresarFactura();
            //req.factura = new Factura();
            req.factura.listaPrecios = new List<int>();
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
                if (string.IsNullOrEmpty(Convert.ToString(req.factura.numeroMesa)))
                {
                    res.listaErrores.Add("Falta el id de la mesa");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(Convert.ToString(req.factura.platos)))
                {
                    res.listaErrores.Add("No hay ningun plato en la lista");
                    respuesta = true;
                }
                if (String.IsNullOrEmpty(Convert.ToString(req.factura.precios)))
                {
                    res.listaErrores.Add("No hay ningun precio en la lista");
                    respuesta = true;
                }
                
                if (respuesta)
                {
                    res.resultado = false;
                }
                else
                {
                    req.factura.total = calculoTotal(req.factura.precios);

                    res.listaDatos.Add(req.factura.idReserva.ToString());
                    res.listaDatos.Add(req.factura.numeroMesa.ToString());
                    res.listaDatos.Add(req.factura.platos);
                    res.listaDatos.Add(req.factura.listaPrecios.ToString());
                    res.listaDatos.Add(req.factura.precios);
                    res.listaDatos.Add(req.factura.total.ToString());

                    conexionDataContext miLinq = new conexionDataContext();
                    miLinq.spInsertarFactura(req.factura.numeroMesa, req.factura.platos, req.factura.precios, req.factura.total);

                    res.resultado = true;
                    res.totalF = req.factura.total;
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
        
        public ResObtenerFactura obtenerFactura()
        {
            ResObtenerFactura res = new ResObtenerFactura();
            res.listaFacturas = new List<Factura>();
            res.listaErrores = new List<string>();

            try
            {
                conexionDataContext miLinq = new conexionDataContext();
                List<spObtenerFacturaResult> listaFacturasBD = new List<spObtenerFacturaResult>();
                listaFacturasBD = miLinq.spObtenerFactura().ToList();

                foreach (spObtenerFacturaResult factura in listaFacturasBD)
                {
                    res.listaFacturas.Add(this.factoriaFactura(factura));
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
        
        // Calculo Total
        private int calculoTotal(string precios)
        {
            int total = 0;
            int impuestos = 0;
            List<int> listaPrecios;

            listaPrecios = precios.Split(',').Select(int.Parse).ToList();

            foreach (int precio in listaPrecios)
            {
                total += precio;
            }

            impuestos = (int)Math.Floor(total * 0.23);

            total += impuestos;

            return total;
        }
        
        //La factoriía
        private Factura factoriaFactura(spObtenerFacturaResult factura)
        {
            Factura facturaRetornar = new Factura();

            facturaRetornar.numeroMesa = factura.numeroMesa;
            facturaRetornar.platos = factura.listaPlatos;
            facturaRetornar.precios = factura.listaPrecios;
            facturaRetornar.total = (int)factura.total;

            return facturaRetornar;

        }
        
    }
}
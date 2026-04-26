using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Entidades
{
    public class Factura
    {
        public int idReserva { get; set; }
        public int numeroMesa { get; set; }
        public string platos { get; set; }
        public List<int> listaPrecios { get; set; }
        public string precios { get; set; }
        public int total { get; set; } 
    }
}

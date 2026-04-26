using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Entidades
{
    public class Reserva
    {
        public int idCliente { get; set; }
        public string fechaReserva { get; set; }
        public int numeroPersonas { get; set; }
    }
}

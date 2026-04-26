using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Entidades
{
    public class Feedback
    {
        public int idUsuario { get; set; }
        public string comentario { get; set; }
        public int calificacion { get; set; }
    }
}

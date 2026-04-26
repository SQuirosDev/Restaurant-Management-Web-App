using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Proyecto_Final_Backend.Entidades
{
    public class ResBase
    {
        public bool resultado { get; set; }
        public List<string> listaErrores { get; set; }
        public List<string> listaDatos { get; set; }
    }
}
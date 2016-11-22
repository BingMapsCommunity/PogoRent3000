using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PogoRent3000.Models
{
    public class WFSArgumentException :ArgumentException
    {
        public string WFSArgumentMessage { get; set; }
    }
}

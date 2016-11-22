using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace PogoRent3000.Controllers
{
    [Route("api/[controller]")]
    public class GeoServiceController : Controller
    {

        // GET: api/values
        [HttpGet]
        public string Get([FromQuery]string service, string version, string request)
        {
            if (service.ToUpper() == "WFS" && version == "1.0.0" && request == "GetFeature")
            {
                var parks = new PogoGeoTools.Parks();
                var json = parks.GetParks();
                return json;
            }
            throw new Models.WFSArgumentException() { WFSArgumentMessage = "missing argument service=WFS, version=1.0.0 or request=GetFeature" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}

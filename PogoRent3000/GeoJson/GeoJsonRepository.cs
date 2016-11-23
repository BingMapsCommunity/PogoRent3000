using NetTopologySuite.Features;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PogoGeoJson
{

    //example implementation
    public class GeoJsonRepository : PogoGeoDS.interfaces.IRepository
    {
        public string Path { get; set; }
        public GeoJsonRepository(string path = "")
        {
            if (!string.IsNullOrEmpty(path))
            {
                Path = path;
            }
        }

        public string GetData()
        {
            var json = GetJson();
            return json;
        }

        string GetJson()
        {
            var data = ReadFile();
            var reader = new NetTopologySuite.IO.GeoJsonReader();
            var feature = reader.Read<FeatureCollection>(data);
               
            var geoJson = GetGeoJsonText(feature);
            return geoJson;
        }

        string ReadFile()
        {
            var text = System.IO.File.ReadAllText(Path);
            return text;
        }

        string GetGeoJsonText(FeatureCollection feature)
        {
            var writer = new NetTopologySuite.IO.GeoJsonWriter();
            string geoJson = writer.Write(feature);
            return geoJson;
        }
    }
}

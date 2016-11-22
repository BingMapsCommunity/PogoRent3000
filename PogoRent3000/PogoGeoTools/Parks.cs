namespace PogoGeoTools
{
    public class Parks 
    {
        PogoGeoJson.GeoJsonRepository geoJsonDS;
        public Parks()
        {
            var location = System.Reflection.Assembly.GetExecutingAssembly().Location;
            var currentDirectory = System.IO.Path.GetDirectoryName(location);
            var path = currentDirectory + @"\..\..\..\..\data\gold-coast.json";
            geoJsonDS = new PogoGeoJson.GeoJsonRepository(path);
        }

        public string GetParks()
        {
            return geoJsonDS.GetData();
        }
        
    }
}

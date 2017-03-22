namespace PogoGeoTools
{
    public class Parks 
    {
        PogoGeoJson.GeoJsonRepository geoJsonDS;
        public Parks(string path)
        {
            //var location = System.Reflection.Assembly.GetExecutingAssembly().Location;
            //var currentDirectory = System.IO.Path.GetDirectoryName(location);
            
            //var path = @"wwwRoot\data\sundsvall.json"; // currentDirectory + @"\..\..\..\..\data\sundsvall.json";
            geoJsonDS = new PogoGeoJson.GeoJsonRepository(path);
        }

        public string GetParks()
        {
            return geoJsonDS.GetData();
        }
        
    }
}

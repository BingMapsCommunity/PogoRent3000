/// <reference path="definitions/microsoft.maps.d.ts" />
/// <reference path="definitions/microsoft.maps.all.d.ts" />
/// <reference path="definitions/modules/geojson.d.ts" />
/// <reference path="definitions/whatwg-fetch.d.ts" />


module PogoRent3000 {
    export class Map {

        private map: Microsoft.Maps.Map;
        private goldCoasLayer: Microsoft.Maps.Layer;

        constructor() {
            this.loadBingMapModules();
            this.initMap();
            this.fetchGeoJson();
        }

        private loadBingMapModules(): void {
            Microsoft.Maps.loadModule("Microsoft.Maps.GeoJson");
        }

        private initMap(): void {
            let mapContainer = document.querySelector("#map") as HTMLDivElement;
            mapContainer.style.width = "98vw";
            mapContainer.style.height = "95vh";
            this.map = new Microsoft.Maps.Map(mapContainer, {
                credentials: 'AsXOzwxphj5MnBu0JvpoF7joDb6BdaAa8NHUjUbHj-S9n-_1DzS3vTHfSVmVyXnn',
                center: new Microsoft.Maps.Location(-28.014407569005286, 153.42029571533203),
                zoom: 10
            });
            this.goldCoasLayer = new Microsoft.Maps.Layer("goldCoast");
            this.map.layers.insert(this.goldCoasLayer);
        }

        private parseGeoJSON(geoJson: JSON): void {
            if (!Microsoft.Maps.GeoJson) {
                setTimeout(() => {
                    this.parseGeoJSON(geoJson);
                }, 100);
            } else {
                let geoJSONtext = JSON.stringify(geoJson);
                let primitives = Microsoft.Maps.GeoJson.read(geoJSONtext) as Array<Microsoft.Maps.IPrimitive>;
                this.goldCoasLayer.add(primitives);
            }
        }
        

        private fetchGeoJson(): void {
            var request = new Request("/api/GeoService/?service=wfs&version=1.0.0&request=GetFeature", {
                method: 'GET', headers: new Headers({ 'Content-Type': 'text/plain' })
            });

            fetch(request).then((response) => {
                return response.json(); // maybe just text ??? 
            }).then((geojson) => {
                this.parseGeoJSON(geojson);
            });
        }
    }
}

document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new PogoRent3000.Map();
}
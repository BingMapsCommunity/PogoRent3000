/// <reference path="definitions/microsoft.maps.d.ts" />
/// <reference path="definitions/microsoft.maps.all.d.ts" />
/// <reference path="definitions/modules/geojson.d.ts" />
/// <reference path="definitions/whatwg-fetch.d.ts" />

namespace PogoRent3000 {
    export class Map {

        private map: Microsoft.Maps.Map;
        private geoJsonLayer: Microsoft.Maps.Layer;

        constructor() {
            this.loadBingMapModules();
            this.initMap();
            this.fetchGeoJson();
            this.attachEvtent();
        }

        private attachEvtent(): void {
            let button = document.querySelector("#disclaimer > button") as HTMLButtonElement;
            button.addEventListener("click", evt => {
                (document.querySelector("#blanket") as HTMLDivElement).style.display = "none";
                let sections = document.querySelectorAll("section");
                for (let i = 0; i < sections.length; i++) {
                    let elem = sections.item(i) as HTMLElement;
                    elem.style.display = "block";
                }
                (document.querySelector("#map") as HTMLDivElement).style.height = "30em";
            });
        }

        private loadBingMapModules(): void {
            Microsoft.Maps.loadModule("Microsoft.Maps.GeoJson");
        }

        private initMap(): void {
            let mapContainer = document.querySelector("#map") as HTMLDivElement;           
            this.map = new Microsoft.Maps.Map(mapContainer, {
                credentials: 'AsXOzwxphj5MnBu0JvpoF7joDb6BdaAa8NHUjUbHj-S9n-_1DzS3vTHfSVmVyXnn',
                center: new Microsoft.Maps.Location(62.39076529972394, 17.301207346598325),
                zoom: 13,
                disableScrollWheelZoom: true,
                disableStreetside: true
            });
            this.geoJsonLayer = new Microsoft.Maps.Layer("goldCoast");
            this.map.layers.insert(this.geoJsonLayer);
        }

        private parseGeoJSON(geoJson: JSON): void {
            if (!Microsoft.Maps.GeoJson) {
                setTimeout(() => {
                    this.parseGeoJSON(geoJson);
                }, 100);
            } else {
                let geoJSONtext = JSON.stringify(geoJson);
                let primitives = Microsoft.Maps.GeoJson.read(geoJSONtext) as Array<Microsoft.Maps.IPrimitive>;
                this.geoJsonLayer.add(primitives);
            }
        }
        

        private fetchGeoJson(): void {
            var request = new Request("/api/GeoService/?service=wfs&version=1.0.0&request=GetFeature", {
                method: 'GET', headers: new Headers({ 'Content-Type': 'text/plain' })
            });

            fetch(request).then((response) => {
                return response.json() as Promise<JSON>; // maybe just text ??? 
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
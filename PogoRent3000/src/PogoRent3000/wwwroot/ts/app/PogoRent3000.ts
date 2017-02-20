/// <reference path="definitions/microsoft.maps.d.ts" />
/// <reference path="definitions/microsoft.maps.all.d.ts" />
/// <reference path="definitions/modules/geojson.d.ts" />
/// <reference path="definitions/whatwg-fetch.d.ts" />


namespace PogoRent3000 {
    export class Map {

        public map: Microsoft.Maps.Map;
        private goldCoasLayer: Microsoft.Maps.Layer;

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
                credentials: '',
                center: new Microsoft.Maps.Location(-28.014407569005286, 153.42029571533203),
                zoom: 10,
                disableScrollWheelZoom: true,
                disableStreetside: true
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
        window["map"] = new PogoRent3000.Map();
}
var PogoRent3000;
(function (PogoRent3000) {
    class Animation {
        static scrollTo(element) {
        }
    }
    PogoRent3000.Animation = Animation;
})(PogoRent3000 || (PogoRent3000 = {}));
/// <reference path="definitions/microsoft.maps.d.ts" />
/// <reference path="definitions/microsoft.maps.all.d.ts" />
/// <reference path="definitions/modules/geojson.d.ts" />
/// <reference path="definitions/whatwg-fetch.d.ts" />
var PogoRent3000;
(function (PogoRent3000) {
    class Map {
        constructor() {
            this.loadBingMapModules();
            this.initMap();
            this.fetchGeoJson();
            this.attachEvtent();
        }
        attachEvtent() {
            let button = document.querySelector("#disclaimer > button");
            button.addEventListener("click", evt => {
                document.querySelector("#blanket").style.display = "none";
                let sections = document.querySelectorAll("section");
                for (let i = 0; i < sections.length; i++) {
                    let elem = sections.item(i);
                    elem.style.display = "block";
                }
                document.querySelector("#map").style.height = "30em";
            });
        }
        loadBingMapModules() {
            Microsoft.Maps.loadModule("Microsoft.Maps.GeoJson");
        }
        initMap() {
            let mapContainer = document.querySelector("#map");
            this.map = new Microsoft.Maps.Map(mapContainer, {
                credentials: '',
                center: new Microsoft.Maps.Location(62.39076529972394, 17.301207346598325),
                zoom: 13,
                disableScrollWheelZoom: true,
                disableStreetside: true
            });
            this.goldCoasLayer = new Microsoft.Maps.Layer("goldCoast");
            this.map.layers.insert(this.goldCoasLayer);
        }
        parseGeoJSON(geoJson) {
            if (!Microsoft.Maps.GeoJson) {
                setTimeout(() => {
                    this.parseGeoJSON(geoJson);
                }, 100);
            }
            else {
                let geoJSONtext = JSON.stringify(geoJson);
                let primitives = Microsoft.Maps.GeoJson.read(geoJSONtext);
                this.goldCoasLayer.add(primitives);
            }
        }
        fetchGeoJson() {
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
    PogoRent3000.Map = Map;
})(PogoRent3000 || (PogoRent3000 = {}));
document.onreadystatechange = () => {
    if (document.readyState === "complete")
        new PogoRent3000.Map();
};
//# sourceMappingURL=pogorent3000.js.map
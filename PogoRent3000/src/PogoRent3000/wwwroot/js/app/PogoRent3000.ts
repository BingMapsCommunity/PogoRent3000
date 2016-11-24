/// <reference path="definitions/microsoft.maps.d.ts" />
/// <reference path="definitions/microsoft.maps.all.d.ts" />
/// <reference path="definitions/modules/geojson.d.ts" />


module PogoRent3000 {
    export class Map {
        private map: Microsoft.Maps.Map;


        constructor() {
            this.initMap();
        }

        private initMap(): void {
            let mapContainer = document.querySelector("map") as HTMLDivElement;
            this.map = new Microsoft.Maps.Map(mapContainer, {
                credentials: 'AsXOzwxphj5MnBu0JvpoF7joDb6BdaAa8NHUjUbHj-S9n-_1DzS3vTHfSVmVyXnn',
                center: new Microsoft.Maps.Location(62.5, 17.2),
                zoom: 10
            });
        }
    }
}
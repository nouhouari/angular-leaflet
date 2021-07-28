import { AfterViewInit, Component } from '@angular/core';

import * as L from 'leaflet';
import * as geojson from 'geojson';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  private map: L.Map;

  ngAfterViewInit(): void {
    this.map = L.map('map', {
      center: L.latLng(43.13, 5.9),
      zoom: 11
    });

    var openStreetLayer = new L.TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      minZoom: 3,
      maxZoom: 18,
      attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> '
    });
    openStreetLayer.addTo(this.map);
    this.addGeoJSonMarker();
    this.addGeoJsonFeatures();
  }

  addGeoJSonMarker() {
    var icon = L.icon({
      iconUrl: 'assets/leaf-red.png',
      shadowUrl: 'assets/leaf-shadow.png',
      iconSize: [38, 95], // size of the icon
      shadowSize: [50, 64], // size of the shadow
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
      shadowAnchor: [4, 62],  // the same for the shadow
      popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    var geojsonPoint: geojson.Point = {
      type: "Point",
      coordinates: [5.9, 43.13],
    };
    var marker = L.geoJSON(geojsonPoint, {
      pointToLayer: (point,latlon)=> {
        return L.marker(latlon, {icon: icon})
      }
    });
    marker.bindPopup("Parceque TOULON !");
    marker.addTo(this.map);
  }

  addGeoJsonFeatures() {
    var geoJsonFeatures: geojson.FeatureCollection = {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {
            "marker-color": "#7e7e7e",
            "marker-size": "medium",
            "marker-symbol": "circle-stroked",
            "population": 123456
          },
          "geometry": {
            "type": "Point",
            "coordinates": [
              6.134490966796874,
              49.61649369617232
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              5.887298583984375,
              49.48240137826932
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              6.179809570312499,
              49.453842594330716
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "LineString",
            "coordinates": [
              [
                5.4107666015625,
                49.586677749628784
              ],
              [
                5.71014404296875,
                49.616048816070425
              ],
              [
                5.78155517578125,
                49.47883244071047
              ],
              [
                5.696411132812499,
                49.37969064441394
              ]
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  5.2789306640625,
                  49.7173764049358
                ],
                [
                  5.295410156249999,
                  49.61070993807422
                ],
                [
                  5.532989501953125,
                  49.63117246129088
                ],
                [
                  5.604400634765625,
                  49.74045665339642
                ],
                [
                  5.601654052734375,
                  49.82558098327032
                ],
                [
                  5.329742431640625,
                  49.82469504231389
                ],
                [
                  5.2789306640625,
                  49.7173764049358
                ]
              ]
            ]
          }
        }
      ]
    };

    L.geoJSON(geoJsonFeatures).addTo(this.map);
  }
}

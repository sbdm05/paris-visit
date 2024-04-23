import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  Platform,
  IonFooter,
  IonAvatar,
} from '@ionic/angular/standalone';
import { MapMainPage } from '../components/map-main/map-main.page';
import * as L from 'leaflet';
import * as O from 'leaflet.offline';
import { ApiCallsService } from '../services/api-calls.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    MapMainPage,
    IonFooter,
    IonAvatar,
  ],
})
export class Tab1Page implements OnInit, OnDestroy {
  map!: L.Map;
  markerLayer = L.layerGroup();
  public mapId: string = 'map-main';
  public datas!: any[];

  wifiSpotsData!: any[];
  toiletsSpotsData!: any[];
  parksSpotsData!: any[];

  // public toiletsDatas!: any[];
  // public squaresDatas!: any[];

  public wifiSpots!: L.LayerGroup<any>;
  public toiletsSpots!: L.LayerGroup<any>;
  public squaresSpots!: L.LayerGroup<any>;

  private layerControl!: L.Control.Layers;

  loading: boolean = true;

  constructor(public plt: Platform, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // if (this.activatedRoute.snapshot.data['wifiSpots']) {
    //   this.wifiSpotsData = this.activatedRoute.snapshot.data['wifiSpots'];
    //   console.log(this.wifiSpotsData, 'wifispotsdata');
    // }

    // if (this.activatedRoute.snapshot.data['toiletsSpots']) {
    //   this.toiletsSpotsData = this.activatedRoute.snapshot.data['toiletsSpots'];
    // }

    // if (this.activatedRoute.snapshot.data['parksSpots']) {
    //   this.parksSpotsData = this.activatedRoute.snapshot.data['parksSpots'];
    //   console.log('Data des parcs :', this.parksSpotsData);
    // }

    this.activatedRoute.data.subscribe(
      (data: { wifiSpots: any; toiletsSpots: any; parksSpots: any }) => {
        this.wifiSpotsData = data.wifiSpots;
        this.toiletsSpotsData = data.toiletsSpots;
        this.parksSpotsData = data.parksSpots;
        this.loading = false; // Marquez le chargement comme terminé une fois que les données sont reçues
      }
    );
  }

  ionViewDidEnter() {
    console.log('reenter');
    if (!this.map) {
      this.plt.ready().then(() => {
        this.initMap();
      });
    }
  }

  public async initMap() {
    console.log('async initMap');

    if (!this.map) {
      console.log('inside ligne 52');

      // map instance
      var maxBounds = L.latLngBounds(
        L.latLng(48.815573, 2.224199), // Coin sud-ouest
        L.latLng(48.902145, 2.469921) // Coin nord-est
      );

      this.map = new L.Map(this.mapId, {
        maxBounds: maxBounds,
        maxBoundsViscosity: 1.0,
      }).setView([48.866667, 2.333333], 13);

      // regular layers
      const baseLayer = await L.tileLayer(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
        }
      );

      const OpenStreetMap_HOT = L.tileLayer(
        'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
        }
      );
      const Thunderforest_OpenCycleMap = L.tileLayer(
        'https://tile.thunderforest.com/cycle/{z}/{x}/{y}.png?apikey=42398343b5b3488a91faf70929d9b883',
        {
          attribution:
            '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',

          maxZoom: 22,
        }
      );

      // const Stadia_OSMBright = L.tileLayer(
      //   'https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}.png',
      //   {
      //     minZoom: 0,
      //     maxZoom: 20,
      //     attribution:
      //       '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      //   }
      // );

      //offline layers
      var offlineLayer = O.tileLayerOffline(
        'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // URL du service de tuiles
        {
          maxZoom: 19,
        }
      );
      offlineLayer.addTo(this.map);

      var baseMaps = {
        OpenStreetMap: baseLayer,
        Light: OpenStreetMap_HOT,
        Bike: Thunderforest_OpenCycleMap,
      };

      this.layerControl = L.control.layers(baseMaps).addTo(this.map);

      // Create a layer group
      this.markerLayer = L.layerGroup().addTo(this.map);

      if (this.wifiSpotsData) {
        this.addWifiMarkers(this.wifiSpotsData);
      }
      if (this.toiletsSpotsData) {
        this.addToiletsMarkers(this.toiletsSpotsData);
      }
      if (this.parksSpotsData) {
        this.addSquaresMarkers(this.parksSpotsData);
      }
    } else {
      console.log('map already exists');
      this.map.remove();
      this.map.off();
    }
  }

  public async addWifiMarkers(datas: any) {
    // itérer dans le tableau et ajouter des markeurs
    //console.log(datas, 'datas dans addmarkers');
    this.wifiSpots = L.layerGroup();

    if (datas) {
      console.log(datas);

      datas.forEach((data: any) => {
        //console.log(data, 'data');

        let marker = L.marker([data.geo_point_2d.lat, data.geo_point_2d.lon]);

        const DIV = `
        <div>
          <h5 style="font-weight: 900; font-size:1.5rem">${data.nom_site}</h5>
          <h6>Address : ${data.arc_adresse} - ${data.cp}</h6>
          <h6>State : ${
            data.etat2 === 'Opérationnel' ? 'Working' : 'Not Working'
          }
          <h6>

        </div>`;
        marker.bindPopup(DIV);

        // Add the marker to the wifiSpots layer group
        this.wifiSpots.addLayer(marker);
      });

      // Initialiser this.layerControl si ce n'est pas déjà fait

      // Ajouter wifiSpots comme couche d'overlay à this.layerControl
      this.layerControl.addOverlay(this.wifiSpots, 'Wifi');
    }
  }

  public async addToiletsMarkers(datas: any) {
    // itérer dans le tableau et ajouter des markeurs
    console.log(datas, 'datas dans addmarkers');
    this.toiletsSpots = L.layerGroup();

    if (datas) {
      console.log(datas);

      datas.forEach((data: any) => {
        console.log(data, 'data');

        let marker = L.marker([data.geo_point_2d.lat, data.geo_point_2d.lon]);

        const DIV = `
        <div>
          <h5 style="font-weight: 900; font-size:1.5rem">${
            data.type === 'SANISETTE' ? 'PUBLIC RESTROOM' : data.type
          }</h5>
          <h6>Address : ${data.adresse} - ${data.arrondissement}</h6>
          <h6>Open : ${data.horaire}
          <h6>

        </div>`;
        marker.bindPopup(DIV);

        // Add the marker to the wifiSpots layer group
        this.toiletsSpots.addLayer(marker);
      });

      // Initialiser this.layerControl si ce n'est pas déjà fait

      // Ajouter wifiSpots comme couche d'overlay à this.layerControl
      this.layerControl.addOverlay(this.toiletsSpots, 'Toilets');
    }
  }

  public async addSquaresMarkers(datas: any) {
    // itérer dans le tableau et ajouter des markeurs
    console.log(datas, 'datas dans addmarkers');
    this.squaresSpots = L.layerGroup();

    if (datas) {
      console.log(datas);

      datas.forEach((data: any) => {
        console.log(data, 'data');

        let marker = L.marker([data.geo_point_2d.lat, data.geo_point_2d.lon]);

        const DIV = `
        <div>
          <h5 style="font-weight: 900; font-size:1.5rem">${data.type}</h5>
          <h6>Address : ${data.adresse} - ${data.arrondissement}</h6>
          <h6>Open : ${data.horaire}
          <h6>

        </div>`;
        marker.bindPopup(DIV);

        // Add the marker to the wifiSpots layer group
        this.squaresSpots.addLayer(marker);
      });

      // Initialiser this.layerControl si ce n'est pas déjà fait

      // Ajouter wifiSpots comme couche d'overlay à this.layerControl
      this.layerControl.addOverlay(this.squaresSpots, 'Parks');
    }
  }

  ngOnDestroy() {
    console.log('depuis ondestroy');

    if (this.map) {
      this.map.remove();
      this.map.off();
    }
  }
}

// OK
// offline => pwa

// TODO
// ajouter les lignes de métro avec les traits
// changer les icônes
// itineraires piétons
// mes itineraires
// locations vélos
// piste cyclable
// les guides touristiques : special emily in paris
// file:///Users/macbookpro/Downloads/plan-de-voirie-pistes-cyclables-et-couloirs-de-bus.geojson
// musées
// https://data.iledefrance.fr/explore/dataset/liste_des_musees_franciliens/api/?disjunctive.region_administrative&disjunctive.departement
// favoris
// est ce que j'ai mes tickets ?
// order your souvenir map ;-)
// receive your trip in a A3 poster
// audio !!! in english / spanish ...

// geolocation for the user

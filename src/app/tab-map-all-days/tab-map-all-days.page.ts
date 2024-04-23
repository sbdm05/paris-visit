import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform, PlatformConfig } from '@ionic/angular';
import { MapMainPage } from '../components/map-main/map-main.page';
import * as L from 'leaflet';
import { ActivatedRoute, Router } from '@angular/router';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-tab-map-all-days',
  templateUrl: './tab-map-all-days.page.html',
  styleUrls: ['./tab-map-all-days.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MapMainPage],
})
export class TabMapAllDaysPage implements OnInit {
  public mapId: string = 'all-day-maps';
  map!: L.Map;
  markerLayer = L.layerGroup();
  private layerControl!: L.Control.Layers;

  customPlans: any[] = [];
  colors = [
    '#FF6B6B', // Soft Red
    '#6B88FF', // Soft Blue
    '#FFD166', // Soft Yellow
    '#4CAF50', // Green
    '#D67FFF', // Lavender
    '#FFB677', // Peach
    '#FF7E67', // Coral
    '#A0D2DB', // Sky Blue
    '#F36F6F', // Salmon Pink
    '#88B1FF', // Periwinkle Blue
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public plt: Platform
  ) {}

  ngOnInit() {
    this.getCustomPlans();
  }

  getCustomPlans() {
    this.customPlans = [];
    console.log('getcustomplans');

    if (this.activatedRoute.snapshot.data['customPlans']) {
      this.customPlans = this.activatedRoute.snapshot.data['customPlans'];
      console.log(this.customPlans);

      if (!this.customPlans) {
        //this.router.navigate(['/']);
        console.log(
          "Aucune donnée trouvée dans le localStorage pour la clé 'custom-data'."
        );
        // Vous pouvez gérer le cas où aucune donnée n'est trouvée dans le localStorage
      }
    } else {
      this.router.navigate(['tabs', 'tab2']);
    }
  }

  ionViewDidEnter() {
    if (!this.map) {
      this.plt.ready().then(() => {
        this.initMapLeaflet();

        //this.initMaplibre();
        //this.setupClickListener();
      });
    }

    this.getCustomPlans();
  }

  public async initMapLeaflet() {
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
      ).addTo(this.map);

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

      // offline layers
      // var offlineLayer = O.tileLayerOffline(
      //   'https://tile.openstreetmap.org/{z}/{x}/{y}.png', // URL du service de tuiles
      //   {
      //     maxZoom: 19,
      //   }
      // );
      // offlineLayer.addTo(this.map);

      var baseMaps = {
        OpenStreetMap: baseLayer,
        Open2: OpenStreetMap_HOT,
        Vélo: Thunderforest_OpenCycleMap,
      };

      this.layerControl = L.control.layers(baseMaps).addTo(this.map);

      // Create a layer group
      this.markerLayer = L.layerGroup().addTo(this.map);

      this.addMarkersByDay(this.customPlans);
      console.log('fonction délcen');

      this.map.off('click');
    } else {
      console.log('map already exists');
      this.map.remove();
      this.map.off();
    }
  }

  public addMarkersByDay(customPlans: Plan[]) {
    // iterer dedans
    this.customPlans.forEach((day, index) => {
      const daynumber = index + 1;
      // pick a color
      const color = this.colors[index];
      // creer un Layer pour les marqueurs
      const newDay = L.layerGroup();

      // Créer une couche pour la polyligne de ce jour
      const polylineLayer = L.layerGroup().addTo(this.map);

      // Stocker les coordonnées des marqueurs pour la polyligne de ce jour
      const latlngs: [number, number][] = [];

      day.plans.forEach((data: any, idx: number) => {
        console.log(data, 'data');

        // const customIcon = L.icon({
        //   iconUrl: '../../assets/icon/map.png',
        //   iconSize: [28, 28], // Adjust size as needed
        //   // iconAnchor: [20, 40], // Adjust anchor point if necessary
        //   className: 'huechange', // Add your custom class here
        // });
        // on crée un marker
        let marker = L.marker([data.center.lat, data.center.lng]);

        marker.addTo(this.markerLayer);

        const DIV = `
        <div style='background: white; padding: 10px; font-size: 0.5rem; border-radius:10px; color: grey'>
          <h5 style="font-weight: 900; font-size:1.5rem">${data.properties.name}</h5>
          <h6>Day ${daynumber} </h6>
        </div>`;
        marker.bindPopup(DIV);

        // Add the marker to the layer group
        newDay.addLayer(marker);

        // Ajouter les coordonnées du marqueur à latlngs
        latlngs.push([data.center.lat, data.center.lng]);
      });
      // Ajouter le marqueur à la polyligne
      const polyline = L.polyline(latlngs, {
        color: `${color}`,
        dashArray: '10,10',
      });
      //Ajouter la polyligne à la couche spécifique du jour
      polyline.addTo(newDay);

      this.layerControl.addOverlay(newDay, ` Day ${daynumber}`);
    });
    //polylineLayer.addTo(this.map);
  }
}

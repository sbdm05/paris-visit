import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCardSubtitle,
  IonCardTitle,
  IonCardHeader,
  IonCard,
  IonCardContent,
  IonIcon,
  IonModal,
  IonButtons,
} from '@ionic/angular/standalone';
import { MapCustomPage } from '../components/map-custom/map-custom.page';
import { Plan } from '../models/plan';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import * as L from 'leaflet';
import * as O from 'leaflet.offline';
import { IconPage } from '../components/icon/icon.page';
import { addIcons } from 'ionicons';
import { trashOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    CommonModule,
    RouterLink,
    IonIcon,
    IonModal,
    IonButtons,
    MapCustomPage,
    IconPage,
  ],
})
export class Tab3Page {
  customPlans: any[] = [];
  isModalOpen = false;
  selectedDay!: Plan | undefined;
  mapId = 'custom-map';
  map!: L.Map;
  markerLayer = L.layerGroup();
  dayToDelete!: Plan;
  private layerControl!: L.Control.Layers;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private localStorageService: LocalStorageService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ trashOutline });
  }

  ngOnInit() {
    if (this.activatedRoute.snapshot.data['customPlans']) {
      this.customPlans = this.activatedRoute.snapshot.data['customPlans'];
      console.log(this.customPlans, 'customPlans');

      if (!this.customPlans) {
        //this.router.navigate(['/']);
        console.log(
          "Aucune donnée trouvée dans le localStorage pour la clé 'custom-data'."
        );
        // Vous pouvez gérer le cas où aucune donnée n'est trouvée dans le localStorage
      }
    } else {
      console.log('no data');
    }
  }

  ionViewDidEnter() {
    if (this.activatedRoute.snapshot.data['customPlans']) {
      this.customPlans = this.activatedRoute.snapshot.data['customPlans'];
      console.log(this.customPlans, 'customPlans');

      if (!this.customPlans) {
        //this.router.navigate(['/']);
        console.log(
          "Aucune donnée trouvée dans le localStorage pour la clé 'custom-data'."
        );
        // Vous pouvez gérer le cas où aucune donnée n'est trouvée dans le localStorage
      }
    } else {
      console.log('no data');
    }
  }

  onDayAdd() {
    const newDay = new Plan();
    this.customPlans = [...this.customPlans, newDay];
    console.log(this.customPlans);
    this.localStorageService.setItem('custom-plans', this.customPlans);
  }

  seeDay(day: Plan) {
    console.log(day);
    this.setOpen(true, day);
  }

  setOpen(value: any, day?: Plan) {
    this.selectedDay = day;
    this.isModalOpen = value;
    //this.initMapLeaflet();
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

      // Ajouter le contrôle de géocodage à la carte
      // var geocoder = (L as any).Control.geocoder({
      //   defaultMarkGeocode: true, // afficher de marqueur pour le résultat du géocodage,
      // }).addTo(this.map);

      // Écouter l'événement markgeocode
      // geocoder.on('markgeocode', function (e: any) {
      //   var latlng = e.geocode.center; // Coordonnées de l'emplacement géocodé
      //   var address = e.geocode.name; // Adresse de l'emplacement géocodé

      //   console.log('Coordonnées:', latlng);
      //   console.log('Adresse:', address);
      // });

      // geocoder.on('markgeocode', function (e: any) {
      //   let results = e.geocode.results; // Résultats du géocodage
      //   console.log(e.geocode.name, 'results');

      //   // Vérifier si les résultats sont disponibles
      //   if (results) {
      //     // Filtrer les résultats pour inclure uniquement ceux de la ville spécifique (par exemple, Paris)
      //     let city = 'Paris'; // Ville spécifique
      //     let filteredResults = results.filter((result: any) => {
      //       return result.address_components.some((component: any) => {
      //         return (
      //           component.types.includes('locality') &&
      //           component.long_name === city
      //         );
      //       });
      //     });

      //     // Vérifier si des résultats filtrés sont disponibles
      //     if (filteredResults.length > 0) {
      //       // Afficher les résultats filtrés dans la console
      //       console.log('Résultats filtrés:', filteredResults);
      //     } else {
      //       console.log('Aucun résultat de géocodage pour la ville spécifiée.');
      //     }
      //   } else {
      //     console.log('Aucun résultat de géocodage disponible.');
      //   }
      // });
      this.map.off('click');
    } else {
      console.log('map already exists');
      this.map.remove();
      this.map.off();
    }
  }

  onDeleteDay(i: Plan) {
    // open modal
    this.dayToDelete = i;
    this.isModalOpen = true;
  }

  onConfirmDelete() {
    // dans custom plans on retrouve le jour
    // on le retire
    // on enregistre le nouveau localstorage
    if (this.dayToDelete) {
      const filteredTab = this.customPlans.filter(
        (i) => i.id != this.dayToDelete.id
      );
      console.log(filteredTab, 'filteredTab');
      this.customPlans = filteredTab;
      this.localStorageService.setItem('custom-plans', filteredTab);
      this.isModalOpen = false;
      this.cdr.detectChanges();
    }
  }

  onCancelDelete() {
    this.isModalOpen = false;
  }
}

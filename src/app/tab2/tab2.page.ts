import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  Platform,
  IonButton,
  IonModal,
  IonButtons,
  IonInput,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/angular/standalone';
import { MapMainPage } from '../components/map-main/map-main.page';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';
import * as L from 'leaflet';
import * as O from 'leaflet.offline';
import { Plan } from '../models/plan';
import { CommonModule } from '@angular/common';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import { FormsModule } from '@angular/forms';
import 'leaflet-control-geocoder';

// use of mapTiler
import '@maptiler/leaflet-maptilersdk';
import { DayManagementPage } from '../components/day-management/day-management.page';
import { IconPage } from '../components/icon/icon.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonButtons,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    ExploreContainerComponent,
    MapMainPage,
    IonModal,
    IonInput,
    FormsModule,
    CommonModule,
    IonGrid,
    IonRow,
    IonCol,
    DayManagementPage,
    IconPage,
  ],
})
export class Tab2Page implements AfterViewInit, OnDestroy {
  public mapId: string = 'custom-map';
  map!: L.Map;
  markerLayer = L.layerGroup();
  private layerControl!: L.Control.Layers;
  public geocodeResults: any[] = [];

  customPlans: any[] = [];

  searchQuery: string = '';

  keyMapTiler = 'kjq8qq7p2RVu3tKHz1KY';

  isModalOpen = false;

  savedItem!: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public plt: Platform,
    private router: Router,
    private localStorageService: LocalStorageService
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

  ngAfterViewInit() {
    // Attachez un écouteur d'événement de clic à l'élément racine du composant
    document.addEventListener('click', this.handleDocumentClick);
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

  // public async initMaplibre() {
  //   // use of mapTiler
  //   // Créer une instance de la carte Maplibre GL

  //   const map = L.map(this.mapId, {
  //     center: L.latLng(49.2125578, 16.62662018),
  //     zoom: 14,
  //   });
  //   // Create a MapTiler Layer inside Leaflet
  //   const mtLayer = new L.tile({
  //     // Get your free API key at https://cloud.maptiler.com
  //     apiKey: this.keyMapTiler,
  //   }).addTo(map);
  // }

  // setOpen(isOpen: boolean) {
  //   this.isModalOpen = isOpen;
  // }

  // public onDayAdd() {
  //   // créer un objet dans le tableau
  //   const day = new Plan();
  //   this.customPlans = [...this.customPlans, day];
  //   this.localStorageService.setItem('custom-plans', this.customPlans);
  // }

  // public onDetailsAdd(i: Plan) {
  //   console.log(i);

  //   this.router.navigate(['tabs', 'day-details', i.id]);
  // }

  searchLocation() {
    console.log('inside searchlocation', this.searchQuery);

    // Create a geocoder control
    var geocoder = (L as any).Control.Geocoder.nominatim();

    geocoder.geocode(this.searchQuery, (results: any) => {
      console.log(results, 'results'); // Affiche l'objet retourné dans la console

      // Stocker les résultats du géocodage dans la variable globale
      this.geocodeResults = results;
    });
  }

  // searchLocation that works() {
  //   console.log('inside searchlocation', this.searchQuery);

  //   // Create a geocoder control
  //   var geocoder = (L as any).Control.Geocoder.nominatim();

  //   geocoder.geocode(this.searchQuery, (results: any) => {
  //     console.log(results, 'results'); // Affiche l'objet retourné dans la console

  //     // Stocker les résultats du géocodage dans la variable globale
  //     this.geocodeResults = results;
  //   });
  // }

  setupClickListener() {
    // Définir un écouteur d'événement sur la carte pour le clic
    this.map.on('click', (e: any) => {
      e.preventDefault();
      // Récupérer les coordonnées du point cliqué
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // Afficher les coordonnées dans la console ou effectuer toute autre action souhaitée
      console.log('Coordonnées du point cliqué :', lat, lng);
      console.log(this.geocodeResults);

      // Vérifier si le tableau de résultats existe et n'est pas vide
      if (this.geocodeResults && this.geocodeResults.length > 0) {
        // Parcourir les résultats pour trouver celui correspondant aux coordonnées du point cliqué
        const clickedResult = this.geocodeResults.find((result: any) => {
          // Comparer les coordonnées
          return result.center.lat === lat && result.center.lng === lng;
        });

        // Vérifier si un résultat correspondant a été trouvé
        if (clickedResult) {
          // Afficher l'objet complet du tableau results correspondant
          console.log('Résultat correspondant trouvé :', clickedResult);
        } else {
          console.log(
            clickedResult,
            'Aucun résultat correspondant trouvé pour les coordonnées du point cliqué.'
          );
        }
      } else {
        console.log(
          'Aucun résultat disponible pour comparer avec les coordonnées du point cliqué.'
        );
      }
    });
  }

  handleResult(item: any) {
    console.log(item.center.lat, item.center.lng);
    const position = new L.LatLng(item.center.lat, item.center.lng);
    const marker = L.marker([item.center.lat, item.center.lng]).addTo(this.map);
    this.map.flyTo(position, 17);

    // Créez un élément div pour le contenu de la popup
    var content = L.DomUtil.create('div', 'content');

    // Ajoutez du contenu au div
    content.innerHTML =
      '<ion-button id="saveButton">Save to itinerary</ion-button>';

    // Créez une popup Leaflet avec le contenu personnalisé
    var popup = L.popup().setContent(content);

    // Ajoutez un écouteur d'événements de clic au bouton dans la popup
    L.DomEvent.addListener(content, 'click', (event) => {
      // Logique à exécuter lors du clic sur le bouton
      console.log(item);
      this.savedItem = item;
      this.isModalOpen = true;
    });

    // Associez la popup au marqueur et ouvrez-la sur la carte
    marker.bindPopup(popup).openPopup();

    marker.off('click');

    // marker.on('click', (e) => {
    //   console.log(item.name);
    //   //marker.openPopup();
    // });
  }

  handleDocumentClick(event: MouseEvent) {
    // Vérifiez si event.target est null et est un élément du DOM (HTMLElement)
    if (event.target instanceof HTMLElement) {
      // Vérifiez si l'élément cliqué est un <li> ou un <a> dans la boîte de recherche
      const closestLi = event.target.closest(
        'ul.leaflet-control-geocoder-alternatives.leaflet-control-geocoder-alternatives-minimized li'
      );
      const closestA = event.target.closest(
        'ul.leaflet-control-geocoder-alternatives.leaflet-control-geocoder-alternatives-minimized li a'
      );

      if (closestLi) {
        // Ajoutez vos styles ou vos interactions pour les balises <li> ici
        console.log('Un <li> a été cliqué');
      } else if (closestA) {
        // Ajoutez vos styles ou vos interactions pour les balises <a> ici
        console.log("Un <a> à l'intérieur d'un <li> a été cliqué");
      }
    }
  }

  setOpen(value: any) {
    this.isModalOpen = value;
  }

  ngOnDestroy() {
    // Nettoyez les écouteurs d'événements lors de la destruction du composant
    document.removeEventListener('click', this.handleDocumentClick);
  }
}

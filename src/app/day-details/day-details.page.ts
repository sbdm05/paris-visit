import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Plan } from '../models/plan';
import { MapMainPage } from '../components/map-main/map-main.page';
import * as L from 'leaflet';
import * as O from 'leaflet.offline';
import 'leaflet-control-geocoder';
import { filter } from 'rxjs';
import { LocalStorageService } from '../services/localStorage/local-storage.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-day-details',
  templateUrl: './day-details.page.html',
  styleUrls: ['./day-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MapMainPage, RouterLink],
})
export class DayDetailsPage implements OnDestroy {
  public title!: string | number;
  public customPlans!: Plan[];
  public idByUrl!: string | null;
  itemById!: Plan | undefined;
  index!: number;
  selectedDayPlans: any[] = [];
  isModalOpen: boolean = false;
  stopToDelete!: L.Marker;
  @ViewChild('content', { static: true }) content!: ElementRef;

  mapId!: string;
  map = undefined as unknown as L.Map;
  private layerControl!: L.Control.Layers;
  private markerLayer = L.layerGroup();
  searchQuery: string = '';

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public plt: Platform,
    private cdr: ChangeDetectorRef,
    private localStorageService: LocalStorageService
  ) {
    this.idByUrl = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.idByUrl, 'idbyurl');
  }

  // retrouver le jour concerné par l'id dans l'url
  ngOnInit() {
    console.log('dans init');

    if (this.map) {
      console.log('map is present');

      this.map.remove();
      this.mapId = '';
      this.map = undefined as unknown as L.Map;
      this.extractIdInfos();
    } else {
      console.log(this.map, 'map is not present');

      this.extractIdInfos();

      console.log(this.mapId);
    }
  }

  forceRender() {
    this.cdr.detectChanges();
  }

  extractIdInfos() {
    console.log('dans extractinfos');

    if (this.activatedRoute.snapshot.data['customPlans']) {
      this.customPlans = this.activatedRoute.snapshot.data['customPlans'];
      console.log(this.customPlans);

      if (!this.customPlans) {
        this.router.navigate(['/']);
        console.log(
          "Aucune donnée trouvée dans le localStorage pour la clé 'custom-data'."
        );

        // Vous pouvez gérer le cas où aucune donnée n'est trouvée dans le localStorage
      } else {
        this.itemById = this.customPlans.find(
          (item: any) => item.id === this.idByUrl
        );

        this.index = this.customPlans.findIndex(
          (item: any) => item.id === this.idByUrl
        );

        this.title = this.index + 1;

        // define a unique mapId
        this.mapId = `custom-map-${this.index}`;
        console.log(this.mapId);

        // Vérifier si l'objet correspondant à l'ID recherché a été trouvé
        if (!this.itemById) {
          console.log("Aucun objet trouvé avec l'ID spécifié.");
          // Vous pouvez gérer le cas où aucun objet correspondant à l'ID recherché n'est trouvé
        }
      }
    } else {
      this.router.navigate(['tabs', 'tab2']);
    }
  }

  ionViewDidEnter() {
    console.log('ion did enter');

    if (this.map) {
      console.log('dans this.map');

      this.map.remove();
      this.mapId = '';
      this.map = undefined as unknown as L.Map;
      this.extractIdInfos();
      this.initMap();
    } else {
      console.log('dans else this.map');
      this.extractIdInfos();

      this.plt.ready().then(() => {
        console.log('test');
        setTimeout(() => {
          this.initMap();
        }, 500);
      });
    }
  }

  public async initMap() {
    console.log('dans initmap');

    if (!this.map) {
      // map instance
      var maxBounds = L.latLngBounds(
        L.latLng(48.815573, 2.224199), // Coin sud-ouest
        L.latLng(48.902145, 2.469921) // Coin nord-est
      );

      if (this.mapId) {
        console.log(this.mapId, 'ca devrait être la carte actuelle'); // ok
        // après j'ai l'erreur Map container is not found

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

        this.addMarkers();
      }
    } else {
      console.log('map already exists');
      this.map.remove();
      this.map.off();
      this.map = undefined as unknown as L.Map;
      //this.initMap();
    }
  }

  public addMarkers() {
    // Stockez les coordonnées des marqueurs dans un tableau
    let markerCoordinates: [number, number][] = [];
    // itérer dans le tableau la propriété plan
    this.itemById?.plans.forEach((marker: any) => {
      console.log(marker);
      markerCoordinates.push([marker.center.lat, marker.center.lng]);
      this.selectedDayPlans.unshift(marker);
      // marker.center.lat
      // marker.center.lng
      let newMarker = L.marker([marker.center.lat, marker.center.lng]);
      newMarker.addTo(this.map);

      const DIV = `
        <div style='background: white; padding: 10px; font-size: 0.5rem; border-radius:10px; color: grey'>
          <h5 style="font-weight: 900; font-size:1.5rem">${marker.properties.name}</h5>

        </div>`;
      newMarker.bindPopup(DIV);
    });

    // if (markerCoordinates.length > 1) {
    //   let polyline = L.polyline(markerCoordinates);
    //   polyline.addTo(this.map);
    // }
  }

  searchLocation() {
    // Create a geocoder control
    var geocoder = (L as any).Control.Geocoder.nominatim();

    // Use the geocoder control to perform geocoding
    geocoder.geocode(this.searchQuery, (results: any) => {
      console.log(results); // Affiche l'objet retourné dans la console
      if (results.length > 0 && results[0].center) {
        const center = results[0].center;

        // Check if latitude and longitude are valid numbers
        if (!isNaN(center.lat) && !isNaN(center.lng)) {
          // Display the result on the map by adding a marker
          L.marker([center.lat, center.lng]).addTo(this.map);
          // Optionally, you can also center the map on the location
          this.map.setView([center.lat, center.lng], 13);
        } else {
          console.log(
            'Invalid latitude or longitude values:',
            center.lat,
            center.lng
          );
        }
      } else {
        console.log('No results found or center property undefined');
      }
    });
  }

  setupClickListener() {
    // Définir un écouteur d'événement sur la carte pour le clic
    this.map.on('click', (e: any) => {
      // Récupérer les coordonnées du point cliqué
      const lat = e.latlng.lat;
      const lng = e.latlng.lng;

      // Afficher les coordonnées dans la console ou effectuer toute autre action souhaitée
      console.log('Coordonnées du point cliqué :', lat, lng);
      // Ajoutez un marqueur à la position spécifiée sur la carte
      const marker = L.marker([lat, lng]);
      // Définissez le contenu de la boîte contextuelle
      marker.bindPopup('Contenu de la boîte contextuelle');
    });
  }

  ionViewDidLeave() {
    console.log('depuis ionDidLeave');

    if (this.map) {
      this.map.remove();
      this.mapId = '';
      this.map = undefined as unknown as L.Map;
    } else {
      console.log(this.map, 'dans else iondidleave');
      this.map = undefined as unknown as L.Map;
    }
  }

  generateEncodedURL(name: any): string {
    const encodedLocationName = encodeURIComponent(name);
    return `https://www.tiqets.com/fr/search?q=${encodedLocationName} Paris`;
  }

  onDelete(i: any) {
    console.log(i);
    this.stopToDelete = i; // ceci est le stop
    this.isModalOpen = true;
  }

  onConfirmDelete() {
    // dans custom plans on retrouve le jour
    // on le retire
    // on enregistre le nouveau localstorage
    if (this.stopToDelete) {
      const filteredTab = this.selectedDayPlans.filter(
        (i) => i !== this.stopToDelete
      );
      console.log(filteredTab, 'filteredTab'); // new Plan
      //this.selectedDayPlans = filteredTab;
      this.selectedDayPlans = [];
      this.selectedDayPlans = filteredTab;
      this.cdr.detectChanges();

      //console.log(this.index);
      console.log(this.selectedDayPlans, 'nouveau plan du jour'); // plans

      this.customPlans[this.index].plans = this.selectedDayPlans;
      // console.log(this.customPlans);

      this.itemById = this.customPlans[this.index];

      this.localStorageService.setItem('custom-plans', this.customPlans);
      // mettre à jour le localStorage

      this.onRefreshMarker();
    }

    this.isModalOpen = false;
    //   this.cdr.detectChanges();
    // }
  }

  onCancelDelete() {
    this.isModalOpen = false;
  }

  onRefreshMarker() {
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });
    this.cdr.detectChanges();
    //this.addMarkers();

    // Stockez les coordonnées des marqueurs dans un tableau
    let markerCoordinates: [number, number][] = [];
    // itérer dans le tableau la propriété plan
    this.itemById?.plans.forEach((marker: any) => {
      console.log(marker);
      markerCoordinates.push([marker.center.lat, marker.center.lng]);

      // marker.center.lat
      // marker.center.lng
      let newMarker = L.marker([marker.center.lat, marker.center.lng]);
      newMarker.addTo(this.map);
    });

    // if (markerCoordinates.length > 1) {
    //   let polyline = L.polyline(markerCoordinates);
    //   polyline.addTo(this.map);
    // }
  }

  onGetSouvenir(day: any) {
    console.log(day, 'day');
    this.generateImage();
  }

  generateImage() {
    console.log(this.content);

    const content = this.content.nativeElement;

    html2canvas(content).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      this.downloadImage(imgData);
    });
  }

  downloadImage(dataUrl: string) {
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'image.png';
    link.click();
  }

  generatePDF(data: any[]) {
    const doc = new jsPDF('p', 'mm', 'a4');

    let posY = 20;
    let pageHeight = doc.internal.pageSize.height;

    // Increase interline spacing (line height)
    const lineHeight = 10;

    data.forEach((item, index) => {
      const { lat, lng } = item.center;

      let text = `${index + 1}. Name: ${
        item.name
      }, Latitude: ${lat}, Longitude: ${lng}`;
      let textLines = doc.splitTextToSize(
        text,
        doc.internal.pageSize.width - 40
      ); // Adjust width as needed

      let textHeight = doc.getTextDimensions(textLines[0]).h;

      if (posY + textHeight > pageHeight - 20) {
        doc.addPage();
        posY = 20;
      }

      // Set line height (interline spacing) by adjusting font size
      doc.setFontSize(lineHeight);
      doc.text(textLines, 20, posY);

      posY += textHeight + 5 + lineHeight; // Add interline spacing
    });

    doc.save('liste.pdf');

    window.open('https://parisvisit.fr/boutique/', '_blank');
  }

  ngOnDestroy() {
    console.log('déclenché depuis ngOndestory');

    if (this.map) {
      this.map.remove();
      this.mapId = '';
      this.map = undefined as unknown as L.Map;
      this.forceRender();
    } else {
      console.log(this.map, 'dans else ondestrpy');
      this.map = undefined as unknown as L.Map;
      this.forceRender();
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { Plan } from 'src/app/models/plan';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-custom',
  templateUrl: './map-custom.page.html',
  styleUrls: ['./map-custom.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MapCustomPage {
  @Input() mapId!: string;
  @Input() selectedDay!: Plan | undefined;
  map!: L.Map | null;
  markerLayer = L.layerGroup();
  private layerControl!: L.Control.Layers;

  constructor(public plt: Platform, public router: Router) {}
}

import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import * as L from 'leaflet';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-map-main',
  templateUrl: './map-main.page.html',
  styleUrls: ['./map-main.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule],
})
export class MapMainPage {
  @Input() mapId!: string | null;
  @Input() mapSize!: number | null;

  constructor(public plt: Platform, public router: Router) {}
}

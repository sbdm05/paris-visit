import { CommonModule } from '@angular/common';
import { Component, EnvironmentInjector, inject } from '@angular/core';
import {
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  triangle,
  ellipse,
  square,
  mapOutline,
  locationOutline,
  searchOutline,
  ticketOutline,
  removeCircle,
  helpOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: true,
  imports: [
    IonTabs,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
    IonAvatar,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    CommonModule,
  ],
})
export class TabsPage {
  isWelcomeVisible = true;
  public environmentInjector = inject(EnvironmentInjector);

  constructor() {
    addIcons({
      triangle,
      ellipse,
      square,
      mapOutline,
      locationOutline,
      searchOutline,
      ticketOutline,
      removeCircle,
      helpOutline,
    });
  }

  onDeleteWelcome() {
    this.isWelcomeVisible = false;
  }
}

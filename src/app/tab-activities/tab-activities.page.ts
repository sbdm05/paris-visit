import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab-activities',
  templateUrl: './tab-activities.page.html',
  styleUrls: ['./tab-activities.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class TabActivitiesPage {
  featuredGuide$!: Observable<any>;
  constructor(private wordpressService: WordpressService) {
    this.featuredGuide$ = this.wordpressService.getFeaturedGuide();
  }
}

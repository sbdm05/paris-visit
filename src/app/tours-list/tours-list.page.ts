import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';
import { Observable } from 'rxjs';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterLink,
} from '@angular/router';

@Component({
  selector: 'app-tours-list',
  templateUrl: './tours-list.page.html',
  styleUrls: ['./tours-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class ToursListPage implements OnInit {
  list$!: Observable<any>;
  constructor(private wordpressService: WordpressService) {
    this.list$ = this.wordpressService.getGuidesList();
  }

  ngOnInit() {}
}

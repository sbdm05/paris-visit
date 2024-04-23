import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';
import { Observable } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-museums',
  templateUrl: './museums.page.html',
  styleUrls: ['./museums.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class MuseumsPage implements OnInit {
  list$!: Observable<any>;
  constructor(private wordpressService: WordpressService) {
    this.list$ = this.wordpressService.getMuseumsList();
  }

  ngOnInit() {}
}

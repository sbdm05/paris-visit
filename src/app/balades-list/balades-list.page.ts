import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Observable } from 'rxjs';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-balades-list',
  templateUrl: './balades-list.page.html',
  styleUrls: ['./balades-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class BaladesListPage implements OnInit {
  list$!: Observable<any>;
  constructor(private wordpressService: WordpressService) {
    this.list$ = this.wordpressService.getBaladesList();
  }

  ngOnInit() {}
}

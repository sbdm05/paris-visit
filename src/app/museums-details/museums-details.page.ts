import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';

@Component({
  selector: 'app-museums-details',
  templateUrl: './museums-details.page.html',
  styleUrls: ['./museums-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MuseumsDetailsPage implements OnInit {
  public item!: any;
  public title: string = 'Museum';
  constructor(
    private activatedRoute: ActivatedRoute,
    private wordpressService: WordpressService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      console.log(id); // number
      // requete
      this.wordpressService.getMuseumFromCache(id).subscribe((res: any) => {
        console.log(res);
        this.item = res;
      });
    });
  }

  ngOnInit() {
    // this.wordpressService.getMuseumFromCache(44).subscribe((res: any) => {
    //   console.log('Museum from cache:', res);
    // });
  }
}

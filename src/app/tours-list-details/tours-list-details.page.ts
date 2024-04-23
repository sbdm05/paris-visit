import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';

@Component({
  selector: 'app-tours-list-details',
  templateUrl: './tours-list-details.page.html',
  styleUrls: ['./tours-list-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ToursListDetailsPage implements OnInit {
  public item!: any;
  public title: string = 'Guided';
  constructor(
    private activatedRoute: ActivatedRoute,
    private wordpressService: WordpressService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      console.log(typeof id); // number
      // requete
      this.wordpressService.getItemById(id).subscribe((res) => {
        console.log(res);
        this.item = res;
        // this.title = res.title.rendered;
      });
    });
  }

  ngOnInit() {}
}

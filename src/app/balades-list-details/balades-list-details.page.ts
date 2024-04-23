import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';

@Component({
  selector: 'app-balades-list-details',
  templateUrl: './balades-list-details.page.html',
  styleUrls: ['./balades-list-details.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class BaladesListDetailsPage implements OnInit {
  public item!: any;
  public title: string = 'Ballade';
  constructor(
    private activatedRoute: ActivatedRoute,
    private wordpressService: WordpressService
  ) {
    this.activatedRoute.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      console.log(typeof id); // number
      // requete
      this.wordpressService.getBaladeById(id).subscribe((res) => {
        console.log(res);
        this.item = res;
        // this.title = res.title.rendered;
      });
    });
  }

  ngOnInit() {}
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class AgendaPage implements OnInit {
  public activities!: any[];
  filteredEvents: any[] = []; // Liste filtrée d'événements à afficher
  selectedTag: string = ''; // Tag sélectionné
  uniqueTags: string[] = []; // Liste des tags uniques

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.data['activities']) {
      this.activities = this.activatedRoute.snapshot.data['activities'];
      console.log(this.activities, 'activities');

      if (!this.activities) {
        //this.router.navigate(['/']);
        console.log(
          "Aucune donnée trouvée dans le localStorage pour la clé 'custom-data'."
        );
        // Vous pouvez gérer le cas où aucune donnée n'est trouvée dans le localStorage
      }
    } else {
      console.log('no data');
    }

    this.extractUniqueTags();
  }

  // Extraire tous les tags uniques des événements
  extractUniqueTags() {
    const allTags = this.activities.reduce(
      (acc, event) => acc.concat(event.tags),
      []
    );
    this.uniqueTags = Array.from(new Set(allTags));
  }

  // Filtrer les événements en fonction du tag sélectionné
  filterEventsByTag() {
    if (this.selectedTag) {
      this.filteredEvents = this.activities.filter((event) =>
        event.tags.includes(this.selectedTag)
      );
    } else {
      this.filteredEvents = this.activities;
    }
  }
}

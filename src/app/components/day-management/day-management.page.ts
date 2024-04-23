import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Plan } from 'src/app/models/plan';
import { LocalStorageService } from 'src/app/services/localStorage/local-storage.service';

@Component({
  selector: 'app-day-management',
  templateUrl: './day-management.page.html',
  styleUrls: ['./day-management.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class DayManagementPage implements OnInit {
  @Input() selectedDestination!: any;
  @Input() customPlans!: Plan[];
  public selectedDay!: number;
  errorMessage!: string;
  isToastOpen: boolean = false;
  title: string = 'Choose a day';
  colorToast!: string;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit() {
    console.log(this.selectedDestination);
    console.log(this.customPlans);
  }

  pickADay(event: Event) {
    // console.log(obj);

    //console.log(event);
    const target = event.target as HTMLSelectElement;
    //console.log(target);
    const selectedDay = target.value;
    console.log(selectedDay);
    this.selectedDay = Number(selectedDay.split(' ')[1]); // Découpe la chaîne par l'espace et récupère le deuxième élément (le chiffre)
    console.log(this.selectedDay); // Affiche le chiffre extrait
  }

  onAdd() {
    this.isToastOpen = false;
    // ici on veut ajouter this.selectedDestination dans l'objet à l'index daynumber dans this.customPlans en vérifiant tout d'abord qu'il n'existe pas déjà

    // on retrouve l'index de l'ojet concerné
    const retrievedIndex = this.selectedDay - 1;

    // retrouver l'objet concerné avec l'index stocké dans dayNumber
    const existingDay = this.customPlans[retrievedIndex];

    console.log(existingDay); // ok

    // dans existingDay, on récupère le tableau de plan
    let plans = existingDay.plans;

    console.log(typeof plans); // ok se met à jour

    // Ajoutez selectedDestination à plans si elle n'est pas déjà présente

    const existingPlan = plans.find((plan: any) => {
      return (
        plan.properties.place_id ===
        this.selectedDestination.properties.place_id
      );
    });

    if (!existingPlan) {
      // Ajoutez selectedDestination à plans si elle n'est pas déjà présente
      plans.push(this.selectedDestination);
      console.log('Destination ajoutée avec succès à la journée:', existingDay);
      this.errorMessage = `Destination added with success to Day ${this.selectedDay}`;
      this.isToastOpen = true;
      this.colorToast = 'success';

      // Mettre à jour customPlans dans le stockage local avec la nouvelle valeur
      this.localStorageService.setItem('custom-plans', this.customPlans);
      console.log('customPlans mis à jour dans le stockage local.');
      // Mettre à jour existingDay dans customPlans après avoir ajouté la destination aux plans
      this.customPlans[retrievedIndex] = existingDay;
    } else {
      this.errorMessage = `Destination already present in Day ${this.selectedDay}`;
      this.colorToast = 'warning';
      this.isToastOpen = true;
      console.log('La destination est déjà présente dans cette journée.');
    }
  }

  setOpen(value: any) {
    this.isToastOpen = value;
  }
}

import { Routes } from '@angular/router';
import { ActivitiesResolver } from '../resolvers/activities.resolver';
import { BaladesResolver } from '../resolvers/balades.resolver';
import { LocalStorageCustomPlansResolver } from '../resolvers/local-storage-custom-plans.resolver';
import { MuseesResolver } from '../resolvers/musees.resolver';
import { ParksSpotsResolver } from '../resolvers/parks-spots.resolver';
import { ToiletsSpotsResolver } from '../resolvers/toilets-spots.resolver';
import { WifiSpotsResolver } from '../resolvers/wifi-spots.resolver';

import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'tab1',
        resolve: {
          wifiSpots: WifiSpotsResolver,
          toiletsSpots: ToiletsSpotsResolver,
          parksSpots: ParksSpotsResolver,
          baladesSpots: BaladesResolver,
          museesSpots: MuseesResolver,
        },
        loadComponent: () =>
          import('../tab1/tab1.page').then((m) => m.Tab1Page),
      },
      {
        path: 'tab2',
        resolve: {
          customPlans: LocalStorageCustomPlansResolver,
        },
        loadComponent: () =>
          import('../tab2/tab2.page').then((m) => m.Tab2Page),
      },
      {
        path: 'tab3',
        resolve: {
          customPlans: LocalStorageCustomPlansResolver,
        },
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
      },
      {
        path: 'day-details/:id',
        resolve: {
          customPlans: LocalStorageCustomPlansResolver,
        },
        loadComponent: () =>
          import('../day-details/day-details.page').then(
            (m) => m.DayDetailsPage
          ),
      },
      {
        path: 'tab-map-all-days',
        resolve: {
          customPlans: LocalStorageCustomPlansResolver,
        },
        loadComponent: () =>
          import('../tab-map-all-days/tab-map-all-days.page').then(
            (m) => m.TabMapAllDaysPage
          ),
      },
      {
        path: 'tab-activities',

        loadComponent: () =>
          import('../tab-activities/tab-activities.page').then(
            (m) => m.TabActivitiesPage
          ),
      },
      {
        path: 'agenda',
        resolve: {
          activities: ActivitiesResolver,
        },
        loadComponent: () =>
          import('../agenda/agenda.page').then((m) => m.AgendaPage),
      },

      {
        path: 'tours-list',
        loadComponent: () =>
          import('../tours-list/tours-list.page').then((m) => m.ToursListPage),
      },

      {
        path: 'tours-list-details/:id',
        loadComponent: () =>
          import('../tours-list-details/tours-list-details.page').then(
            (m) => m.ToursListDetailsPage
          ),
      },

      {
        path: 'museums-list',
        loadComponent: () =>
          import('../museums/museums.page').then((m) => m.MuseumsPage),
      },

      {
        path: 'museums-details/:id',
        loadComponent: () =>
          import('../museums-details/museums-details.page').then(
            (m) => m.MuseumsDetailsPage
          ),
      },

      {
        path: 'balades-list',
        loadComponent: () =>
          import('../balades-list/balades-list.page').then(
            (m) => m.BaladesListPage
          ),
      },
      {
        path: 'balades-list-details/:id',
        loadComponent: () =>
          import('../balades-list-details/balades-list-details.page').then(
            (m) => m.BaladesListDetailsPage
          ),
      },
      {
        path: '',
        redirectTo: '/tabs/tab1',
        pathMatch: 'full',
      },
    ],
  },

  {
    path: '',
    redirectTo: '/tabs/tab1',
    pathMatch: 'full',
  },
  // {
  //   path: 'day-details',
  //   loadComponent: () =>
  //     import('../day-details/day-details.page').then((m) => m.DayDetailsPage),
  // },
];

// besoin d'ajouter des resolvers sur tab1
// loader
// sinon, besoin d'aller sur la page au moins une fois et ce n'est pas ce qu'on veut

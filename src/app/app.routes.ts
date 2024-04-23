import { Routes } from '@angular/router';
import { LocalStorageCustomPlansResolver } from './resolvers/local-storage-custom-plans.resolver';
import { WifiSpotsResolver } from './resolvers/wifi-spots.resolver';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'day-management',
    loadComponent: () =>
      import('./components/day-management/day-management.page').then(
        (m) => m.DayManagementPage
      ),
  },
  {
    path: 'map-custom',
    loadComponent: () =>
      import('./components/map-custom/map-custom.page').then(
        (m) => m.MapCustomPage
      ),
  },
];

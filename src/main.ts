import { enableProdMode, isDevMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter } from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideHttpClient(),
    provideIonicAngular(),
    provideRouter(routes),
    provideServiceWorker('ngsw-worker.js', {
      enabled: true, // Activer le service worker en mode développement
      registrationStrategy: 'registerWhenStable:30000', // Enregistrement immédiat du service worker
    }),
  ],
});

if (environment.production) {
  console.log('Running in production mode');
} else {
  console.log('Running in development mode');
}
//enabled: !isDevMode(),

/**


provideServiceWorker('ngsw-worker.js', {
      enabled: true, // Activer le service worker en mode développement
      registrationStrategy: 'registerImmediately', // Enregistrement immédiat du service worker

    })


 */

/*

    A UTILISER POUR PRODUCTION

       provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
    }),


    */
// caches.keys().then(function (keyList) {
//   // faire quelque-chose avec votre keylist
//   console.log(keyList);
// });

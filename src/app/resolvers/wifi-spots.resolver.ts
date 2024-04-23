import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { ApiCallsService } from '../services/api-calls.service';

@Injectable({
  providedIn: 'root',
})
export class WifiSpotsResolver implements Resolve<any[]> {
  constructor(private wifiService: ApiCallsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any[]> {
    // Appel API pour charger les données des spots WiFi
    return this.wifiService.getWifiSpots().pipe(
      tap((data) => console.log(data, 'Données des spots WiFi récupérées')) // 277 entrées
    );
  }
}

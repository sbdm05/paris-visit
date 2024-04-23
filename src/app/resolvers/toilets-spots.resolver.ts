import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiCallsService } from '../services/api-calls.service';

@Injectable({
  providedIn: 'root',
})
export class ToiletsSpotsResolver implements Resolve<boolean> {
  constructor(private wifiService: ApiCallsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Appel API pour charger les données des spots WiFi
    return this.wifiService.getToiletsSpots();
  }
}

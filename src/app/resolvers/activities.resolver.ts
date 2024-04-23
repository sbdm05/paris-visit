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
export class ActivitiesResolver implements Resolve<boolean> {
  constructor(private activitiesService: ApiCallsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Appel API pour charger les données activties
    console.log('depuis resolver');

    return this.activitiesService.getActivities();
  }
}

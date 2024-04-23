import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LocalStorageService } from '../services/localStorage/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageCustomPlansResolver implements Resolve<boolean> {
  constructor(private localStorageService: LocalStorageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Appel API pour charger les données des spots WiFi
    console.log('from resolver');

    return this.localStorageService.getItem('custom-plans');
  }
}

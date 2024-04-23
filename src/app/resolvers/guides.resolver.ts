import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { WordpressService } from '../services/wordpress-calls/wordpress.service';

@Injectable({
  providedIn: 'root',
})
export class GuidesResolver implements Resolve<boolean> {
  constructor(private wordpressService: WordpressService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    console.log('depuis guides resolver');

    return this.wordpressService.getGuidesList();
  }
}

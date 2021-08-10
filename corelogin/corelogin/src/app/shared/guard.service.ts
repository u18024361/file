import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class GuardService  implements CanActivate {

  constructor(private Service: ServiceService, private _router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) { 
    if (this.Service.isUserAuthenticated()) {
      return true;
    }
    this._router.navigate(['/Login'], { queryParams: { returnUrl: state.url }});
    return false;
  }

}

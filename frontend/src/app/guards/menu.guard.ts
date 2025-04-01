import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuComponentGuard implements CanActivate {
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // Exemple : interdire sur /login et /register
    const forbiddenRoutes = ['/auth', '/forgotpassword', '/resetpassword'];

    return !forbiddenRoutes.includes(state.url);
  }
}

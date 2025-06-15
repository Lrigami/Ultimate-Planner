import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MenuComponentGuard implements CanActivate {
  constructor() { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    // prevent menu component from appearing on the following routes:
    const forbiddenRoutes = ['/auth', '/forgotpassword', '/resetpassword/'];

    return !forbiddenRoutes.some(path => state.url.startsWith(path));
  }
}

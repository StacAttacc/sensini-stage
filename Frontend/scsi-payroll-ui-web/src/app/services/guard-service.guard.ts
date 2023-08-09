import { Injectable, Injector } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './core/auth.service'; // Adjust the path to your AuthService

@Injectable({
  providedIn: 'root',
})
export class AuthGuard {
  constructor(private injector: Injector/*, public authService: AuthService*/) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const authService = this.injector.get(AuthService);
    if (authService && authService.getToken()) {
      return true;
    }
    authService.GoogleAuth();
    return false;
  }
}

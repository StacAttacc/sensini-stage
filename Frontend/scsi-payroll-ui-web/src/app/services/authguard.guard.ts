import { CanActivateFn } from '@angular/router';
import { AuthService } from './core/auth.service';
import { Injector } from '@angular/core';

export const authguardGuard: CanActivateFn = (route, state) => {
  const injector = route.routeConfig?.data?.['injector'] as Injector;
  if (!injector){
    return false;
  }

  const authService = injector.get(AuthService);
  if (!authService || !authService.getToken){
    return false;
  }
  else{
    return true;
  }
};


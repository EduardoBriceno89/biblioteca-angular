import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { ApiService } from '../servicios/api.service';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const router = inject(Router);

  if (apiService.loggedIn()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};

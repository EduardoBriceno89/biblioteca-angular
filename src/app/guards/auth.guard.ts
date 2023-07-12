import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  const token = cookie.get('token') as string;
  const tokenDecoded = jwt_decode(token) as { role: string };
  const userRole = tokenDecoded.role;

  //si no es admin, redirige a la ruta panel
  if (userRole == 'admin') {
    return true;
  } else {
    router.navigate(['/panel']);
    return false;
  }
};

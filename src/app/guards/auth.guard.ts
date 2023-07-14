import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import jwt_decode from 'jwt-decode';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const cookie = inject(CookieService);
  const snackBar = inject(MatSnackBar);
  const token = cookie.get('token');

  if (!token) {
    router.navigate(['/login']);
    snackBar.open('Debes iniciar sesión para acceder', 'Cerrar', {
      duration: 3000,
    });
    return false;
  }

  let userRole: string;

  try {
    const tokenDecoded = jwt_decode(token) as { role: string };
    userRole = tokenDecoded.role;
  } catch (error) {
    router.navigate(['/login']);
    return false;
  }

  if (userRole == 'admin') {
    return true;
  } else if (userRole == 'user' && state.url != '/panel') {
    router.navigate(['/panel']);
    return false;
  }

  return true;
};

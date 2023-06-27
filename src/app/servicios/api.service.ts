import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService
  ) {}

  apiURL = 'http://localhost:3000/api/v1/';

  //login endpoint
  login(matricula: string, password: string) {
    const data = { matricula, password };
    return this.http.post(`${this.apiURL}users/login`, data).subscribe(
      (res: any) => {
        const expirationDate = new Date();
        expirationDate.setHours(expirationDate.getHours() + 1); // la cookie del token expira en 1 hora
        this.cookieService.set(
          'token',
          res.token,
          expirationDate,
          '/',
          'localhost',
          true,
          'Strict'
        );

        this.router.navigate(['/panel']);
      },
      (error) => {
        console.error('Ocurrio un error al iniciar sesion', error);
      }
    );
  }

  //is logged in?
  loggedIn() {
    return !!this.cookieService.get('token');
  }

  //logout
  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  //files
  getFiles(): Observable<any> {
    return this.http.get(`${this.apiURL}files/get-files`);
  }
}

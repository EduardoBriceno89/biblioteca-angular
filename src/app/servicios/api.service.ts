import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService,
    private snackBar: MatSnackBar
  ) {}

  apiURL = 'http://localhost:3000/api/v1/';
  private isAdmin: boolean = false;

  //login endpoint
  login(matricula: string, password: string) {
    const data = { matricula, password };
    return this.http.post(`${this.apiURL}users/login`, data).subscribe(
      (res: any) => {
        this.cookieService.set('token', res.token);
        this.router.navigate(['/panel']);
        this.isAdmin = res.user.role == 'admin';
        this.cookieService.set('isAdmin', this.isAdmin.toString());
      },
      (error) => {
        const errorMessage = error.error.error;
        this.snackBar.open(errorMessage, 'Cerrar', {
          duration: 3000,
        });
      }
    );
  }

  getAdminStatus() {
    return this.isAdmin;
  }

  // //is logged in?
  // loggedIn() {
  //   return !!this.cookieService.get('token');
  // }

  //logout
  logout() {
    this.cookieService.delete('token');
    this.router.navigate(['/login']);
  }

  //admin crud for users

  addUser(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}users/register`, data);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiURL}users/get-users`);
  }

  updateUser(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}users/edit/${id}`, data);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}users/delete/${id}`);
  }

  //admin crud for files

  addFile(data: any): Observable<any> {
    return this.http.post(`${this.apiURL}files/create-file`, data);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${this.apiURL}files/get-files`);
  }

  updateFile(id: string, data: any): Observable<any> {
    return this.http.put(`${this.apiURL}files/edit-file/${id}`, data);
  }

  deleteFile(id: string): Observable<any> {
    return this.http.delete(`${this.apiURL}files/delete-file/${id}`);
  }
}

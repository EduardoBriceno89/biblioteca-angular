import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { ApiService } from './api.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private cookieService: CookieService,
    private apiService: ApiService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.cookieService.get('token');

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.apiService.Logout();
        }
        throw error;
      })
    );
  }
}

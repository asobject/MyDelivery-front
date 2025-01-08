import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../_services/auth/auth.service';
import { StorageService } from '../_services/storage/storage.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private storageService:StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Запрос обновления токенов
          return this.authService.refreshAccessToken().pipe(
            switchMap((response: any) => {
              this.storageService.setAccessToken(response.accessToken);

              // Повтор оригинального запроса
              const clonedRequest = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${response.accessToken}`),
              });

              return next.handle(clonedRequest);
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}

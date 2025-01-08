import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth/auth.service';
import { StorageService } from '../_services/storage/storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService,private storageService:StorageService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.storageService.getAccessToken();

    if (accessToken) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }
}

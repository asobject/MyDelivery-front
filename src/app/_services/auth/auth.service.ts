import { Injectable,OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable,interval,Subject,takeUntil } from 'rxjs';

import { environment } from '../../../environments/environment';
import { JwtService } from '../jwt.service';
import { StorageService } from '../storage/storage.service';


@Injectable({
  providedIn: 'root', 
})

export class AuthService {
  private destroy$ = new Subject<void>();
  constructor(private jwtService: JwtService, 
    private http: HttpClient,
    private router: Router,
    private storageService:StorageService) {
    this.startTokenRefreshCycle();
   }
   
  login(data: { email: string; password: string }): Observable<any> {
   return this.http.post<{ accessToken: string }>(`${environment.apiUrl}/Auth/signin`, 
      { email:data.email, password:data.password},
      {
        withCredentials: true
      }
    );
  }
  register(data: { firstName: string; email: string; password: string }): Observable<any> {
   return this.http.post<{ message: string }>(`${environment.apiUrl}/Auth/signup`, data);
  }
  

  refreshAccessToken(): Observable<{ accessToken: string }> {
    return new Observable((observer) => {
      this.http.post<{ accessToken: string }>(`${environment.apiUrl}/Auth/refresh`,{},
        {
          headers: {
            Authorization: `Bearer ${this.storageService.getAccessToken()}`, // Добавление заголовка
          },
        
          withCredentials: true, 
    }).subscribe(
        (response) => {
          console.log('Access token обновлен');
          this.storageService.setAccessToken(response.accessToken);
          observer.next(response); 
          observer.complete(); 
        },
        (error) => {
          console.error('Ошибка обновления токена:', error);
          this.logout();
          observer.error(error);
        }
      );
    });
  }
  refreshRequest():void{
    if (this.storageService.getAccessToken()) {
      const payload = this.jwtService.decodeToken(this.storageService.getAccessToken()!);
      if (payload.exp * 1000 - Date.now() < 300000) {
        this.refreshAccessToken().subscribe();
      }
    }
  }

  // Цикл автоматического обновления токена
  startTokenRefreshCycle(): void {
    interval(60000)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.refreshRequest();
      });
  }

  logout(): void {
    this.http.post(`${environment.apiUrl}/Auth/logout`,{},{
      headers: {
        Authorization: `Bearer ${this.storageService.getAccessToken()}`, // Добавление заголовка
      },
    
      withCredentials: true, 
}).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Ошибка выхода:', error); 
      }
    );
    this.destroy$.next(); // Trigger completion of all active streams
    this.destroy$.complete();
    this.storageService.removeAccessToken();
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from '../storage/storage.service';
import { JwtService } from '../jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private storageService:StorageService,private jwtService:JwtService) { }

  hasRole(requiredRoles: string[]): boolean {
    const token = this.storageService.getAccessToken();
    if (!token) {
      return false;
    }
  
    const decodedToken = this.jwtService.decodeToken(token);
    if (!decodedToken || !decodedToken.role) {
      return false;
    }
  
    const userRoles = Array.isArray(decodedToken.role) ? decodedToken.role : [decodedToken.role];
    return requiredRoles.some(role => userRoles.includes(role));
  }
  

  // Проверка, аутентифицирован ли пользователь
  isAuthenticated(): boolean {
    if (!this.storageService.getAccessToken()) return false;

    const payload = this.jwtService.decodeToken(this.storageService.getAccessToken()!);
    //console.log(payload);
    if (!payload) return false;

    const currentTimestamp = Math.floor(Date.now() / 1000);
    return payload.exp > currentTimestamp;
  }
}

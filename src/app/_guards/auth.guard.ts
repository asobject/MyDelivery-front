import { inject } from '@angular/core';
import { CanActivateFn,  } from '@angular/router';
import { UserService } from '../_services/user/user.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);

  // Проверяем авторизацию
  const isAuthenticated = userService.isAuthenticated();
  if (!isAuthenticated) {
    console.warn('Доступ запрещён: пользователь не авторизован');
  }
  return isAuthenticated;
};
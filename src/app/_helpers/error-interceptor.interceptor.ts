// import { Injectable } from '@angular/core';
// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { Router } from '@angular/router';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   constructor(private router: Router) {}

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).pipe(
//       catchError((error: HttpErrorResponse) => {
//         let errorMessage = 'Произошла неизвестная ошибка. Попробуйте позже.';

//         if (error.error && error.error.type) {
//           switch (error.error.type) {
//             case 'InvalidTokenException':
//               errorMessage = 'Срок действия вашей сессии истёк. Пожалуйста, войдите снова.';
//               // Перенаправление на страницу входа
//               this.router.navigate(['/login']);
//               break;
//             case 'UserNotFoundException':
//               errorMessage = 'Пользователь не найден.';
//               break;
//             case 'PasswordIncorrectException':
//               errorMessage = 'Введён неправильный пароль.';
//               break;
//             case 'UserAlreadyExistsException':
//               errorMessage = 'Пользователь с таким email уже существует.';
//               break;
//             default:
//               errorMessage = error.error.error || errorMessage;
//               break;
//           }
//         } else if (!navigator.onLine) {
//           errorMessage = 'Нет соединения с интернетом. Проверьте подключение.';
//         }
//         console.log("Erorrrr");
//         // Логируем ошибку
//         console.error(errorMessage);

//         // Уведомление пользователя
//          //alert(errorMessage); // Замените на сервис уведомлений, если потребуется

//         return throwError(() => new Error(errorMessage));
//       })
//     );
//   }
// }


import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Проверяем, что это ошибка
        if (error instanceof HttpErrorResponse) {
          // Перехват ошибок по статус-кодам
          switch (error.status) {
            case 400:
              console.error('Ошибка 400: Неверный запрос', error.error?.message || 'Нет сообщения от сервера');
              break;
            case 401:
              console.error('Ошибка 401: Не авторизован', error.error?.message || 'Нет сообщения от сервера');
              break;
            case 403:
              console.error('Ошибка 403: Доступ запрещен', error.error?.message || 'Нет сообщения от сервера');
              break;
            case 404:
              console.error('Ошибка 404: Ресурс не найден', error.error?.message || 'Нет сообщения от сервера');
              break;
            case 500:
              console.error('Ошибка 500: Внутренняя ошибка сервера', error.error?.message || 'Нет сообщения от сервера');
              break;
            default:
              console.error(`Неизвестная ошибка ${error.status}:`, error.error?.message || 'Нет сообщения от сервера');
              break;
          }
        }
        return throwError(() => error);
      })
    );
  }
}

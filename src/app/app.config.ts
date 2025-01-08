import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';;
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RefreshTokenInterceptor } from './_helpers/refresh-token-interceptor.interceptor';
import { ErrorInterceptor } from './_helpers/error-interceptor.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(HttpClientModule),
    provideRouter(routes),
    provideHttpClient(),
     { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
     { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
    provideAnimations(),
    provideToastr({
      timeOut: 5000, // Время отображения уведомлений
      positionClass: 'toast-top-right', // Позиция уведомлений
      preventDuplicates: true, // Избегать дублирования сообщений
    }),
  ]
};

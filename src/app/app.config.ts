import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './shared/interceptors/loader.interceptor';
import { API_CONFIG } from './api.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loaderInterceptor])),
    {
      provide: API_CONFIG,
      useValue: {
        baseUrlV0: 'http://localhost:5050/api/v0',
        baseUrlV1: 'http://localhost:5050/api/v1',
      },
    },
    provideHttpClient(withInterceptors([loaderInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};

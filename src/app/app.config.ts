import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
// 👈 DŮLEŽITÉ: Přidat import pro poskytovatele HttpClient
import { provideHttpClient } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    // 👈 ŘEŠENÍ: Přidání poskytovatele HttpClient
    provideHttpClient() 
  ]
};
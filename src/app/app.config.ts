import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withInMemoryScrolling } from '@angular/router'; // Přidán import withInMemoryScrolling
// 👈 DŮLEŽITÉ: Přidat import pro poskytovatele HttpClient
import { provideHttpClient } from '@angular/common/http'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(
      routes,
      // TOTO AKTIVUJE SCROLL NA SEKCE
      withInMemoryScrolling({ 
        anchorScrolling: 'enabled', 
        scrollPositionRestoration: 'enabled' 
      })
    ),
    // 👈 ŘEŠENÍ: Přidání poskytovatele HttpClient
    provideHttpClient() 
  ]
};
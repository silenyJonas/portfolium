import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Implementace služby pro načítání JSON souborů s překlady a řízení jazyka.

@Injectable({
  providedIn: 'root'
})
export class LocalizationService {
  private defaultLanguage: string = 'cz'; // Výchozí jazyk
  private currentLanguageSource = new BehaviorSubject<string>(this.defaultLanguage);
  public currentLanguage$ = this.currentLanguageSource.asObservable();

  private currentTranslationsSource = new BehaviorSubject<any>(null);
  public currentTranslations$: Observable<any> = this.currentTranslationsSource.asObservable();

  private translations: any = {};

  constructor(private http: HttpClient) {
    this.loadInitialLanguage();
    // Nasloucháme změnám jazyka a načítáme překlady
    this.currentLanguage$.subscribe(lang => {
      this.loadTranslations(lang);
    });
  }

  private loadInitialLanguage(): void {
    const storedLang = localStorage.getItem('selectedLanguage');
    if (storedLang && ['cz', 'en'].includes(storedLang)) {
      this.currentLanguageSource.next(storedLang);
    } else {
      this.currentLanguageSource.next(this.defaultLanguage);
    }
  }

  private loadTranslations(languageCode: string): void {
    this.http.get(`assets/i18n/${languageCode}.json`).pipe(
      tap(data => {
        this.translations = data;
        this.currentTranslationsSource.next(this.translations); // Publikujeme nové překlady
      }),
      catchError(error => {
        console.error(`Chyba při načítání překladu pro jazyk: ${languageCode}`, error);
        // Volitelná logika: načíst výchozí jazyk, pokud vybraný selže
        if (languageCode !== this.defaultLanguage) {
          this.loadTranslations(this.defaultLanguage); // Rekurzivně načíst výchozí jazyk
        } else {
          // Pokud selže i výchozí jazyk, nastavíme prázdné překlady
          this.translations = {};
          this.currentTranslationsSource.next(this.translations);
        }
        return of({}); // Vrátíme prázdný objekt, aby observable nespadlo
      })
    ).subscribe();
  }

  public setLanguage(languageCode: string): void {
    if (this.currentLanguageSource.getValue() !== languageCode && ['cz', 'en'].includes(languageCode)) {
      localStorage.setItem('selectedLanguage', languageCode);
      this.currentLanguageSource.next(languageCode); // Spustí `loadTranslations`
    }
  }

  public getLanguage(): string {
    return this.currentLanguageSource.getValue();
  }

  public getText(key: string): string {
    const keys = key.split('.');
    let current: any = this.translations;

    for (const k of keys) {
      if (current && typeof current === 'object' && current.hasOwnProperty(k)) {
        current = current[k];
      } else {
        // Klíč nebyl nalezen, vrátíme jej jako chybu pro snadné ladění
        return `[MISSING: ${key}]`;
      }
    }
    // Pokud je hodnota string, vrátíme ji
    return typeof current === 'string' ? current : `[INVALID TYPE: ${key}]`;
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root' 
})
export class LanguageService {
  private isEnglishSubject = new BehaviorSubject<boolean>(false); 
  public isEnglish$ = this.isEnglishSubject.asObservable();
  get isEnglish(): boolean {
    return this.isEnglishSubject.getValue(); 
  }
  toggleLanguage(lang: boolean): void {
    this.isEnglishSubject.next(lang);
  }
  setLanguage(isEnglish: boolean): void {
    this.isEnglishSubject.next(isEnglish);
  }
}
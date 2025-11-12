import { Component, HostListener, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Potřebné pro *ngIf a [class]
import { FormsModule } from '@angular/forms'; // Nutné pro použití [(ngModel)] nebo [checked]/(change)
// Předpoklad: LocalizationService se nachází v tomto relativním umístění
import { LocalizationService } from '../../services/localization.service'; 
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-header',
  standalone: true,
  // Důležité: Importovat FormsModule pro práci s formulářovými prvky
  imports: [CommonModule, FormsModule], 
  templateUrl: './header.component.html', 
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  // Signal pro sledování, zda je mobilní menu otevřené
  isMobileMenuOpen = signal(false);
  
  // Signal pro sledování stavu slideru/přepínače. true = EN, false = CZ
  isEnglish = signal(false); 

  home: string = ""
  about_me: string = ""
  projects_skills: string = ""
  contact: string = ""
  collaboration: string = ""

  // Injectujeme LocalizationService
  constructor(private localizationService: LocalizationService) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  ngOnInit() {
    // 1. Inicializace stavu přepínače podle aktuálního jazyka
    const currentLang = this.localizationService.getLanguage();
    this.isEnglish.set(currentLang === 'en');
    
    // 2. Kontrola pro zavření mobilního menu při inicializaci na desktopu
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen.set(false);
    }
    this.localizationService.currentTranslations$
          .pipe(takeUntil(this.destroy$)) // Automatické odhlášení při zničení komponenty
          .subscribe(translations => {
            if (translations) {
              // Naplnění proměnných s přeloženými texty
              this.home = this.localizationService.getText('header.home');
              this.about_me = this.localizationService.getText('header.about_me');
              this.projects_skills = this.localizationService.getText('header.projects_skills');
              this.contact = this.localizationService.getText('header.contact');
              this.collaboration = this.localizationService.getText('header.collaboration');
            }
          });
  }

  // Přepíná stav menu (otevřeno/zavřeno)
  toggleMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  // Metoda pro zavření menu (volaná po kliknutí na odkaz)
  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
  
  // 🆕 OPRAVA CHYBY: Metoda pro přepínání jazyka.
  // Přijímá celou událost a používá přetypování pro bezpečný přístup k .checked
  onLanguageChange(event: Event) {
    // Přetypování event.target na HTMLInputElement pro získání hodnoty checked
    const isEn = (event.target as HTMLInputElement).checked; 
    
    const newLang = isEn ? 'en' : 'cz';
    this.localizationService.setLanguage(newLang);
    this.isEnglish.set(isEn); // Aktualizace signálu
  }

  // HostListener naslouchá události 'resize' (změna velikosti okna)
  @HostListener('window:resize')
  onResize() {
    // Zavře menu, pokud se okno zvětší nad velikost mobilu (např. 768px)
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen.set(false);
    }
  }
}
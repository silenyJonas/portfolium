import { 
  Component, 
  HostListener, 
  signal, 
  OnInit, 
  ElementRef, 
  Renderer2, 
  ViewChild // Pro získání reference na element v šabloně
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LocalizationService } from '../../services/localization.service'; 
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule], 
  templateUrl: './header.component.html', 
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  // Získáme referenci na element <header> v šabloně. 
  // VYŽADUJE, aby byl v header.component.html použit #mainHeader, např.: <header #mainHeader>
  @ViewChild('mainHeader') headerElementRef: ElementRef | undefined;

  // Signal pro sledování, zda je mobilní menu otevřené
  isMobileMenuOpen = signal(false);
  
  // Signal pro sledování stavu slideru/přepínače. true = EN, false = CZ
  isEnglish = signal(false); 

  // Signal pro sledování stavu scrollu (pro aktivaci třídy .scrolled pro stín/linku)
  isScrolled = signal(false);

  // Proměnné pro překlady (načítané ze LocalizationService)
  about_me: string = ""
  projects_skills: string = ""
  contact: string = ""
  collaboration: string = ""

  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2      // Pro manipulaci s DOM
  ) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  ngOnInit() {
    // 1. Inicializace stavu přepínače podle aktuálního jazyka
    const currentLang = this.localizationService.getLanguage();
    this.isEnglish.set(currentLang === 'en');
    
    // 2. Kontrola pro zavření mobilního menu při inicializaci na desktopu
    if (window.innerWidth > 768) {
      this.isMobileMenuOpen.set(false);
    }
    
    // Načtení překladů
    this.localizationService.currentTranslations$
          .pipe(takeUntil(this.destroy$))
          .subscribe(translations => {
            if (translations) {
              this.about_me = this.localizationService.getText('header.about_me');
              this.projects_skills = this.localizationService.getText('header.projects_skills');
              this.contact = this.localizationService.getText('header.contact');
              this.collaboration = this.localizationService.getText('header.collaboration');
            }
          });
  }

  // HostListener naslouchá události 'scroll' pro dynamický header
  @HostListener('window:scroll')
  onWindowScroll() {
    
    if (!this.headerElementRef) {
      // Zabrání chybě, pokud element ještě není renderován
      return; 
    }
    
    const scrollY = window.scrollY;
    // Získáme nativní DOM element <header>
    const headerElement = this.headerElementRef.nativeElement;

    // --- 1. Nastavení třídy pro vizuální změny (např. stín, linka) ---
    // Třída .scrolled se aktivuje po 50px (můžeme ji použít pro zobrazení stínu/linky)
    this.isScrolled.set(scrollY > 50);

    // --- 2. Postupné Rozostření (Blur) ---
    const startScroll = 50;
    const endScroll = 300; 
    const blurRange = endScroll - startScroll; // Efektivní rozsah 250px
    const maxBlur = 8;                         // Max blur v pixelech (8px)

    // Omezíme scrollY na rozsah, kde se blur aktivuje: [0, 250]
    // Vše pod 50px je 0. Vše nad 300px je 250.
    const clampedScroll = Math.max(0, Math.min(scrollY - startScroll, blurRange)); 
    
    // Vypočítáme faktor (0.0 až 1.0)
    const blurFactor = clampedScroll / blurRange;

    // Vypočítáme aktuální blur (plynule od 0px do 8px)
    const currentBlur = blurFactor * maxBlur;
    
    // Aplikace stylů přímo na element <header> pomocí Renderer2

    // Backdrop-filter (Blur)
    this.renderer.setStyle(
      headerElement, 
      'backdrop-filter', 
      `blur(${currentBlur}px)`
    );
    this.renderer.setStyle(
      headerElement, 
      '-webkit-backdrop-filter', 
      `blur(${currentBlur}px)`
    );
    
    // Pozadí musí zůstat transparentní!
    this.renderer.setStyle(
      headerElement, 
      'background-color', 
      `transparent` 
    );
  }

  // Přepíná stav menu (otevřeno/zavřeno)
  toggleMenu() {
    this.isMobileMenuOpen.update(value => !value);
  }

  // Metoda pro zavření menu (volaná po kliknutí na odkaz)
  closeMenu() {
    this.isMobileMenuOpen.set(false);
  }
  
  // Metoda pro přepínání jazyka.
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
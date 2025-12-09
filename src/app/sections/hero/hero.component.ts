import { Component, Renderer2, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  // ... imports atd.
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy { // Přidána implementace pro přehlednost
  // Injectujeme LocalizationService, Renderer2 a ElementRef
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2,      // Pro manipulaci s DOM
    private el: ElementRef           // Odkaz na hostitelský element komponenty (<app-hero>)
  ) {} 
  
  private destroy$ = new Subject<void>(); 

  name: string = "";
  title: string = "";
  subtitle: string = "";
  capture: string = "";

  ngOnInit() {
      // 1. Nastavení dynamického pozadí
      this.setDynamicBackground();

      // 2. Inicializace stavu přepínače podle aktuálního jazyka
      const currentLang = this.localizationService.getLanguage();
      
      // Načtení překladů
      this.localizationService.currentTranslations$
          .pipe(takeUntil(this.destroy$))
          .subscribe(translations => {
            if (translations) {
              this.name = this.localizationService.getText("hero.name")
              this.title = this.localizationService.getText("hero.title")
              this.subtitle = this.localizationService.getText("hero.subtitle")
              this.capture = this.localizationService.getText("hero.capture")
            }
          });
    }

    /**
     * Dynamicky nastaví pozadí na hostitelském elementu komponenty.
     * Používá Renderer2 pro bezpečnou manipulaci s DOM a Angular cestu.
     */
    setDynamicBackground(): void {
        const imageUrl = 'assets/images/backgrounds/background.jpg';
        const gradient = 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6))';
        
        // Cesta by měla být relativní k rootu aplikace (index.html)
        const fullBackgroundStyle = `${gradient}, url(${imageUrl})`;

        // Používáme Renderer2 k nastavení stylu na hostitelském elementu (<app-hero>)
        this.renderer.setStyle(
            this.el.nativeElement, 
            'background-image', 
            fullBackgroundStyle
        );
        
        // Pro správné zobrazení celé sekce musíme také nastavit základní CSS vlastnosti,
        // které byly původně definovány v .hero-section třídě.
        this.renderer.setStyle(this.el.nativeElement, 'background-size', 'cover');
        this.renderer.setStyle(this.el.nativeElement, 'background-position', 'center');
        this.renderer.setStyle(this.el.nativeElement, 'background-repeat', 'no-repeat');
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}
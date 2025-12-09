import { Component, Renderer2, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { LocalizationService } from '../../services/localization.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  standalone: true, // Předpokládám, že je to standalone, jak by mělo být
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  // Injectujeme LocalizationService, Renderer2 a ElementRef
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2, // Pro manipulaci s DOM
    private el: ElementRef // Pro získání reference na element hosta
  ) {}

  private destroy$ = new Subject<void>();
  name: string = "";
  title: string = "";
  subtitle: string = "";
  capture: string = "";

  ngOnInit() {
    // --- NASTAVENÍ POZADÍ PŘES TYPESCRIPT ---
    this.setBackgroundImage();
    // ----------------------------------------

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

  // Nová metoda pro nastavení pozadí
  private setBackgroundImage(): void {
    // 1. Definujte požadovaný styl pozadí
    const backgroundValue = "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('/assets/images/backgrounds/background.jpg')";

    // 2. Najděte element s třídou .hero-section
    // querySelectorAll vrátí NodeList, potřebujeme první element
    const heroSectionElement = this.el.nativeElement.querySelector('.hero-section');

    if (heroSectionElement) {
      // 3. Použijte Renderer2 k nastavení stylu
      this.renderer.setStyle(
        heroSectionElement,
        'background-image',
        backgroundValue
      );
      
      // Můžete také nastavit další související styly:
      this.renderer.setStyle(heroSectionElement, 'background-size', 'cover');
      this.renderer.setStyle(heroSectionElement, 'background-position', 'center');
      this.renderer.setStyle(heroSectionElement, 'background-repeat', 'no-repeat');
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
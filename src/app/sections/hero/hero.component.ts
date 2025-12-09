import { Component,Renderer2 } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent {
  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2      // Pro manipulaci s DOM
  ) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  name: string = "";
  title: string = "";
  subtitle: string = "";
  capture: string = "";


  ngOnInit() {
      // 1. Inicializace stavu přepínače podle aktuálního jazyka
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
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

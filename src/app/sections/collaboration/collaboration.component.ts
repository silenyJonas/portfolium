
import { Component,Renderer2 } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-collaboration',
  imports: [],
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.css'
})
export class CollaborationComponent {
  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2      // Pro manipulaci s DOM
  ) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  header:string = "";
  content:string = "";

  header_1:string = "";
  text_1:string = "";
  header_2:string = "";
  text_2:string = "";
  header_3:string = "";
  text_3:string = "";
  header_4:string = "";
  text_4:string = "";
  

  ngOnInit() {
      // 1. Inicializace stavu přepínače podle aktuálního jazyka
      const currentLang = this.localizationService.getLanguage();
      
      // Načtení překladů
      this.localizationService.currentTranslations$
            .pipe(takeUntil(this.destroy$))
            .subscribe(translations => {
              if (translations) {
                this.header = this.localizationService.getText("collaboration.header")
                this.content = this.localizationService.getText("collaboration.content")
                this.header_1 = this.localizationService.getText("collaboration.1_section.header")
                this.text_1 = this.localizationService.getText("collaboration.1_section.capture")
                this.header_2 = this.localizationService.getText("collaboration.2_section.header")
                this.text_2 = this.localizationService.getText("collaboration.2_section.capture")
                this.header_3 = this.localizationService.getText("collaboration.3_section.header")
                this.text_3 = this.localizationService.getText("collaboration.3_section.capture")
                this.header_4 = this.localizationService.getText("collaboration.4_section.header")
                this.text_4 = this.localizationService.getText("collaboration.4_section.capture")
                
              }
            });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

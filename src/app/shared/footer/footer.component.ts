
//upravit prepinani jazyku
import { Component,Renderer2 } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2      // Pro manipulaci s DOM
  ) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů


  copyright: string = '';
  back_to_top: string = '';
  source_code: string = '';
  


  ngOnInit() {
      // 1. Inicializace stavu přepínače podle aktuálního jazyka
      const currentLang = this.localizationService.getLanguage();
      
      // Načtení překladů
      this.localizationService.currentTranslations$
            .pipe(takeUntil(this.destroy$))
            .subscribe(translations => {
              if (translations) {
                this.copyright = this.localizationService.getText("footer.copyright")
                this.back_to_top = this.localizationService.getText("footer.back_to_top")
                this.source_code = this.localizationService.getText("footer.source_code")
                
                
              }
            });
    }
    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }
}

import { 
  Component, 
  Renderer2, 
  OnInit, 
  OnDestroy,
  HostListener,
  // ElementRef a ViewChild již nejsou potřeba, protože nemanipulujeme s DOM, ale se styly přes binding.
} from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-hero',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './hero.component.html',
  styleUrl: './hero.component.css'
})
export class HeroComponent implements OnInit, OnDestroy {
  
  // Proměnná pro řízení viditelnosti a opacity v šabloně
  // Bude vázána na [style.opacity] a [style.visibility] v HTML.
  isHeroVisible: boolean; 

  // Proměnné pro překlady
  name: string = "";
  title: string = "";
  subtitle: string = "";
  capture: string = "";

  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2,      
  ) {
    // Inicializace: Viditelné, pokud nejsme již po načtení v hlubokém scrollu
    this.isHeroVisible = window.scrollY < window.innerHeight;
  }
  
  private destroy$ = new Subject<void>(); 

  ngOnInit() {
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
      // Správné odhlášení z odběrů při zničení komponenty
      this.destroy$.next();
      this.destroy$.complete();
  }

  /**
   * Naslouchá události 'scroll' pro nastavení viditelnosti.
   * Díky použití opacity/visibility se zabrání zacyklení, protože se nemění výška DOM.
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    
    // Výška okna, která odpovídá min-height: 100vh Hero sekce
    const heroHeight = window.innerHeight; 
    const scrollY = window.scrollY;

    // Pokud je scroll pozice větší než celá výška Hero sekce + malá rezerva (50px), skrýt.
    if (scrollY > heroHeight + 10) {
      // Nastavíme false jen, pokud už není false (pro optimalizaci Angular change detection)
      if (this.isHeroVisible !== false) {
        this.isHeroVisible = false; 
      }
    } else {
      // Zobrazit, pokud se scroll nachází v horní části stránky.
      if (this.isHeroVisible !== true) {
        this.isHeroVisible = true;
      }
    }
  }
}
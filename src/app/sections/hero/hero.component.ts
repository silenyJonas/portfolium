import { 
  Component, 
  Renderer2, 
  OnInit, 
  OnDestroy,
  HostListener,
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
      this.destroy$.next();
      this.destroy$.complete();
  }

  /**
   * Naslouchá události 'scroll' pro nastavení viditelnosti.
   */
  @HostListener('window:scroll')
  onWindowScroll() {
    
    const heroHeight = window.innerHeight; 
    const scrollY = window.scrollY;

    // Pokud je scroll pozice větší než celá výška Hero sekce + malá rezerva (např. 50px),
    // nastavit isHeroVisible na false (pro skrytí/opacity 0).
    if (scrollY > heroHeight + 50) {
      // Nastavíme false jen, pokud už není false (pro optimalizaci Angular change detection)
      if (this.isHeroVisible !== false) {
        this.isHeroVisible = false; 
      }
    } else {
      // Nastavíme true jen, pokud už není true
      if (this.isHeroVisible !== true) {
        this.isHeroVisible = true;
      }
    }
  }
}
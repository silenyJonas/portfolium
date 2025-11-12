import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalizationService } from '../../services/localization.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {

  // Proměnné pro všechny texty, které se zobrazí v HTML
  copyright: string = '';
  back_to_top: string = '';

  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  constructor(private localizationService: LocalizationService) {} // Zde může být private, protože ji v HTML přímo nevoláme

  ngOnInit(): void {
    // Přihlásíme se k odběru změn překladů
    this.localizationService.currentTranslations$
      .pipe(takeUntil(this.destroy$)) // Automatické odhlášení při zničení komponenty
      .subscribe(translations => {
        if (translations) {
          // Naplnění proměnných s přeloženými texty
          this.copyright = this.localizationService.getText('footer.copyright');
          this.back_to_top = this.localizationService.getText('footer.back_to_top');
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

//upravit prepinani jazyku
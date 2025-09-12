import { Component } from '@angular/core';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [],
  templateUrl: './footer-bar.component.html',
  styleUrl: './footer-bar.component.css'
})
export class FooterBarComponent {
  rightsReserved: string = '';
  sourceCode: string = '';
  sourceCodeLink: string = 'https://github.com/silenyJonas/joncl_port';
  constructor(private languageService: LanguageService) {
    this.languageService.isEnglish$.subscribe(isEng => {
      this.setText(isEng);
    });
    this.setText(this.languageService.isEnglish);
  }
  toggleLang(lang: boolean) {
    this.languageService.toggleLanguage(lang);
  }
  czFlagLink : string = "assets/info-icons/czech-republic.png";
  enFlagLink : string = "assets/info-icons/united-kingdom.png";
  setText(isEnglish: boolean) {
    this.rightsReserved = isEnglish
      ? '2023 Joncl. All rights reserved.'
      : '2023 Joncl. Všechna práva vyhrazena.';
    this.sourceCode = isEnglish
      ? 'Page Source Code'
      : 'Zdrojový kód stránky';
  }
}
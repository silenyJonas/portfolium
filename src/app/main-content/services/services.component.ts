import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  service_1: string = '';
  service_2: string = '';
  service_3: string = '';
  servicesHeader: string = '';
  constructor(public languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setText(isEnglish);
    });
  }
  private setText(isEnglish: boolean): void {
    if (isEnglish) {
      this.servicesHeader = 'Services';
      this.service_1 = "Website Development";
      this.service_2 = "Web App Development";
      this.service_3 = "Desktop App Development";
    } else {
      this.servicesHeader = 'Služby';
      this.service_1 = "Tvorba Webových Stránek";
      this.service_2 = "Vývoj Webových Aplikací";
      this.service_3 = "Vývoj Desktopových Aplikací";
    }
  }
}
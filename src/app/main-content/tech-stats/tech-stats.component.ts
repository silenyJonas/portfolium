import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service'

@Component({
  selector: 'app-tech-stats',
  imports: [CommonModule],
  templateUrl: './tech-stats.component.html',
  styleUrl: './tech-stats.component.css'
})
export class TechStatsComponent implements OnInit {
  header: string = '';
  yearsActive: { number: string; description: string }[] = [];
  constructor(public languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setText(isEnglish);
    });
  }
  private setText(isEnglish: boolean) {
    if (isEnglish) {
      this.header = 'Tech Stats';
      this.yearsActive = [
        { number: '3', description: 'Years Active' },
        { number: '8', description: 'Projects' },
        { number: '5', description: 'Clients' },
      ];
    } else {
      this.header = 'Technické Statistiky';
      this.yearsActive = [
        { number: '3', description: 'Roky Aktivní' },
        { number: '8', description: 'Projektů' },
        { number: '5', description: 'Klientů' },
      ];
    }
  }
}
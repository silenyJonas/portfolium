import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.css'
})
export class ProfileHeaderComponent implements OnInit {
  @Input() name: string = '';
  @Input() profileIconLink: string = '';
  @Input() personalInfo: { title: string; iconPath: string }[] = [];
  @Input() flagPath: string = '';

  onlineStatus: string = '';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.onlineStatus = isEnglish ? 'available for work' : 'připraven k práci';
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { InfoIconComponent } from '../../components/info/info-icon.component';
import { CommonModule } from '@angular/common';
import { ProfileHeaderComponent } from '../../components/profile-header/profile-header.component';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-info',
  imports: [InfoIconComponent, CommonModule, ProfileHeaderComponent],
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  techUseHeader: string = '';
  name: string = 'Joncl';
  profileIconLink: string = 'assets/info-icons/profile.jpg';
  flagPath: string = 'assets/info-icons/czech-republic.png';
  personalInfo: { title: string, iconPath: string }[] = [];
  infoTexts: { title: string, iconPath: string }[] = [
    { title: 'C#', iconPath: 'assets/info-icons/c-sharp.png' },
    { title: 'Python', iconPath: 'assets/info-icons/python.png' },
    { title: 'PHP', iconPath: 'assets/info-icons/php.png' },
    { title: 'TypeScript', iconPath: 'assets/info-icons/typescript.png' },
    { title: 'HTML', iconPath: 'assets/info-icons/html.png' },
    { title: 'CSS', iconPath: 'assets/info-icons/css.png' },
    { title: 'JavaScript', iconPath: 'assets/info-icons/js.png' },
    { title: 'ASP.NET', iconPath: 'assets/info-icons/aspnet.png' },
    { title: 'MySQL', iconPath: 'assets/info-icons/mysql.png' },
    { title: 'Postgre', iconPath: 'assets/info-icons/postgresql.png' },
    { title: 'MSSQL', iconPath: 'assets/info-icons/mssql.png' },
    { title: 'Angular', iconPath: 'assets/info-icons/angular.png' },
    { title: 'Autocad', iconPath: 'assets/info-icons/autocad.png' },
    { title: 'Inventor', iconPath: 'assets/info-icons/inventor.png' },
    { title: 'Git', iconPath: 'assets/info-icons/social.png' },
  ];
  groupedInfoTexts: any[][] = [];
  constructor(public languageService: LanguageService) {}
  ngOnInit() {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setPersonalInfo(isEnglish);
    });
    this.groupedInfoTexts = this.chunkArray(this.infoTexts, 4);
  }
  private setPersonalInfo(isEnglish: boolean) {
    if (isEnglish) {
      this.personalInfo = [
        { title: 'English & Czech', iconPath: '' },
        { title: 'Czech', iconPath: '' },
        { title: 'Prague', iconPath: '' },
        { title: '21yo', iconPath: '' }
      ];
      this.techUseHeader = 'Technologies I use:';
    } else {
      this.personalInfo = [
        { title: 'Angličtina & Čestina', iconPath: '' },
        { title: 'Česko', iconPath: '' },
        { title: 'Praha', iconPath: '' },
        { title: '21 let', iconPath: '' }
      ];
      this.techUseHeader = 'Technologie, které využívám:';
    }
  }
  chunkArray(arr: any[], size: number): any[][] {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  }
}
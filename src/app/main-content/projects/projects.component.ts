import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent implements OnInit {
  projects: { title: string, backgroundPath: string, description: string, githubLink: string, githubLogo: string, text1: string, text2: string, text3: string,text4: string,text5: string, }[] = [];
  projectsHeader: string = '';
  constructor(public languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setProjects(isEnglish);
    });
  }
  private setProjects(isEnglish: boolean): void {
    if (isEnglish) {
      this.projectsHeader = 'Reference projects';
      this.projects = [
        {
          title: 'File Manager',
          backgroundPath: 'assets/projects-bg/mc.png',
          description: 'Source Code',
          githubLink: 'https://github.com/silenyJonas/midnight_commander_op',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Console Application',
          text2: '• Two-panel view',
          text3: '• Basic file operations',
          text4: '• File editing',
          text5: '',
        },
        {
          title: 'Database Managment Tool',
          backgroundPath: 'assets/projects-bg/db_tool.png',
          description: 'Source Code',
          githubLink: 'https://github.com/silenyJonas/database_api',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Console Application',
          text2: '• Database operations',
          text3: '• Login/Logout',
          text4: '• Input and output of data',
          text5: '• Command line control',
        },
        {
          title: 'School Website',
          backgroundPath: 'assets/projects-bg/web-bg.png',
          description: 'Web Page',
          githubLink: 'https://web-dump-1052.github.io/ref_website_1/',
          githubLogo: 'assets/images/internet.png',
          text1: '• School website',
          text2: '• Connected to the database',
          text3: '• Forms and tables',
          text4: '• Responsive design',
          text5: '• More than 8 pages',},
          {
            title: 'Simple Web Page',
            backgroundPath: 'assets/projects-bg/rp.png',
            description: 'Web Page',
            githubLink: 'https://www.regio-partner.cz',
            githubLogo: 'assets/images/internet.png',
            text1: '• Simple design',
            text2: '• Responsive design',
            text3: '• Tables and buttons',
            text4: '• More than 10 tabs',
            text5: '',
          }
      ];
    } else {
      this.projectsHeader = 'Ukázkové projekty';
      this.projects = [
        {
          title: 'Souborový Systém',
          backgroundPath: 'assets/projects-bg/mc.png',
          description: 'Zdrojový Kód',
          githubLink: 'https://github.com/silenyJonas/midnight_commander_op',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Konzolová Aplikace',
          text2: '• Dvoupanelový vzhled',
          text3: '• Základní operace se soubory',
          text4: '• Editace souborů',
          text5: '',
        },
        {
          title: 'Nástroj pro správu databáze',
          backgroundPath: 'assets/projects-bg/db_tool.png',
          description: 'Zdrojový Kód',
          githubLink: 'https://github.com/silenyJonas/database_api',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Konzolová Aplikace',
          text2: '• Operace s databází',
          text3: '• Login/Logout',
          text4: '• Vstup a výstup dat',
          text5: '• Ovládání přes příkazový řádek',
        },
        {
          title: 'Webová Stránka Školy',
          backgroundPath: 'assets/projects-bg/web-bg.png',
          description: 'Webová stránka',
          githubLink: 'https://web-dump-1052.github.io/ref_website_1/',
          githubLogo: 'assets/images/internet.png',
          text1: '• Školní web',
          text2: '• Připojeno k databázi',
          text3: '• Formuláře a tabulky',
          text4: '• Responzivní design',
          text5: '• Více než 8 stránek',
        },
        {
          title: 'Jendoduchá Webová Stránka',
          backgroundPath: 'assets/projects-bg/rp.png',
          description: 'Webová stránka',
          githubLink: 'https://www.regio-partner.cz',
          githubLogo: 'assets/images/internet.png',
          text1: '• Jednoduché provedení',
          text2: '• Responzivní design',
          text3: '• Tabulky a tlačítka',
          text4: '• Více než 10 záložek',
          text5: '',
        }
      ];
    }
  }
}
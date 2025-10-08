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
  projects: { title: string, backgroundPath: string, description: string, githubLink: string, githubLogo: string, text1?: string, text2?: string, text3?: string,text4?: string,text5?: string, }[] = [];
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
            title: 'Company Web Page',
            backgroundPath: 'assets/projects-bg/rp_website.png',
            description: 'Web Page',
            githubLink: 'https://www.rpsw.cz',
            githubLogo: 'assets/images/internet.png',
            text1: '• Simple design',
            text2: '• Responsive design',
            text3: '• Tables and buttons',
            text4: '• More than 10 tabs',
            text5: '',
          },
          {
            title: 'Clicker Bot',
            backgroundPath: 'assets/projects-bg/gge_autoclicker.png',
            description: 'Source Code',
            githubLink: 'https://github.com/silenyJonas/gge_clicker',
            githubLogo: 'assets/images/github-projects.png',
            text1: '• Console + GUI',
            text2: '• Connected to Discord',
            text3: '• VMWARE virtualization',
            text4: '• Multithreading',
          },

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
        },
        {
          title: 'Nástroj pro správu databáze',
          backgroundPath: 'assets/projects-bg/db_tool.png',
          description: 'Zdrojový Kód',
          githubLink: 'https://github.com/silenyJonas/database_api',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Konzolová Aplikace',
          text2: '• Operace s databází',
          text3: '• Operace s tabulkami',
          text4: '• Autentizace',
          text5: '• Vstup a výstup dat'
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
          title: 'Firemní Webová Stránka',
          backgroundPath: 'assets/projects-bg/rp_website.png',
          description: 'Webová stránka',
          githubLink: 'https://www.rpsw.cz',
          githubLogo: 'assets/images/internet.png',
          text1: '• Moderní desing',
          text2: '• Autentizace',
          text3: '• CRM + ERP',
          text4: '• Formulář',
        },
        {
          title: 'Clicker Bot',
          backgroundPath: 'assets/projects-bg/gge_clicker.png',
          description: 'Zdrojový Kód',
          githubLink: 'https://github.com/silenyJonas/gge_clicker',
          githubLogo: 'assets/images/github-projects.png',
          text1: '• Konzole + GUI',
          text2: '• Připojeno na Discord',
          text3: '• VMWARE virtualizace',
          text4: '• Multithreading',
        },
      ];
    }
  }
}
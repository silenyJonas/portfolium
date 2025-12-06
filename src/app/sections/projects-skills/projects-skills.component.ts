import { Component, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-projects-skills',
  imports: [],
  templateUrl: './projects-skills.component.html',
  styleUrl: './projects-skills.component.css'
})
export class ProjectsSkillsComponent implements OnInit, OnDestroy { 

  // Pro správné odhlášení z odběrů
  private destroy$ = new Subject<void>(); 

  // Textové proměnné pro hlavičky a úvodní text
  header: string = "";
  capture: string = "";
  web_header: string = "";
  desktop_header: string = "";
  db_header: string = "";
  selected_projects_header: string = "";

  // Textové proměnné pro kartu 1: Web App
  web_app_header: string = ""
  web_app_text: string = ""
  web_app_tech: string = ""
  web_app_button: string = ""

  // Textové proměnné pro kartu 2: MC App
  mc_app_header: string = ""
  mc_app_text: string = ""
  mc_app_tech: string = ""
  mc_app_button: string = ""

  // Textové proměnné pro kartu 3: DB App
  db_app_header: string = ""
  db_app_text: string = ""
  db_app_tech: string = ""
  db_app_button: string = ""

  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2 // Pro manipulaci s DOM
  ) {} 

  ngOnInit() {
    // Načtení překladů
    this.localizationService.currentTranslations$
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        if (translations) {
          // Hlavičky sekce
          this.header = this.localizationService.getText("projects_skills.header");
          this.capture = this.localizationService.getText("projects_skills.capture");
          this.web_header = this.localizationService.getText("projects_skills.web_header");
          this.desktop_header = this.localizationService.getText("projects_skills.desktop_header");
          this.db_header = this.localizationService.getText("projects_skills.db_header");
          this.selected_projects_header = this.localizationService.getText("projects_skills.selected_projects_header");
          
          // Karta 1: Web App
          this.web_app_header = this.localizationService.getText("projects_skills.web_app.header");
          this.web_app_text = this.localizationService.getText("projects_skills.web_app.text");
          this.web_app_tech = this.localizationService.getText("projects_skills.web_app.tech");
          this.web_app_button = this.localizationService.getText("projects_skills.web_app.button_label");

          // Karta 2: MC App
          this.mc_app_header = this.localizationService.getText("projects_skills.mc_app.header");
          this.mc_app_text = this.localizationService.getText("projects_skills.mc_app.text");
          this.mc_app_tech = this.localizationService.getText("projects_skills.mc_app.tech");
          this.mc_app_button = this.localizationService.getText("projects_skills.mc_app.button_label");

          // Karta 3: DB App
          this.db_app_header = this.localizationService.getText("projects_skills.db_app.header");
          this.db_app_text = this.localizationService.getText("projects_skills.db_app.text");
          this.db_app_tech = this.localizationService.getText("projects_skills.db_app.tech");
          this.db_app_button = this.localizationService.getText("projects_skills.db_app.button_label");
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
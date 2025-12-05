import { Component,Renderer2 } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-about-me',
  imports: [],
  templateUrl: './about-me.component.html',
  styleUrl: './about-me.component.css'
})
export class AboutMeComponent {
  // Injectujeme LocalizationService a Renderer2
  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2      // Pro manipulaci s DOM
  ) {} 
  private destroy$ = new Subject<void>(); // Pro správné odhlášení z odběrů

  header:string = "";
  paragraph_1:string = "";
  paragraph_2:string = "";
  header_praxe:string = "";
  htec_year:string="";
  htec_name:string="";
  htec_pos:string="";
  rp_year:string="";
  rp_name:string="";
  rp_pos:string="";
  viagem_year:string="";
  viagem_name:string="";
  viagem_pos:string="";
  naucseto_year:string="";
  naucseto_name:string="";
  naucseto_pos:string="";
  download_label:string="";

  ngOnInit() {
      // 1. Inicializace stavu přepínače podle aktuálního jazyka
      const currentLang = this.localizationService.getLanguage();
      
      // Načtení překladů
      this.localizationService.currentTranslations$
            .pipe(takeUntil(this.destroy$))
            .subscribe(translations => {
              if (translations) {
                this.header = this.localizationService.getText("about_me.header")
                this.paragraph_1 = this.localizationService.getText("about_me.paragraph_1")
                this.paragraph_2 = this.localizationService.getText("about_me.paragraph_2")
                this.header_praxe = this.localizationService.getText("about_me.header_praxe")

                this.htec_year = this.localizationService.getText("about_me.htec.year")
                this.htec_name = this.localizationService.getText("about_me.htec.name")
                this.htec_pos = this.localizationService.getText("about_me.htec.pos")
                
                this.rp_year = this.localizationService.getText("about_me.rp.year")
                this.rp_name = this.localizationService.getText("about_me.rp.name")
                this.rp_pos = this.localizationService.getText("about_me.rp.pos")
                
                this.viagem_year = this.localizationService.getText("about_me.viagem.year")
                this.viagem_name = this.localizationService.getText("about_me.viagem.name")
                this.viagem_pos = this.localizationService.getText("about_me.viagem.pos")
                
                this.naucseto_year = this.localizationService.getText("about_me.naucseto.year")
                this.naucseto_name = this.localizationService.getText("about_me.naucseto.name")
                this.naucseto_pos = this.localizationService.getText("about_me.naucseto.pos")

                this.download_label= this.localizationService.getText("about_me.download_label")
              }
            });
    }
}

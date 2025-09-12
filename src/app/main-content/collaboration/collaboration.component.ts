import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-collaboration',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './collaboration.component.html',
  styleUrl: './collaboration.component.css'
})
export class CollaborationComponent implements OnInit {
  workflowHeader: string = '';
  workflow: { title: string, description: string }[] = [];
  selectedDescription: string = '';
  selectedIndex: number = 0;

  constructor(public languageService: LanguageService) {}

  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setWorkflowText(isEnglish);
    });
  }

  private setWorkflowText(isEnglish: boolean): void {
    if (isEnglish) {
      this.workflowHeader = "Workflow";
      this.workflow = [
        {
          title: "Kick-off Meeting",
          description:
            "The initial meeting with the client where we clarify project goals, expectations, and technical requirements. We set up a roadmap, agree on the communication process, and choose appropriate project management tools.",
        },
        {
          title: "Development",
          description:
            "The active development phase where I turn the design into a real application. I work in iterations, sending regular progress demos, and consult with the client on each crucial step to ensure alignment with the project's vision.",
        },
        {
          title: "Testing & Review",
          description:
            "Before deployment, I thoroughly test everything – from functionality to responsiveness and performance. I gather feedback, fix any issues, and fine-tune the details to ensure the final product is of the highest quality.",
        },
        {
          title: "Deployment",
          description:
            "Once approved, I deploy the project to the production environment – such as web hosting or cloud. I ensure everything runs smoothly and provide basic documentation for maintenance and future development.",
        },
      ];
    } else {
      this.workflowHeader = "Pracovní Postup";
      this.workflow = [
        {
          title: "Úvodní Schůzka",
          description:
            "Úvodní schůzka s klientem, kde si ujasníme cíle projektu, očekávání a technické požadavky. Nastavíme plán, domluvíme se na komunikaci a zvolíme vhodné nástroje pro řízení projektu.",
        },
        {
          title: "Vývoj",
          description:
            "Aktivní fáze vývoje, kdy přetvářím návrh do reálné aplikace. Pracuji iterativně, posílám pravidelné ukázky postupu a konzultuji každý klíčový krok s klientem, abych zajistil soulad s vizí projektu.",
        },
        {
          title: "Testování",
          description:
            "Před nasazením důkladně testuji vše – od funkčnosti po responzivitu a výkon. Sbírám zpětnou vazbu, opravuji případné chyby a dolaďuji detaily pro co nejlepší kvalitu finálního produktu.",
        },
        {
          title: "Nasazení",
          description:
            "Po schválení nasazuji projekt do produkčního prostředí – například na webhosting nebo cloud. Zajistím bezproblémový chod a poskytnu základní dokumentaci pro údržbu a budoucí rozvoj.",
        },
      ];
    }
    this.selectedDescription = this.workflow[this.selectedIndex].description;
  }
  showDescription(index: number): void {
    this.selectedIndex = index;
    this.selectedDescription = this.workflow[index].description;
  }
}

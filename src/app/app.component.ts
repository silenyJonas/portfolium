import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Importy pro sdílené komponenty
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';

// Importy pro sekce
import { HeroComponent } from './sections/hero/hero.component';
import { AboutMeComponent } from './sections/about-me/about-me.component';
import { ProjectsSkillsComponent } from './sections/projects-skills/projects-skills.component';
import { ContactComponent } from './sections/contact/contact.component';
import { CollaborationComponent } from './sections/collaboration/collaboration.component';

@Component({
  selector: 'app-root',
  standalone: true, // Klíčové: Standalone komponenta
  imports: [
    HeaderComponent,
    FooterComponent,
    HeroComponent,
    AboutMeComponent,
    ProjectsSkillsComponent,
    ContactComponent,
    CollaborationComponent
  ],
  templateUrl: './app.component.html', // Používá se pro strukturu
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'portfolium_jb';
}
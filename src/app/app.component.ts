import { Component } from '@angular/core';
import { CollaborationComponent } from './main-content/collaboration/collaboration.component';
import { ContactComponent } from './main-content/contact/contact.component';
import { InfoComponent } from './main-content/info/info.component';
import { ProjectsComponent } from './main-content/projects/projects.component';
import { ServicesComponent } from './main-content/services/services.component';
import { TechStatsComponent } from './main-content/tech-stats/tech-stats.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { FooterBarComponent } from './main-content/footer-bar/footer-bar.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CollaborationComponent,
    ContactComponent,
    InfoComponent,
    ProjectsComponent,
    ServicesComponent,
    TechStatsComponent,
    SideBarComponent,
    FooterBarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
}
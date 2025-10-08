import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../../language.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {
  dcText: string = 'shx4096';
  igText: string = 'jonashx_';
  fbText: string = 'Jonáš';
  contactHeader: string = '';
  tel: string = '+420 733 188 328';
  dcLink: string = 'https://discord.com/users/591933611058397185';
  igLink: string = 'https://www.instagram.com/jonashx_';
  fbLink: string = 'https://www.facebook.com/profile.php?id=61575420965652';
  constructor(public languageService: LanguageService) {}
  ngOnInit(): void {
    this.languageService.isEnglish$.subscribe((isEnglish) => {
      this.setText(isEnglish);
    });
  }
  private setText(isEnglish: boolean): void {
    if (isEnglish) {
      this.contactHeader = 'Contact Me';
    } else {
      this.contactHeader = 'Kontaktuj Mě';
    }
  }
  email : string = "jonasbucina@rpsw.cz";
  web : string = "www.rpsw.cz"
  emailIcon : string = "assets/images/email.png";
  telIcon : string = "assets/images/tel.png";
}

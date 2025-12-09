import { Component, Renderer2 } from '@angular/core';
import { LocalizationService } from '../../services/localization.service'; 
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import emailjs from '@emailjs/browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css',
  imports: [CommonModule]
})
export class ContactComponent {

  constructor(
    private localizationService: LocalizationService,
    private renderer: Renderer2
  ) {} 

  private destroy$ = new Subject<void>();

  header = ""; content = "";
  name_header = ""; email_header = ""; topic_header = ""; message_header = "";
  name_text = ""; email_text = ""; topic_text = ""; message_text = "";
  button_label = ""; location = "";

  ngOnInit() {
    this.localizationService.currentTranslations$
      .pipe(takeUntil(this.destroy$))
      .subscribe(translations => {
        if (translations) {
          this.header = this.localizationService.getText("contact.header");
          this.content = this.localizationService.getText("contact.content");

          this.name_header = this.localizationService.getText("contact.form.name_header");
          this.email_header = this.localizationService.getText("contact.form.email_header");
          this.topic_header = this.localizationService.getText("contact.form.topic_header");
          this.message_header = this.localizationService.getText("contact.form.message_header");

          this.name_text = this.localizationService.getText("contact.form.name_text");
          this.email_text = this.localizationService.getText("contact.form.email_text");
          this.topic_text = this.localizationService.getText("contact.form.topic_text");
          this.message_text = this.localizationService.getText("contact.form.message_text");

          this.button_label = this.localizationService.getText("contact.button_label");
          this.location = this.localizationService.getText("contact.location");
        }
      });
  }

  // *** ODESLÁNÍ EMAILU ***
  loading = false;
success = false;
error = false;

sendEmail(event: Event) {
  event.preventDefault();
  this.loading = true;
  this.success = false;
  this.error = false;

  const form = event.target as HTMLFormElement;

  emailjs.sendForm(
    'service_xo79i4h',
    'template_mq9m5ln',
    form,
    'ZCvWueT5D794ISWK9'
  ).then(() => {
    this.loading = false;
    this.success = true;
    form.reset();

    // Zmizí po 4 sekundách
    setTimeout(() => this.success = false, 4000);
  }).catch(() => {
    this.loading = false;
    this.error = true;

    // Zmizí po 4 sekundách
    setTimeout(() => this.error = false, 4000);
  });
}


  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

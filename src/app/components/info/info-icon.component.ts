import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-info-icon',
  templateUrl: './info-icon.component.html',
  styleUrls: ['./info-icon.component.css']
})
export class InfoIconComponent {
  @Input() title: string = ''; 
  @Input() iconPath: string = '';
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-service-note',
  standalone: true,
  template: `
    <div class="service-note">נתקלת בבעיה? מוקד השירות שלנו: 03-0000000</div>
  `,
  styles: [
    `
      :host ::ng-deep .service-note {
        margin-top: 30px;
        text-align: center;
        font-size: 14px;
        color: #888;
      }
    `,
  ],
})
export class ServiceNoteComponent {}

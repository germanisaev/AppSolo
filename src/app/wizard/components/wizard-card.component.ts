import { Component, OnInit } from '@angular/core';
import { ServiceNoteComponent } from '../../shared/components/service-note.component';

@Component({
  selector: 'app-wizard-card',
  standalone: true,
  imports: [ServiceNoteComponent],
  template: `
    <div class="wizard-card">
      <ng-content></ng-content>

      <!-- <div class="service-note">
        נתקלת בבעיה? מוקד השירות שלנו: 03-0000000
      </div> -->
      <app-service-note />
    </div>
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
export class WizardCardComponent {}

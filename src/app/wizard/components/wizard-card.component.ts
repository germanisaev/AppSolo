import { Component, OnInit } from "@angular/core";
import { ServiceNoteComponent } from "./service-note.component";

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
})
export class WizardCardComponent {
  
}
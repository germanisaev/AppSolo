import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step1Form1 } from '../models/step.types';
import { FormFieldComponent } from '../controls/form-field.component';
import { ServiceNoteComponent } from '../components/service-note.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step1-form1',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent, WizardCardComponent],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">פרטים אישיים</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-form-field [form]="form" controlName="firstName" label="שם פרטי">
          </app-form-field>

          <app-form-field [form]="form" controlName="lastName" label="שם משפחה">
          </app-form-field>

          <app-form-field
            [form]="form"
            controlName="governmentId"
            label="מספר זהות"
          >
          </app-form-field>

          <app-form-field [form]="form" controlName="mobile" label="טלפון נייד">
          </app-form-field>
        </div>
      </app-wizard-card>
    </div>
  `,
})
export class Step1Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step1Form1;
  /* @Output() titleChange = new EventEmitter<string>();

  ngOnInit(): void {
    this.titleChange.emit('בואו נכיר אותכם');
  } */
}

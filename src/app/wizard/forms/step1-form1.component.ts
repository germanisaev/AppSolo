import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step1Form1 } from '../../shared/models/step.types';
import { InputFieldComponent } from '../../shared/controls/input-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step1-form1',
  standalone: true,
  imports: [ReactiveFormsModule, InputFieldComponent, WizardCardComponent],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">פרטים אישיים</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-input-field [form]="form" [maxLength]="20" controlName="firstName" label="שם פרטי">
          </app-input-field>

          <app-input-field [form]="form" [maxLength]="20" controlName="lastName" label="שם משפחה">
          </app-input-field>

          <app-input-field
            [form]="form"
            [maxLength]="9"
            controlName="governmentId"
            label="מספר זהות"
          >
          </app-input-field>

          <app-input-field [form]="form" [maxLength]="10" controlName="mobile" label="טלפון נייד">
          </app-input-field>
        </div>
      </app-wizard-card>
    </div>
  `,
})
export class Step1Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step1Form1;
}

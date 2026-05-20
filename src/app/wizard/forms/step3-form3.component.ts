import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form3 } from '../../shared/models/step.types';
import { InputFieldComponent } from '../../shared/controls/input-field.component';
import { NumberFieldComponent } from '../../shared/controls/number-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step3-form3',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputFieldComponent,
    NumberFieldComponent,
    WizardCardComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">פרטים בן/בת זוג</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-input-field
            [form]="form"
            controlName="firstName"
            label="שם פרטי"
          />
          <app-input-field
            [form]="form"
            controlName="lastName"
            label="שם משפחה"
          />
          <app-input-field
            [form]="form"
            controlName="governmentId"
            label="מספר זהות"
          />
          <app-number-field
            [form]="form"
            controlName="monthlyIncome"
            label="הכנסה חודשית"
          />
        </div>
      </app-wizard-card>
    </div>
  `,
})
export class Step3Form3Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form3;
}

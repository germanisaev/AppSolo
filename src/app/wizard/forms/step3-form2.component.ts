import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form2 } from '../models/step.types';
import { FormFieldComponent } from '../controls/form-field.component';
import { NumberFieldComponent } from '../controls/number-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step3-form2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    NumberFieldComponent,
    WizardCardComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">פרטים בן/בת זוג</h3>

        <div class="form-grid two-columns" [formGroup]="form">
          <app-form-field
            [form]="form"
            controlName="firstName"
            label="שם פרטי"
          />
          <app-form-field
            [form]="form"
            controlName="lastName"
            label="שם משפחה"
          />
          <app-form-field
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
export class Step3Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step3Form2;
}

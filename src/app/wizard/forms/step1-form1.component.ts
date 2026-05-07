import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step1Form1 } from '../models/step.types';
import { FormFieldComponent } from './form-field.component';

@Component({
  selector: 'app-step1-form1',
  standalone: true,
  imports: [ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="form-grid" [formGroup]="form">
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
  `,
})
export class Step1Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step1Form1;
}

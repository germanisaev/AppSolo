import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';

@Component({
  selector: 'app-step3-form4',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <div class="form-grid" [formGroup]="form">
      <div class="field">
        <label [class.required-mark]="isControlRequired('borrower4')">
        Borrower 4</label>
        <input type="text" formControlName="borrower4" />
      </div>
    </div>
  `,
})
export class Step3Form4Component extends FormBaseComponent {
  @Input({ required: true }) override form!: FormGroup;
}
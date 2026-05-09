import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-switch-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div
      class="field switch-row"
      [class.with-details]="isDetails"
      [class.without-details]="!isDetails"
      [formGroup]="form"
    >
      <div class="switch-side">
        <label [class.required-mark]="isRequired">{{ label }}</label>
        <span class="sub-label">{{ sublabel }}</span>

        <div class="yes-no-switch">
          <button type="button" [class.active]="control?.value === yesValue" (click)="setValue(yesValue)">
            {{ yesLabel }}
          </button>

          <button type="button" [class.active]="control?.value === noValue" (click)="setValue(noValue)">
            {{ noLabel }}
          </button>
        </div>

        <div class="error" *ngIf="isInvalid">{{ errorMessage }}</div>
      </div>

      <div class="details-side" *ngIf="isDetails && showDetailsInput">
        <label [class.required-mark]="isDetailsRequired">
          {{ detailsLabel }}
        </label>

        <input
          type="text"
          [formControlName]="detailsControlName"
          [class.input-error]="isDetailsInvalid"
        />

        <div class="error" *ngIf="isDetailsInvalid">
          {{ detailsErrorMessage }}
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .switch-row {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
        align-items: start;
        margin-bottom: 1.25rem;
      }

      .switch-row.with-details {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
      }

      .switch-row.without-details {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .switch-side,
      .details-side {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
      }

      .switch-side > label {
        color: #333;
        font-weight: 600;
      }

      .switch-side > .sub-label {
        color: #888888;
        text-align: right;
        font-size: 12px !important;
      }

      .yes-no-switch {
        width: 96px;
        height: 38px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        border: 1px solid #711aaa;
        border-radius: 6px;
        overflow: hidden;
        background: #fff;
      }

      .yes-no-switch button {
        border: 0;
        background: #fff;
        color: #711aaa;
        font-size: 14px;
        font-weight: 600;
        cursor: pointer;
      }

      .yes-no-switch button + button {
        border-right: 1px solid #711aaa;
      }

      .yes-no-switch button.active {
        background: #711aaa;
        color: #fff;
      }

      @media (max-width: 768px) {
        .switch-row {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class SwitchFieldComponent {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;
  @Input() sublabel!: string;

  @Input() yesLabel = 'כן';
  @Input() noLabel = 'לא';

  @Input() yesValue: string | boolean = 'yes';
  @Input() noValue: string | boolean = 'no';
  @Input() showDetailsOnValue: string | boolean = 'yes';

  @Input() detailsControlName = 'value';
  @Input() detailsLabel = 'תיאור התפקיד';
  @Input() isDetails = false;

  get control() {
    return this.form.get(this.controlName);
  }

  get detailsControl() {
    return this.form.get(this.detailsControlName);
  }

  get showDetailsInput(): boolean {
    return (
      !!this.detailsControlName &&
      this.control?.value === this.showDetailsOnValue
    );
  }

  get isRequired(): boolean {
    return (
      !!this.control?.hasValidator(Validators.required) ||
      !!this.control?.hasValidator(Validators.requiredTrue)
    );
  }

  get isInvalid(): boolean {
    return !!this.control && this.control.touched && this.control.invalid;
  }

  get errorMessage(): string {
    return this.control?.errors
      ? this.validation.getError(this.controlName, this.control.errors)
      : '';
  }

  get isDetailsRequired(): boolean {
    return (
      !!this.detailsControl?.hasValidator(Validators.required) ||
      !!this.detailsControl?.hasValidator(Validators.requiredTrue)
    );
  }

  get isDetailsInvalid(): boolean {
    return (
      !!this.detailsControl &&
      this.detailsControl.touched &&
      this.detailsControl.invalid
    );
  }

  get detailsErrorMessage(): string {
    return this.detailsControl?.errors
      ? this.validation.getError(
          this.detailsControlName,
          this.detailsControl.errors,
        )
      : '';
  }

  setValue(value: string | boolean): void {
    this.control?.setValue(value);
    this.control?.markAsTouched();
    this.control?.updateValueAndValidity();

    if (!this.detailsControl) {
      return;
    }

    if (this.isDetails) {
      if (value === this.showDetailsOnValue) {
        this.detailsControl.setValidators([Validators.required]);
        this.detailsControl.markAsTouched();
      } else {
        this.detailsControl.clearValidators();
        this.detailsControl.setValue(null);
        this.detailsControl.markAsUntouched();
      }

      this.detailsControl.updateValueAndValidity();
    } else {
      if (value !== this.showDetailsOnValue) {
        this.detailsControl.setValue(null);
        this.detailsControl.markAsUntouched();
      }
    }
  }
}

/* import { Component, Input, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'app-switch-field',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="field field-switch" [formGroup]="form">
      <label [class.required-mark]="isRequired">
        {{ label }}
      </label>

      <div class="yes-no-switch">
        <button
          type="button"
          [class.active]="control?.value === yesValue"
          (click)="setValue(yesValue)"
        >
          {{ yesLabel }}
        </button>

        <button
          type="button"
          [class.active]="control?.value === noValue"
          (click)="setValue(noValue)"
        >
          {{ noLabel }}
        </button>
      </div>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
  styles: [
    `
      :host ::ng-deep .field-switch {
        margin-bottom: 1rem;
      }
      :host ::ng-deep .biometric-switch-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      :host ::ng-deep .biometric-switch-field label {
        font-size: 14px;
        font-weight: 600;
        text-align: right;
      }

      :host ::ng-deep .yes-no-switch {
        width: 96px;
        height: 38px;

        display: grid;
        grid-template-columns: 1fr 1fr;

        border: 1px solid #711aaa;
        border-radius: 6px;
        overflow: hidden;

        background: #fff;
      }

      :host ::ng-deep .yes-no-switch button {
        border: 0;
        background: #fff;

        color: #711aaa;
        font-size: 14px;
        font-weight: 600;

        cursor: pointer;
        border-left: 1px solid #711aaa;
        border-right: 1px solid #711aaa;
      }

      :host ::ng-deep .yes-no-switch button.active {
        background: #711aaa;
        color: #fff;
      }
    `,
  ],
})
export class SwitchFieldComponent {
  private readonly validation = inject(ValidationService);

  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;

  @Input() yesLabel = 'כן';
  @Input() noLabel = 'לא';
  @Input() yesValue = 'yes';
  @Input() noValue = 'no';

  get control() {
    return this.form.get(this.controlName);
  }

  get isRequired(): boolean {
    return (
      !!this.control?.hasValidator(Validators.required) ||
      !!this.control?.hasValidator(Validators.requiredTrue)
    );
  }

  get isInvalid(): boolean {
    return !!this.control && this.control.touched && this.control.invalid;
  }

  get errorMessage(): string {
    const errors = this.control?.errors;

    if (!errors) {
      return '';
    }

    return this.validation.getError(this.controlName, errors);
  }

  setValue(value: string): void {
    this.control?.setValue(value);
    this.control?.markAsTouched();
    this.control?.updateValueAndValidity();
  }
}
 */

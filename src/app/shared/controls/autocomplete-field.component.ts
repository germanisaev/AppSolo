import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { ValidationService } from '../services/validation.service';

export interface AutocompleteOption {
  label: string;
  value: string | number;
}

@Component({
  selector: 'app-autocomplete-field',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, AutoCompleteModule],
  template: `
    <div class="field" [formGroup]="form">
      <label>
        {{ label }}
        <span [class.required-mark]="isRequired"></span>
      </label>

      <p-autoComplete
        [formControlName]="controlName"
        [suggestions]="filteredOptions"
        [optionLabel]="optionLabel"
        [forceSelection]="true"
        [dropdown]="true"
        [showClear]="true"
        [placeholder]="placeholder"
        [class.input-error]="isInvalid"
        (completeMethod)="search($event)"
      >
      </p-autoComplete>

      <div class="error" *ngIf="isInvalid">
        {{ errorMessage }}
      </div>
    </div>
  `,
})
export class AutocompleteFieldComponent {
  @Input({ required: true }) form!: FormGroup;
  @Input({ required: true }) controlName!: string;
  @Input({ required: true }) label!: string;

  @Input() placeholder = '';
  @Input() options: AutocompleteOption[] = [];
  @Input() optionLabel = 'label';

  filteredOptions: AutocompleteOption[] = [];

  constructor(private validation: ValidationService) {}

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
    return errors ? this.validation.getError(this.controlName, errors) : '';
  }

  search(event: { query: string }): void {
    const query = event.query?.trim().toLowerCase() ?? '';

    this.filteredOptions = this.options.filter((item) =>
      item.label.toLowerCase().includes(query),
    );
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form4 } from '../../shared/models/step.types';
import { NgIf } from '@angular/common';
import { InputFieldComponent } from '../../shared/controls/input-field.component';
import { WizardCardComponent } from '../components/wizard-card.component';
import { zipCodeValidator } from '../../shared/models/validators';
import { SelectFieldComponent } from '../../shared/controls/select-field.component';
import { CheckboxFieldComponent } from '../../shared/controls/checkbox-field.component';

@Component({
  selector: 'app-step3-form4',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    InputFieldComponent,
    WizardCardComponent,
    SelectFieldComponent,
    CheckboxFieldComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <h3 class="card-title">כתובת מגורים</h3>

        <div class="form-grid three-columns" [formGroup]="form">
          <app-input-field
            [form]="form"
            controlName="city"
            label="ישוב"
          ></app-input-field>

          <app-input-field
            [form]="form"
            controlName="street"
            label="שם רחוב"
          ></app-input-field>

          <app-input-field
            [form]="form"
            controlName="houseNumber"
            label="מספר בית"
          ></app-input-field>

          <app-input-field
            [form]="form"
            controlName="entranceNumber"
            label="כניסה"
          ></app-input-field>

          <app-input-field
            [form]="form"
            controlName="apartmentNumber"
            label="מספר דירה"
          ></app-input-field>

          <app-input-field
            [form]="form"
            controlName="zipCode"
            label="מיקוד"
          ></app-input-field>

          <app-checkbox-field
            class="full-width"
            [form]="form"
            controlName="isMailingAddressDifferent"
            label="כתובת למשלוח דואר אינה זהה לכתובת המגורים שלי"
          >
          </app-checkbox-field>

          <!-- <div class="field mb-1">
            <label
              class="checkbox-row"
              [class.required-mark]="
                isControlRequired('isMailingAddressDifferent')
              "
            >
              <input
                type="checkbox"
                formControlName="isMailingAddressDifferent"
              />
              כתובת למשלוח דואר אינה זהה לכתובת המגורים שלי
            </label>
          </div> -->
        </div>

        <ng-container *ngIf="form.controls.isMailingAddressDifferent.value">
          <h3 class="card-title">כתובת למשלוח דואר</h3>

          <div class="form-grid full-width three-columns">
            <app-select-field
              [form]="form.controls.differentMailingAddress"
              controlName="city"
              label="ישוב"
              [filter]="true"
              [options]="cityOptions"
              placeholder="בחר"
            />

            <app-select-field
              [form]="form.controls.differentMailingAddress"
              controlName="street"
              label="שם רחוב"
              [filter]="true"
              [options]="streetOptions"
              placeholder="בחר"
            />

            <app-input-field
              [form]="form.controls.differentMailingAddress"
              controlName="houseNumber"
              label="מספר בית"
            />

            <app-input-field
              [form]="form.controls.differentMailingAddress"
              controlName="entranceNumber"
              label="כניסה"
            />

            <app-input-field
              [form]="form.controls.differentMailingAddress"
              controlName="apartmentNumber"
              label="מספר דירה"
            />

            <app-input-field
              [form]="form.controls.differentMailingAddress"
              controlName="zipCode"
              label="מיקוד"
            />

            <app-input-field
              [form]="form.controls.differentMailingAddress"
              controlName="poBoxNumber"
              label="תא דואר"
            />
          </div>
        </ng-container>
      </app-wizard-card>
    </div>
  `,
})
export class Step3Form4Component extends FormBaseComponent implements OnInit {
  @Input({ required: true }) override form!: Step3Form4;

  streetOptions: { label: string; value: string }[] = [];

  cityOptions = [
    { label: 'ירושלים', value: 'jerusalem' },
    { label: 'תל אביב', value: 'telAviv' },
    { label: 'נתניה', value: 'netanya' },
  ];

  streetsByCity: Record<string, { label: string; value: string }[]> = {
    jerusalem: [
      { label: 'יפו', value: 'jaffa' },
      { label: 'הרצל', value: 'herzl' },
    ],
    telAviv: [
      { label: 'דיזנגוף', value: 'dizengoff' },
      { label: 'אלנבי', value: 'allenby' },
    ],
    netanya: [
      { label: 'הרצל', value: 'herzl_netanya' },
      { label: 'בן גוריון', value: 'ben_gurion' },
    ],
  };

  ngOnInit(): void {
    this.applyMailingAddressValidators();
    this.initCityStreetCascade();

    this.form.controls.isMailingAddressDifferent.valueChanges.subscribe(() => {
      this.applyMailingAddressValidators();
      this.initCityStreetCascade();
    });
  }

  private initCityStreetCascade(): void {
    const address = this.form.controls.differentMailingAddress;
    const cityControl = address.controls.city;
    const streetControl = address.controls.street;

    this.updateStreetOptions(cityControl.value);

    cityControl.valueChanges.subscribe((city) => {
      this.updateStreetOptions(city);

      streetControl.setValue('', { emitEvent: false });

      if (this.streetOptions.length) {
        streetControl.enable({ emitEvent: false });
      } else {
        streetControl.disable({ emitEvent: false });
      }

      streetControl.updateValueAndValidity({ emitEvent: false });
    });
  }

  private updateStreetOptions(city: string): void {
    this.streetOptions = this.streetsByCity[city] ?? [];
  }

  private applyMailingAddressValidators(): void {
    const isDifferent = this.form.controls.isMailingAddressDifferent.value;
    const address = this.form.controls.differentMailingAddress;

    const requiredControls = [
      address.controls.city,
      address.controls.street,
      address.controls.houseNumber,
    ];

    requiredControls.forEach((control) => {
      if (isDifferent) {
        control.enable({ emitEvent: false });
        control.setValidators([Validators.required]);
      } else {
        control.clearValidators();
        control.setValue('', { emitEvent: false });
        control.disable({ emitEvent: false });
        control.markAsUntouched();
        control.markAsPristine();
      }

      control.updateValueAndValidity({ emitEvent: false });
    });

    const zipCode = address.controls.zipCode;

    if (isDifferent) {
      zipCode.enable({ emitEvent: false });
      zipCode.setValidators([Validators.required, zipCodeValidator]);
    } else {
      zipCode.setValidators([zipCodeValidator]);
      zipCode.setValue('', { emitEvent: false });
      zipCode.disable({ emitEvent: false });
      zipCode.markAsUntouched();
      zipCode.markAsPristine();
    }

    zipCode.updateValueAndValidity({ emitEvent: false });

    address.updateValueAndValidity({ emitEvent: false });
    this.form.updateValueAndValidity({ emitEvent: false });
  }
}

import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step5Form1 } from '../models/step.types';

@Component({
  selector: 'app-step5-form1',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="upload-section" [formGroup]="form">
      <div class="upload-header">
        <h3>העלאת מסמכים</h3>
        <p>יש להעלות את המסמך הנדרש כדי להמשיך בתהליך.</p>
      </div>

      <div class="upload-box">
        <i class="pi pi-cloud-upload"></i>

        <div class="upload-text">
          <strong>גרור קובץ לכאן או לחץ לבחירה</strong>
          <span>קבצים נתמכים: PDF, JPG, PNG</span>
        </div>
        <!-- 
        <button type="button" class="upload-button">בחירת קובץ</button>
 -->
        <input
          #fileInput
          type="file"
          hidden
          accept=".pdf,.jpg,.jpeg,.png"
          (change)="onFileSelected($event)"
        />

        <button type="button" class="upload-button" (click)="fileInput.click()">
          בחירת קובץ
        </button>
      </div>

      <!-- <div class="upload-status">
        <i class="pi pi-check-circle"></i>
        <span>המסמך הועלה בהצלחה</span>
      </div> -->
      <div class="upload-status" *ngIf="selectedFileName">
        <i class="pi pi-check-circle"></i>
        <span>הקובץ נבחר: {{ selectedFileName }}</span>
      </div>

      <label
        class="checkbox-row"
        [class.required-mark]="isControlRequired('documentUploaded')"
      >
        <input type="checkbox" formControlName="documentUploaded" />
        אני מאשר/ת שהמסמך הועלה ונבדק
      </label>

      <div class="error" *ngIf="isControlInvalid('documentUploaded')">
        {{ getControlErrorMessage('documentUploaded') }}
      </div>
    </div>
  `,
})
export class Step5Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step5Form1;
  selectedFileName: string | null = null;

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) {
      return;
    }

    this.selectedFileName = file.name;

    this.form.controls.documentUploaded.setValue(true);
    this.form.controls.documentUploaded.markAsTouched();
    this.form.controls.documentUploaded.updateValueAndValidity();
  }
}

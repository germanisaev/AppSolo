import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step5Form2 } from '../models/step.types';

@Component({
  selector: 'app-step5-form2',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  template: `
    <div class="final-card">
      <div class="form-grid" [formGroup]="form">
        <div class="terms-box" (scroll)="onTermsScroll($event)">
          <h3>תנאי שימוש</h3>

          <p>יש לקרוא בעיון את תנאי השימוש לפני המשך התהליך.</p>

          <p>אני מצהיר/ה כי כל הפרטים שמסרתי נכונים, מלאים ומדויקים.</p>

          <p>
            ידוע לי כי המידע שמסרתי עשוי לשמש לצורך בדיקה, אימות, יצירת קשר ומתן
            השירות המבוקש.
          </p>

          <p>
            ידוע לי כי ייתכן שאדרש למסור מסמכים נוספים או להשלים פרטים לצורך
            המשך הטיפול בבקשה.
          </p>

          <p>
            המשך התהליך מהווה אישור לכך שקראתי, הבנתי ואני מסכים/ה לתנאי השימוש.
          </p>
        </div>

        <div class="field">
          <label
            class="checkbox-row"
            [class.disabled]="!termsRead"
            [class.required-mark]="isControlRequired('agreed')"
          >
            <input
              type="checkbox"
              formControlName="agreed"
              [disabled]="!termsRead"
            />

            אני מאשר/ת כי קראתי והבנתי את תנאי השימוש ומסכים/ה להם
          </label>

          <div class="hint" *ngIf="!termsRead">
            יש לגלול עד סוף תנאי השימוש כדי לאשר
          </div>

          <div class="error" *ngIf="isControlInvalid('agreed')">
            {{ getControlErrorMessage('agreed') }}
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      /* .final-card {
        width: min(760px, calc(100vw - 48px));
        margin-inline: auto;
        border-radius: 24px;
        background: #fff;
        padding: 48px 64px;
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
      } */
    `,
  ],
})
export class Step5Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step5Form2;

  termsRead = false;

  onTermsScroll(event: Event): void {
    const el = event.target as HTMLElement;

    const reachedBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 8;

    if (reachedBottom) {
      this.termsRead = true;
      this.form.controls.agreed.enable();
    }
  }
}

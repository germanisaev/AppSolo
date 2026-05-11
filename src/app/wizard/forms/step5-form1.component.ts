import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step5Form1 } from '../models/step.types';
import { WizardCardComponent } from '../components/wizard-card.component';
import { WizardFlowService } from '../services/wizard-flow.service';

@Component({
  selector: 'app-step5-form1',
  standalone: true,
  imports: [ReactiveFormsModule, WizardCardComponent],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <section class="loan-summary-card">
          <h3 class="summary-title">פרטי ההלוואה</h3>

          <div class="notice success">
            <span class="notice-icon">✓</span>

            <div class="notice-content">
              <strong>תנאי ההלוואה אושרו</strong>
              <p>נתוני ההלוואה שביקשת תקינים, חשוב לדעת שהתהליך עוד לא נגמר</p>
            </div>
          </div>

          <div class="summary-grid">
            <div class="summary-item">
              <span>סכום ההלוואה</span>
              <strong>{{ loanDetails.amount }} ₪</strong>
            </div>

            <div class="summary-item">
              <span>מספר תשלומים</span>
              <strong>{{ loanDetails.payments }}</strong>
            </div>

            <div class="summary-item">
              <span>סוג הצמדה</span>
              <strong>{{
                linkageTypeMap[loanDetails.linkageType] || '-'
              }}</strong>
            </div>

            <div class="summary-item">
              <span>ריבית</span>
              <strong>2%</strong>
            </div>

            <div class="summary-item">
              <span>החזר חודשי משוערך</span>
              <strong>{{ loanDetails.monthlyPayment }} ₪</strong>
            </div>
          </div>
        </section>
      </app-wizard-card>
    </div>
  `,
  styles: [
    `
      .loan-summary-card {
        width: 100%;
        direction: rtl;
        text-align: right;
      }

      .summary-title {
        margin: 0 0 28px;

        font-size: 24px;
        font-weight: 700;
        color: #333;
        text-align: right;
      }

      .notice {
        width: 100%;
        min-height: 58px;
        margin-bottom: 32px;
        padding: 12px 16px;

        display: flex;
        align-items: flex-start;
        gap: 10px;

        border-radius: 8px;
        border: 1px solid #b7e4c7;
        background: #e6f8ea;
        color: #263b2b;
      }

      .notice-icon {
        width: 18px;
        height: 18px;
        min-width: 18px;
        margin-top: 2px;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        border: 1px solid #27ae60;
        border-radius: 50%;

        color: #27ae60;
        font-size: 12px;
        font-weight: 700;
      }

      .notice-content strong {
        display: block;
        margin-bottom: 2px;

        font-size: 16px;
        font-weight: 500;
        color: #263b2b;
      }

      .notice-content p {
        margin: 0;

        font-size: 14px;
        line-height: 1.4;
        color: #263b2b;
      }

      .summary-grid {
        width: 100%;
        /* max-width: 620px; */
        margin: 0 auto 28px;

        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 18px 54px;
      }

      .summary-item {
        display: grid;
        grid-template-columns: 1fr auto;
        align-items: center;
        column-gap: 16px;

        font-size: 16px;
        color: #555;
        white-space: nowrap;
      }

      .summary-item span {
        color: #777;
        font-weight: 400;
      }

      .summary-item strong {
        color: #333;
        font-weight: 500;
      }

      @media (max-width: 768px) {
        .summary-title {
          text-align: center;
          font-size: 22px;
        }

        .summary-grid {
          grid-template-columns: 1fr;
          max-width: 280px;
          gap: 14px;
        }

        .summary-item {
          grid-template-columns: 1fr auto;
        }
      }
    `,
  ],
})
export class Step5Form1Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step5Form1;

  private flow = inject(WizardFlowService);

  readonly linkageTypeMap: Record<string, string> = {
    none: 'ללא הצמדה',
    indexLinked: 'צמוד למדד',
    primeLinked: 'פריים',
  };

  get loanAmountForm() {
    return this.flow.getForm(2, 1).getRawValue() as any;
  }

  get loanDetails() {
    return {
      amount: this.loanAmountForm.loanAmount,
      payments: this.loanAmountForm.numberOfPayments,
      linkageType: this.loanAmountForm.linkageType,
      monthlyPayment: this.loanAmountForm.monthlyPayment,
    };
  }
}

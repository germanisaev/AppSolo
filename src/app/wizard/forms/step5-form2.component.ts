import { Component, inject, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step5Form2 } from '../../shared/models/step.types';
import { WizardCardComponent } from '../components/wizard-card.component';
import { WizardFlowService } from '../../shared/services';

@Component({
  selector: 'app-step5-form2',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    WizardCardComponent,
  ],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <section class="loan-summary-card">
          <h3>פרטי ההלוואה - אושרו חלקית</h3>

          <div class="notice warning">
            <span class="notice-icon">
              <i class="pi pi-exclamation-triangle"></i>
            </span>
            <div>
              <strong>שים לב</strong>
              <p>
                ניתן לקחת הלוואה בתנאים שונים מהתנאים שביקשת. התנאים החדשים
                מופיעים מטה
              </p>
            </div>
          </div>

          <h4>נתוני ההלוואה שאושרו</h4>
          <div class="summary-grid">
            <div class="summary-item">
              <span>סכום ההלוואה</span>
              <div class="approved-color">{{ loanDetails.amount }} ₪</div>
            </div>

            <div class="summary-item">
              <span>מספר תשלומים</span>
              <div>{{ loanDetails.payments }}</div>
            </div>

            <div class="summary-item">
              <span>סוג הצמדה</span>
              <div>{{ linkageTypeMap[loanDetails.linkageType] || '-' }}</div>
            </div>

            <div class="summary-item">
              <span>ריבית</span>
              <div>2%</div>
            </div>

            <div class="summary-item">
              <span>החזר חודשי משוערך</span>
              <div class="approved-color">
                {{ loanDetails.monthlyPayment }} ₪
              </div>
            </div>
          </div>
          <!-- approved loan -->

          <h4>נתוני ההלוואה שביקשת</h4>
          <div class="summary-grid">
            <div class="summary-item">
              <span>סכום ההלוואה</span>
              <div class="requested-color">{{ loanDetails.amount }} ₪</div>
            </div>

            <div class="summary-item">
              <span>מספר תשלומים</span>
              <div>{{ loanDetails.payments }}</div>
            </div>

            <div class="summary-item">
              <span>סוג הצמדה</span>
              <div>{{ linkageTypeMap[loanDetails.linkageType] || '-' }}</div>
            </div>

            <div class="summary-item">
              <span>ריבית</span>
              <div>2%</div>
            </div>

            <div class="summary-item">
              <span>החזר חודשי משוערך</span>
              <div class="requested-color">
                {{ loanDetails.monthlyPayment }} ₪
              </div>
            </div>
          </div>
          <!-- requested loan -->
        </section>
      </app-wizard-card>
    </div>
  `,
  styles: [
    `
      .final-card {
        width: min(1040px, 88vw);
        margin: 0 auto;
      }

      .loan-summary-card {
        direction: rtl;
        text-align: right;
        padding: 8px 16px;
      }

      .loan-summary-card h3 {
        margin: 0 0 24px;
        font-size: 22px;
        font-weight: 800;
        color: #333;
      }

      .notice.warning {
        min-height: 58px;
        margin-bottom: 28px;
        padding: 14px 18px;

        display: flex;
        align-items: center;
        gap: 12px;

        border: 1px solid #ffb27a;
        border-radius: 8px;
        background: #fff7f0;
        color: #333;
      }

      .notice-icon {
        color: #ff6b00;
        font-size: 16px;
      }

      .notice.warning strong {
        display: block;
        margin-bottom: 4px;
        font-size: 15px;
        font-weight: 800;
      }

      .notice.warning p {
        margin: 0;
        color: #7a7a7a;
        font-size: 14px;
        line-height: 1.5;
      }

      .loan-summary-card h4 {
        margin: 26px 0 18px;
        font-size: 18px;
        font-weight: 800;
        color: #333;
      }

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        row-gap: 24px;
        column-gap: 56px;

        margin-bottom: 34px;
      }

      .summary-item {
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        column-gap: 18px;
        min-height: 28px;
      }

      .summary-item span {
        color: #8a8a8a;
        font-size: 15px;
        font-weight: 700;
      }

      .summary-item div {
        color: #2f2f2f;
        font-size: 16px;
        font-weight: 800;
      }

      .approved-color {
        color: #0aa66a !important;
      }

      .requested-color {
        color: #b00000 !important;
      }

      .service-note {
        margin-top: 28px;
        text-align: center;
        color: #8a8a8a;
        font-size: 13px;
      }

      @media (max-width: 768px) {
        .final-card {
          width: 100%;
        }

        .summary-grid {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .summary-item {
          grid-template-columns: 1fr;
          gap: 6px;
        }
      }
    `,
  ],
})
export class Step5Form2Component extends FormBaseComponent {
  @Input({ required: true }) override form!: Step5Form2;

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

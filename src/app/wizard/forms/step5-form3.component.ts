import { Component, inject, OnInit } from '@angular/core';
import { WizardFlowService } from '../services/wizard-flow.service';
import {
  LoanDecisionModalComponent,
  LoanDecisionModalType,
} from '../components/loan-decision-modal.component';
import { WizardCardComponent } from '../components/wizard-card.component';

export type LoanDecisionStatus = 'checking' | 'partialApproved' | 'final';
/* | 'checking'
  | 'partialApproved'
  | 'sentToAgent'
  | 'rejected'
  | 'manualProcess'; */

@Component({
  selector: 'app-step5-form3',
  standalone: true,
  imports: [LoanDecisionModalComponent, WizardCardComponent],
  template: `
    @if (isApprovedLoaded) {
      <section class="final-message-card final-card">
        <img class="final-message-icon" src="/Illustrations.svg" alt="" />

        <h3>כמעט סיימנו!</h3>

        <p>
          האישור העקרוני להלוואה שלך אושר. ברגעים אלו שולחים לך קישור לטלפון
          להשלמת מסמכים ולאחר מכן לחתימה אחרונה
        </p>
      </section>
    }

    @if (decisionStatus === 'checking') {
      <section class="loan-summary-card final-card">
        <app-wizard-card>
          <h3>פרטי ההלוואה</h3>

          <!-- @if (!isApprovedLoaded) { -->
          <div class="notice success">
            <span class="notice-icon">✓</span>
            <div>
              <strong>תנאי ההלוואה אושרו</strong>
              <p>נתוני ההלוואה שביקשת תקינים, חשוב לדעת שהתהליך עוד לא נגמר</p>
            </div>
          </div>
          <!-- } -->

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
        </app-wizard-card>
      </section>
    }

    @if (decisionStatus === 'partialApproved') {
      <section class="loan-summary-card final-card">
        <app-wizard-card>
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
        </app-wizard-card>
      </section>
    }

    @if (modalType) {
      <app-loan-decision-modal [type]="modalType" (closed)="closeModal()">
      </app-loan-decision-modal>
    }
  `,
  styles: [
    `
      .final-card {
        width: min(760px, calc(100vw - 48px));
        margin-inline: auto;
        border-radius: 24px;
        background: #fff;
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
      }

      .final-message-card {
        min-height: 260px;
        padding: 48px 64px;
        margin-bottom: 28px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
      }

      .loan-summary-card {
        min-height: 260px;
        padding: 48px 64px;
      }

      .final-message-icon {
        width: auto;
        height: 96px;
        margin-bottom: 1rem;

        animation: hourglass-rotate 4s ease-in-out infinite;
        transform-origin: center;
      }

      @keyframes hourglass-rotate {
        0% {
          transform: rotate(0deg);
        }

        40% {
          transform: rotate(0deg);
        }

        50% {
          transform: rotate(180deg);
        }

        90% {
          transform: rotate(180deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      .final-message-card h3 {
        margin: 0 0 0.75rem;
        font-size: 1.5rem;
        font-weight: 800;
        color: #333;
      }

      .final-message-card p {
        max-width: 560px;
        margin: 0 auto;
        line-height: 1.7;
        color: #475569;
        font-size: 1rem;
      }

      h3 {
        margin: 0 0 1.5rem;
        font-size: 1.35rem;
        font-weight: 700;
        color: #333;
        text-align: right;
      }
      /*  */
      .notice.success {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;

        padding: 1rem 1.25rem;
        margin-bottom: 1.5rem;

        background: #e7f8e9;
        border: 1px solid #a7e3b0;
        border-radius: 0.5rem;
        color: #2f4f34;
      }

      .notice.success .notice-icon {
        width: 1.25rem;
        height: 1.25rem;
        display: inline-flex;
        align-items: center;
        justify-content: center;

        border: 1px solid #22c55e;
        border-radius: 50%;
        color: #22c55e;
        font-weight: 800;
        flex: 0 0 auto;
      }

      .notice.success strong {
        display: block;
        margin-bottom: 0.25rem;
        font-weight: 800;
      }

      .notice.success p {
        margin: 0;
        color: #475569;
      }
      /*  */
      .notice.warning {
        display: flex;
        align-items: flex-start;
        gap: 0.875rem;

        padding: 1rem 1.25rem;
        margin-bottom: 2rem;

        border: 1px solid #f4c7a1;
        border-radius: 12px;

        background: #fff7f1;

        direction: rtl;
      }

      .notice.warning .notice-icon {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 22px;
        height: 22px;
        min-width: 22px;

        margin-top: 2px;

        color: #f08a24;
        font-size: 1rem;
        font-weight: 700;
      }

      .notice.warning strong {
        display: block;

        margin-bottom: 0.25rem;

        color: #3a312c;
        font-size: 1rem;
        font-weight: 700;
      }

      .notice.warning p {
        margin: 0;

        color: #6b7280;
        font-size: 0.95rem;
        line-height: 1.6;
      }
      /*  */

      .summary-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        row-gap: 1rem;
        column-gap: 1rem;
        font-size: 1rem;
      }

      .summary-item {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
        align-items: center;
      }

      .summary-item span {
        color: #8a8a8a;
        font-weight: 500;
      }

      .summary-item div {
        color: #333;
        font-weight: 700;
      }

      .summary-item div.approved-color {
        color: #1ba473;
      }

      .summary-item div.requested-color {
        color: #810000;
      }

      .service-note {
        margin: 2rem 0 0;
        text-align: center;
        color: #64748b;
        font-size: 0.85rem;
      }

      @media (max-width: 768px) {
        .loan-summary-card {
          padding: 1.5rem;
        }

        .summary-grid {
          grid-template-columns: 1fr;
        }
      }
    `,
  ],
})
export class Step5Form3Component implements OnInit {
  private flow = inject(WizardFlowService);

  decisionStatus: LoanDecisionStatus = 'checking';
  showDecisionModal = false;
  isApprovedLoaded = false;

  modalType: LoanDecisionModalType | null = null;

  ngOnInit(): void {
    // имитация загрузки/проверки
    setTimeout(() => {
      // this.isApprovedLoaded = true;
      this.decisionStatus = 'partialApproved';
    }, 3000);

    setTimeout(() => {
      this.modalType = 'sentToAgent';
    }, 6000);
  }

  closeModal(): void {
    this.modalType = null;
  }

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

  readonly linkageTypeMap: Record<string, string> = {
    none: 'ללא הצמדה',
    indexLinked: 'צמוד למדד',
    primeLinked: 'פריים',
  };
}

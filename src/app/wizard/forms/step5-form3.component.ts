import { Component, inject, OnInit } from '@angular/core';
import { WizardFlowService } from '../services/wizard-flow.service';
import { WizardCardComponent } from '../components/wizard-card.component';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-step5-form3',
  standalone: true,
  imports: [WizardCardComponent],
  template: `
    <section class="almost-done-card final-card">
      
      <img class="final-message-icon" src="/icon-session-timeout.png" alt="" />

      <h3>כמעט סיימנו!</h3>

      <p>{{ finalMessage }}</p>
    </section>

    <section class="loan-details-card final-card">
      <app-wizard-card>
        <h3 class="loan-title">פרטי ההלוואה</h3>

        <div class="loan-details-grid">
          <div class="detail-item">
            <span>סכום ההלוואה</span>
            <strong>{{ loanDetails.amount }} ₪</strong>
          </div>

          <div class="detail-item">
            <span>ריבית</span>
            <strong>2%</strong>
          </div>

          <div class="detail-item">
            <span>מספר תשלומים</span>
            <strong>{{ loanDetails.payments }}</strong>
          </div>

          <div class="detail-item">
            <span>החזר חודשי משוערך</span>
            <strong>{{ loanDetails.monthlyPayment }} ₪</strong>
          </div>

          <div class="detail-item">
            <span>סוג הצמדה</span>
            <strong>{{
              linkageTypeMap[loanDetails.linkageType] || '-'
            }}</strong>
          </div>

        </div>
      </app-wizard-card>
    </section>
  `,
  styles: [
    `
      /*  */
      
      /*  */
      .final-card {
        width: min(1040px, 88vw);
        margin-inline: auto;
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
      }

      .almost-done-card {
        min-height: 250px;
        margin-bottom: 28px;
        padding: 42px 64px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        direction: rtl;
        text-align: center;
      }

      .final-message-icon {
        width: auto;
        height: 96px;
        margin-bottom: 16px;

        /* animation: hourglass-rotate 4s ease-in-out infinite; */
        transform-origin: center;
        object-fit: contain;
      }

      @keyframes hourglass-rotate {
        0%,
        40% {
          transform: rotate(0deg);
        }

        50%,
        90% {
          transform: rotate(180deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      .almost-done-card h3 {
        margin: 0 0 10px;
        font-size: 24px;
        font-weight: 800;
        color: #333;
      }

      .almost-done-card p {
        max-width: 640px;
        margin: 0 auto;

        color: #475569;
        font-size: 16px;
        line-height: 1.7;
      }

      .loan-details-card {
        padding: 48px 64px;
      }

      .loan-title {
        margin: 0 0 32px;

        text-align: right;
        font-size: 22px;
        font-weight: 800;
        color: #333;
      }

      .loan-details-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 28px 64px;

        direction: rtl;
        text-align: right;
      }

      .detail-item {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 18px;
        align-items: baseline;
      }

      .detail-item span {
        color: #8a8a8a;
        font-size: 15px;
        font-weight: 700;
      }

      .detail-item strong {
        color: #333;
        font-size: 16px;
        font-weight: 800;
      }

      .service-note {
        margin-top: 40px;
        text-align: center;
        color: #777;
        font-size: 13px;
      }

      @media (max-width: 768px) {
        .final-card {
          width: 100%;
        }

        .almost-done-card {
          padding: 32px 20px;
        }

        .loan-details-grid {
          grid-template-columns: 1fr;
          gap: 20px;
        }
      }
    `,
  ],
})
export class Step5Form3Component implements OnInit {
  private flow = inject(WizardFlowService);

  ngOnInit(): void {}

  get finalMessage(): string {
    if (this.flow.isUsTaxResident()) {
      return 'האישור העקרוני להלוואה שלך אושר. ברגעים אלו שולחים לך קישור לטלפון להשלמת מסמכים ומילוי טופס W9 ולאחר מכן לחתימה אחרונה';
    }

    return 'האישור העקרוני להלוואה שלך אושר. ברגעים אלה שולחים לך קישור לטלפון להשלמת מסמכים ולאחר מכן לחתימה אחרונה';
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

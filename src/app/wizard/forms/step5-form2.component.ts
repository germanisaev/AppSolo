import { Component, inject, Input, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step5Form2 } from '../models/step.types';
import { WizardCardComponent } from '../components/wizard-card.component';
import { WizardFlowService } from '../services/wizard-flow.service';

@Component({
  selector: 'app-step5-form2',
  standalone: true,
  imports: [ReactiveFormsModule, WizardCardComponent],
  template: `
    <div class="final-card">
      <app-wizard-card>
        <section class="loan-summary-card">
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
      </app-wizard-card>
    </div>
  `,
  styles: [``],
})
export class Step5Form2Component extends FormBaseComponent implements OnInit {
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

  ngOnInit(): void {
  }
}

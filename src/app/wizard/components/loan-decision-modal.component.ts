import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type LoanDecisionModalType =
  | 'sentToAgent'
  | 'rejected'
  | 'manualProcess';

@Component({
  selector: 'app-loan-decision-modal',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="modal-backdrop">
      <div class="decision-modal">
        <img class="modal-icon" [src]="icon" alt="" />

        <h2>{{ title }}</h2>

        <p *ngIf="text">
          {{ text }}
        </p>

        <button type="button" class="modal-button" (click)="closed.emit()">
          הבנתי
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .modal-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9999;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(0, 0, 0, 0.55);
      }

      .decision-modal {
        width: min(520px, calc(100vw - 32px));
        padding: 48px 56px;
        direction: rtl;
        text-align: center;

        background: #ffffff;
        border-radius: 24px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }

      .modal-icon {
        width: auto;
        height: 110px;
        object-fit: contain;
        margin-bottom: 20px;
        
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

      h2 {
        margin: 0 0 12px;
        color: #3a3a3a;
        font-size: 30px;
        font-weight: 800;
        line-height: 1.25;
      }

      p {
        margin: 0 auto 28px;
        max-width: 420px;
        color: #475569;
        font-size: 16px;
        line-height: 1.6;
      }

      .modal-button {
        min-width: 136px;
        height: 44px;

        border: none;
        border-radius: 999px;

        background: #711aaa;
        color: #ffffff;

        font-weight: 800;
        font-size: 1rem;
        line-height: 1;
        cursor: pointer;
      }
    `,
  ],
})
export class LoanDecisionModalComponent {
  @Input({ required: true }) type!: LoanDecisionModalType;
  @Output() closed = new EventEmitter<void>();

  get icon(): string {
    const icons: Record<LoanDecisionModalType, string> = {
      sentToAgent: '/icon-session-timeout.svg',
      rejected: '/icon-operation-failed.svg',
      manualProcess: '/icon-secure-authentication.svg',
    };

    return icons[this.type];
  }

  get title(): string {
    const titles: Record<LoanDecisionModalType, string> = {
      sentToAgent: 'בקשתך הועברה לנציג',
      rejected: 'מצטערים. בהתאם למידע לא ניתן לאשר את ההלוואה',
      manualProcess: 'המשך התהליך מול נציג',
    };

    return titles[this.type];
  }

  get text(): string {
    const texts: Record<LoanDecisionModalType, string> = {
      sentToAgent: 'נציג יצור איתך קשר להמשך תהליך',
      rejected: '',
      manualProcess:
        'לצורך אישור הבקשה נדרש אישור מול הגורם המטפל. נציג מטעמנו יצור עמך קשר לבדיקה ולהשלמת מסמכים במידת הצורך',
    };

    return texts[this.type];
  }
}

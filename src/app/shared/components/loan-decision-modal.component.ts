import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

export type LoanDecisionModalType =
  | 'sentToAgent'
  | 'rejected'
  | 'manualProcess'
  | 'otpBlocked'
  | 'linkSentSuccess';

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

        <button type="button" class="modal-button" (click)="onConfirm()">
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

        background: rgba(0, 0, 0, 0.45);

        animation: backdropFade 220ms ease;
      }

      .decision-modal {
        width: min(640px, calc(100vw - 32px));
        min-height: 300px;
        padding: 42px 56px;

        direction: rtl;
        text-align: center;

        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);

        animation: modalEnter 280ms cubic-bezier(0.22, 1, 0.36, 1);
        transform-origin: center;
      }

      .modal-icon {
        width: auto;
        height: 110px;
        object-fit: contain;
        margin-bottom: 20px;

        /* animation: hourglass-rotate 4s ease-in-out infinite; */
        transform-origin: center;

        animation:
          modalIconEnter 500ms ease,
          floatingIcon 4s ease-in-out infinite 500ms;
      }

      h2 {
        margin: 0 0 12px;
        color: #3a3a3a;
        font-size: 30px;
        font-weight: 800;
        line-height: 1.25;

        animation: contentFade 400ms ease;
      }

      p {
        margin: 0 auto 28px;
        max-width: 420px;
        color: #475569;
        font-size: 16px;
        line-height: 1.6;

        animation: contentFade 500ms ease;
      }

      .modal-button {
        min-width: 140px;
        height: 44px;

        border: none;
        border-radius: 999px;

        background: #711aaa;
        color: #ffffff;

        font-weight: 800;
        font-size: 1.05rem;
        cursor: pointer;

        transition:
          transform 180ms ease,
          box-shadow 180ms ease,
          background 180ms ease;
      }

      .modal-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 24px rgba(113, 26, 170, 0.35);
      }

      @keyframes backdropFade {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes modalEnter {
        from {
          opacity: 0;
          transform: scale(0.92) translateY(12px);
        }

        to {
          opacity: 1;
          transform: scale(1) translateY(0);
        }
      }

      @keyframes modalIconEnter {
        from {
          opacity: 0;
          transform: scale(0.7) rotate(-10deg);
        }

        to {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
      }

      @keyframes floatingIcon {
        0%,
        100% {
          transform: translateY(0px);
        }

        50% {
          transform: translateY(-6px);
        }
      }

      @keyframes contentFade {
        from {
          opacity: 0;
          transform: translateY(8px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @media (max-width: 768px) {
        .decision-modal {
          width: calc(100vw - 32px);
          min-height: 340px;
          padding: 40px 24px;
        }
      }
    `,
  ],
})
export class LoanDecisionModalComponent {
  @Input({ required: true }) type!: LoanDecisionModalType;
  // @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<LoanDecisionModalType>();

  onConfirm(): void {
    this.confirmed.emit(this.type);
  }

  get icon(): string {
    const icons: Record<LoanDecisionModalType, string> = {
      sentToAgent: '/icon-session-timeout.png',
      rejected: '/icon-operation-failed.png',
      manualProcess: '/icon-secure-authentication.png',
      otpBlocked: '/icon-secure-authentication.png',
      linkSentSuccess: '/icon-success-form.png',

    };

    return icons[this.type];
  }

  get title(): string {
    const titles: Record<LoanDecisionModalType, string> = {
      sentToAgent: 'בקשתך הועברה לנציג',
      rejected: 'מצטערים. בהתאם למידע לא ניתן לאשר את ההלוואה',
      manualProcess: 'המשך התהליך מול נציג',
      otpBlocked: 'לא ניתן לנסות שוב',
      linkSentSuccess: 'הקישור נשלח בהצלחה!',
    };

    return titles[this.type];
  }

  get text(): string {
    const texts: Record<LoanDecisionModalType, string> = {
      sentToAgent: 'נציג יצור איתך קשר להמשך תהליך',
      rejected: '',
      manualProcess:
        'לצורך אישור הבקשה נדרש אישור מול הגורם המטפל. נציג מטעמנו יצור עמך קשר לבדיקה ולהשלמת מסמכים במידת הצורך',
      otpBlocked: 'בוצעו יותר מדי נסיונות. אפשר לנסות שוב בעוד 24 שעות',
      linkSentSuccess: 'הפרטים נשמרו ונשלח קישור ללקוח להמשך התהליך',
    };

    return texts[this.type];
  }
}

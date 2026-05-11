import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-loan-blocked-popup',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="loan-blocked-overlay">
      <div class="loan-blocked-popup">
        <img
          class="popup-icon"
          src="/icon-secure-authentication.png"
          alt=""
          aria-hidden="true"
        />

        <h2>לצערנו, לא ניתן לקחת הלוואה</h2>

        <p>בעקבות בדיקה שערכנו מצאנו כי אינך זכאי לקבל הלוואה מהבנק</p>

        <button type="button" (click)="onClose()">הבנתי</button>
      </div>
    </div>
  `,
  styles: [
    `
      .loan-blocked-overlay {
        position: fixed;
        inset: 0;
        z-index: 10000;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(0, 0, 0, 0.55);
      }

      .loan-blocked-popup {
        width: min(720px, calc(100vw - 40px));
        min-height: 360px;
        padding: 48px 56px 44px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background: #fff;
        border-radius: 22px;

        direction: rtl;
        text-align: center;

        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.25);
      }

      .popup-icon {
        width: auto;
        height: 110px;
        margin-bottom: 24px;

        display: block;
        object-fit: contain;
      }

      .loan-blocked-popup h2 {
        margin: 0 0 14px;

        font-size: 32px;
        font-weight: 800;
        color: #333;
      }

      .loan-blocked-popup p {
        max-width: 520px;
        margin: 0 0 32px;

        font-size: 18px;
        line-height: 1.5;
        color: #333;
      }

      .loan-blocked-popup button {
        min-width: 140px;
        height: 44px;

        border: 0;
        border-radius: 999px;

        background: #711aaa;

        color: #fff;
        font-size: 16px;
        font-weight: 700;

        cursor: pointer;
      }

      @media (max-width: 768px) {
        .loan-blocked-popup {
          width: calc(100vw - 32px);
          min-height: 300px;
          padding: 36px 24px 32px;

          border-radius: 18px;
        }

        .popup-icon {
          width: 130px;
          height: 88px;
        }

        .loan-blocked-popup h2 {
          font-size: 24px;
        }

        .loan-blocked-popup p {
          font-size: 15px;
        }
      }
    `,
  ],
})
export class LoanBlockedPopupComponent {
  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}

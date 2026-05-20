import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { OtpCodeComponent } from './otp-code.component';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-otp-popup',
  standalone: true,
  imports: [CommonModule, OtpCodeComponent, NgIf],
  template: `
    <div class="otp-backdrop">
      <div class="otp-modal" dir="rtl">
        <button type="button" class="close-btn" (click)="closed.emit()">
          ×
        </button>

        <h2>הזדהות עבור ביצוע הפעולה</h2>

        <p class="subtitle">
          קוד חד פעמי נשלח למספר {{ maskedPhone }}<br />
          הקוד תקף ל-20 דקות
        </p>

        <!-- <form (ngSubmit)="confirmOtp($event)"> -->
          <app-otp-code
            (codeChange)="otpCode = $event"
            (completed)="onOtpCompleted($event)"
            (resend)="onOtpResend()"
          >
          </app-otp-code>

          <p class="otp-error" *ngIf="errorMessage">
            {{ errorMessage }}
          </p>

          <button
            #confirmBtn
            type="button"
            class="confirm-btn"
            [disabled]="otpCode.length !== 6"
            (click)="confirmOtp($event)"
          >
            אישור
          </button>
        <!-- </form> -->
      </div>
    </div>
  `,
  styles: [
    `
      .otp-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(0, 0, 0, 0.45);
      }

      .otp-modal {
        position: relative;
        width: min(640px, calc(100vw - 32px));
        min-height: 300px;
        padding: 42px 56px;
        // width: min(910px, calc(100vw - 80px));
        // min-height: 570px;
        // padding: 56px 90px 60px;
        background: #fff;
        border-radius: 28px;
        text-align: center;
        box-shadow: 0 24px 80px rgba(0, 0, 0, 0.25);
      }

      .close-btn {
        position: absolute;
        top: 32px;
        right: 36px;
        border: none;
        background: transparent;
        font-size: 46px;
        line-height: 1;
        color: #2f2f2f;
        cursor: pointer;
      }

      h2 {
        margin: 0 0 8px;
        color: #3a3a3a;
        font-size: 32px;
        font-weight: 800;
      }

      .subtitle {
        margin: 0 0 54px;
        color: #3a3a3a;
        font-size: 22px;
        line-height: 1.45;
      }

      .confirm-btn {
        margin-top: 44px;
        min-width: 140px;
        height: 40px;
        border: none;
        border-radius: 999px;
        background: #711aaa;
        color: #fff;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
      }

      .confirm-btn:disabled {
        background: #bdbdbd;
        cursor: default;
      }

      .otp-error {
        margin: 14px 0 0;
        color: #d93025;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
      }

      @media (max-width: 768px) {
        .otp-modal {
          width: calc(100vw - 32px);
          min-height: auto;
          padding: 48px 20px 42px;
          border-radius: 22px;
        }

        .close-btn {
          top: 22px;
          right: 22px;
          font-size: 38px;
        }

        h2 {
          font-size: 26px;
        }

        .subtitle {
          margin-bottom: 38px;
          font-size: 18px;
        }
      }
    `,
  ],
})
export class OtpPopupComponent implements AfterViewInit {
  @Input() phoneNumber = '';
  @Input() errorMessage = '';

  @Output() closed = new EventEmitter<void>();
  @Output() confirmed = new EventEmitter<string>();
  @Output() resend = new EventEmitter<void>();

  @ViewChild('confirmBtn') confirmBtn?: ElementRef<HTMLButtonElement>;
  @ViewChild(OtpCodeComponent) otpCodeComponent?: OtpCodeComponent;

  otpCode = '';

  onOtpCompleted(code: string): void {
    this.otpCode = code;

    if (code.length === 6) {
      setTimeout(() => {
        this.confirmBtn?.nativeElement.focus();
      });
    }
  }

  onOtpResend(): void {
    this.resend.emit();
  }

  confirmOtp(event?: Event): void {
    event?.preventDefault();
    event?.stopPropagation();

    if (this.otpCode.length !== 6) {
      return;
    }

    this.confirmed.emit(this.otpCode);
  }

  clearOtp(): void {
    this.otpCode = '';
    this.otpCodeComponent?.clearOtp();
  }

  ngAfterViewInit(): void {
    this.otpCodeComponent?.focusFirst();
  }

  get maskedPhone(): string {
    const digits = this.phoneNumber.replace(/\D/g, '');

    if (digits.length < 7) {
      return this.phoneNumber;
    }

    return `${digits.slice(-3)}***** - ${digits.slice(0, 3)}`;
  }
}

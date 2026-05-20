import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  QueryList,
  ViewChildren,
  inject,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-otp-code',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, ReactiveFormsModule],
  template: `
    <div class="otp-wrapper" dir="rtl" [formGroup]="otpForm">
      <label class="otp-label">הקוד שהתקבל</label>

      <div class="otp-row" dir="ltr">
        <input
          #otpInput
          *ngFor="let controlName of otpControls; let i = index"
          [id]="'otp-' + i"
          class="otp-box"
          type="tel"
          inputmode="numeric"
          pattern="[0-9]*"
          maxlength="1"
          autocomplete="one-time-code"
          [formControlName]="controlName"
          (input)="onOtpInput(i, $event)"
          (keydown)="onOtpKeyDown(i, $event)"
          (paste)="onOtpPaste($event)"
        />
      </div>

      <p class="resend-text" *ngIf="!canResend">
        לא קיבלת את הקוד? שליחה חוזרת בעוד {{ countdown }} שניות
      </p>

      <button
        *ngIf="canResend"
        type="button"
        class="resend-link active"
        (click)="onResendClick()"
      >
        לא קיבלתי את הקוד - שליחה חוזרת
      </button>
    </div>
  `,
  styles: [
    `
      .otp-wrapper {
        width: 100%;
        text-align: right;
      }

      .otp-label {
        display: block;
        margin-bottom: 14px;
        font-size: 20px;
        font-weight: 800;
        color: #3a3a3a;
      }

      .otp-row {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 28px;
      }

      .otp-box {
        width: 78px;
        height: 68px;
        border: 1px solid #dedede;
        border-radius: 8px;
        background: #fff;
        text-align: center;
        font-size: 28px;
        font-weight: 500;
        color: #333;
        outline: none;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
      }

      .otp-box:focus {
        border-color: #711aaa;
        box-shadow: 0 0 0 2px rgba(113, 26, 170, 0.14);
      }

      .resend-text {
        margin: 0;
        color: #b5b5b5;
        font-size: 18px;
        font-weight: 700;
        text-align: right;
      }

      .resend-link {
        display: block;
        // margin: 0 auto;
        border: none;
        background: transparent;
        color: #711aaa;
        font-size: 20px;
        font-weight: 800;
        cursor: pointer;
        text-align: right;
      }

      input[type='tel'] {
        -webkit-appearance: none;
      }
    `,
  ],
})
export class OtpCodeComponent implements OnInit, OnDestroy {
  private readonly fb = inject(FormBuilder);

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef<HTMLInputElement>>;

  @Output() codeChange = new EventEmitter<string>();
  @Output() completed = new EventEmitter<string>();
  @Output() resend = new EventEmitter<void>();

  otpControls = ['d0', 'd1', 'd2', 'd3', 'd4', 'd5'];

  otpForm = this.fb.group({
    d0: [''],
    d1: [''],
    d2: [''],
    d3: [''],
    d4: [''],
    d5: [''],
  });

  countdown = 30;
  canResend = false;
  private timer?: ReturnType<typeof setInterval>;

  ngOnInit(): void {
    this.startTimer();
    // console.log(this.otpControls);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  onOtpInput(index: number, event: Event): void {
    const input = event.target as HTMLInputElement;
    const digit = input.value.replace(/\D/g, '').slice(-1);
    const controlName = this.otpControls[index];

    this.otpForm.get(controlName)?.setValue(digit, { emitEvent: false });
    input.value = digit;

    if (digit && index < this.otpControls.length - 1) {
      this.focusOtp(index + 1);
    }

    this.emitOtpCode();
  }

  onOtpKeyDown(index: number, event: KeyboardEvent): void {
    if (event.key !== 'Backspace') {
      return;
    }

    const controlName = this.otpControls[index];
    const currentValue = this.otpForm.get(controlName)?.value;

    if (currentValue) {
      this.otpForm.get(controlName)?.setValue('', { emitEvent: false });
      return;
    }

    if (index > 0) {
      this.focusOtp(index - 1);
      this.otpForm.get(this.otpControls[index - 1])?.setValue('', {
        emitEvent: false,
      });
    }

    this.emitOtpCode();
  }

  onOtpPaste(event: ClipboardEvent): void {
    event.preventDefault();

    const digits = (event.clipboardData?.getData('text') ?? '')
      .replace(/\D/g, '')
      .slice(0, 6)
      .split('');

    this.otpControls.forEach((controlName, index) => {
      this.otpForm.get(controlName)?.setValue(digits[index] ?? '', {
        emitEvent: false,
      });
    });

    this.refreshInputs();
    this.focusOtp(Math.min(digits.length, 5));
    this.emitOtpCode();
  }

  onResendClick(): void {
    if (!this.canResend) {
      return;
    }

    this.clearOtp();
    this.resend.emit();
    this.startTimer();
  }

  private emitOtpCode(): void {
    const code = this.otpControls
      .map((controlName) => this.otpForm.get(controlName)?.value ?? '')
      .join('');

    this.codeChange.emit(code);

    if (
      code.length === 6 &&
      this.otpControls.every((name) => !!this.otpForm.get(name)?.value)
    ) {
      this.completed.emit(code);
    }
  }

  private focusOtp(index: number): void {
    setTimeout(() => {
      this.otpInputs.get(index)?.nativeElement.focus();
    });
  }

  focusFirst(): void {
    setTimeout(() => {
      this.otpInputs.get(0)?.nativeElement.focus();
    });
  }

  private refreshInputs(): void {
    this.otpInputs.forEach((inputRef, index) => {
      inputRef.nativeElement.value =
        this.otpForm.get(this.otpControls[index])?.value ?? '';
    });
  }

  clearOtp(): void {
    this.otpControls.forEach((controlName) => {
      this.otpForm.get(controlName)?.setValue('', { emitEvent: false });
    });

    this.refreshInputs();
    this.focusOtp(0);
    this.emitOtpCode();
  }

  private startTimer(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }

    this.countdown = 30;
    this.canResend = false;

    this.timer = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.timer);
        this.canResend = true;
      }
    }, 1000);
  }
}

// import { NgFor, NgIf } from '@angular/common';
// import {
//   Component,
//   ElementRef,
//   EventEmitter,
//   OnInit,
//   Output,
//   QueryList,
//   ViewChildren,
// } from '@angular/core';

// @Component({
//   selector: 'app-otp-code',
//   standalone: true,
//   imports: [NgFor, NgIf],
//   template: `
//     <div class="otp-wrapper" dir="rtl">
//       <label class="otp-label">הקוד שהתקבל</label>

//       <div class="otp-inputs" dir="ltr">
//         <input
//           #otpInput
//           *ngFor="let item of otpValues; let i = index"
//           type="text"
//           inputmode="numeric"
//           autocomplete="off"
//           [value]="otpValues[i]"
//           (keydown)="onKeyDown(i, $event)"
//           (paste)="onPaste($event)"
//         />
//       </div>

//       <button type="button" class="resend-link" (click)="resend.emit()">
//         לא קיבלתי את הקוד - שליחה חוזרת
//       </button>

//       <!-- <p class="resend-text" *ngIf="!canResend">
//         לא קיבלת את הקוד? שליחה חוזרת בעוד {{ countdown }} שניות
//       </p>

//       <button
//         *ngIf="canResend"
//         type="button"
//         class="resend-link active"
//         (click)="onResendClick()"
//       >
//         לא קיבלתי את הקוד - שליחה חוזרת
//       </button> -->
//     </div>
//   `,
//   styles: [
//     `
//       .otp-wrapper {
//         width: 100%;
//         text-align: right;
//       }

//       .otp-label {
//         display: block;
//         margin-bottom: 14px;
//         font-size: 20px;
//         font-weight: 800;
//         color: #3a3a3a;
//       }

//       .otp-inputs {
//         display: flex;
//         justify-content: center;
//         gap: 12px;
//         margin-bottom: 28px;
//       }

//       .otp-inputs input {
//         width: 78px;
//         height: 68px;
//         border: 1px solid #dedede;
//         border-radius: 8px;
//         background: #fff;
//         text-align: center;
//         font-size: 28px;
//         font-weight: 500;
//         color: #333;
//         outline: none;
//         box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
//       }

//       .otp-inputs input:focus {
//         border-color: #711aaa;
//         box-shadow: 0 0 0 2px rgba(113, 26, 170, 0.14);
//       }

//       .resend-text {
//         margin-top: 16px;
//         color: #9ca3af; // серый
//         font-size: 16px;
//         text-align: right;
//       }

//       .resend-link {
//         margin-top: 16px;
//         border: none;
//         background: transparent;
//         font-size: 18px;
//         font-weight: 700;
//         cursor: pointer;
//       }

//       .resend-link.active {
//         color: #711aaa; // фиолетовый
//       }
//     `,
//   ],
// })
// // export class OtpCodeComponent {
// //   @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

// //   @Output() codeChange = new EventEmitter<string>();
// //   @Output() completed = new EventEmitter<string>();
// //   @Output() resend = new EventEmitter<void>();

// //   otpValues: string[] = ['', '', '', '', '', ''];

// //   countdown = 30;
// //   canResend = false;
// //   private timer?: any;
// //   private lastDigitKey = '';
// //   private lastDigitTime = 0;

// //   ngOnInit(): void {
// //     this.startTimer();
// //   }

// //   private startTimer(): void {
// //     this.countdown = 30;
// //     this.canResend = false;

// //     this.timer = setInterval(() => {
// //       this.countdown--;

// //       if (this.countdown <= 0) {
// //         clearInterval(this.timer);
// //         this.canResend = true;
// //       }
// //     }, 1000);
// //   }

// //   onResendClick(): void {
// //     if (!this.canResend) return;

// //     this.resend.emit();
// //     this.startTimer();
// //   }

// //   // 👉 OTP логика оставляем как у тебя (keydown)
// //   onKeyDown(index: number, event: KeyboardEvent): void {
// //     const key = event.key;

// //     if (/^\d$/.test(key)) {
// //       event.preventDefault();

// //       const now = Date.now();

// //       if (
// //         event.repeat ||
// //         (this.lastDigitKey === key && now - this.lastDigitTime < 120)
// //       ) {
// //         return;
// //       }

// //       this.lastDigitKey = key;
// //       this.lastDigitTime = now;

// //       this.setInputValue(index, key);

// //       if (index < this.otpValues.length - 1) {
// //         this.focusInput(index + 1);
// //       }

// //       this.emitCode();
// //       return;
// //     }

// //     if (key === 'Backspace') {
// //       event.preventDefault();

// //       this.lastDigitKey = '';
// //       this.lastDigitTime = 0;

// //       if (this.otpValues[index]) {
// //         this.setInputValue(index, '');
// //       } else if (index > 0) {
// //         this.setInputValue(index - 1, '');
// //         this.focusInput(index - 1);
// //       }

// //       this.emitCode();
// //       return;
// //     }

// //     if (key === 'ArrowLeft' && index < this.otpValues.length - 1) {
// //       event.preventDefault();
// //       this.focusInput(index + 1);
// //       return;
// //     }

// //     if (key === 'ArrowRight' && index > 0) {
// //       event.preventDefault();
// //       this.focusInput(index - 1);
// //       return;
// //     }

// //     if (key !== 'Tab') {
// //       event.preventDefault();
// //     }
// //   }

// //   onPaste(event: ClipboardEvent): void {
// //     event.preventDefault();

// //     const digits = (event.clipboardData?.getData('text') ?? '')
// //       .replace(/\D/g, '')
// //       .slice(0, 6)
// //       .split('');

// //     this.otpValues = ['', '', '', '', '', ''];

// //     digits.forEach((digit, index) => {
// //       this.otpValues[index] = digit;
// //     });

// //     this.refreshInputs();
// //     this.focusInput(Math.min(digits.length, 5));
// //     this.emitCode();
// //   }

// //   private setInputValue(index: number, value: string): void {
// //     this.otpValues[index] = value;
// //     const input = this.inputs.get(index)?.nativeElement;
// //     if (input) input.value = value;
// //   }

// //   private focusInput(index: number): void {
// //     requestAnimationFrame(() => {
// //       this.inputs.get(index)?.nativeElement.focus();
// //     });
// //   }

// //   private refreshInputs(): void {
// //     this.inputs.forEach((inputRef, index) => {
// //       inputRef.nativeElement.value = this.otpValues[index];
// //     });
// //   }

// //   private emitCode(): void {
// //     const code = this.otpValues.join('');
// //     this.codeChange.emit(code);

// //     if (this.otpValues.every(Boolean)) {
// //       this.completed.emit(code);
// //     }
// //   }
// // }
// export class OtpCodeComponent implements OnInit {
//   @ViewChildren('otpInput') inputs!: QueryList<ElementRef<HTMLInputElement>>;

//   @Output() codeChange = new EventEmitter<string>();
//   @Output() completed = new EventEmitter<string>();
//   @Output() resend = new EventEmitter<void>();

//   otpValues: string[] = ['', '', '', '', '', ''];

//   countdown = 30;
//   canResend = false;
//   private timer?: any;

//   ngOnInit(): void {
//     this.startTimer();
//   }

//   private startTimer(): void {
//     this.countdown = 30;
//     this.canResend = false;

//     this.timer = setInterval(() => {
//       this.countdown--;

//       if (this.countdown <= 0) {
//         clearInterval(this.timer);
//         this.canResend = true;
//       }
//     }, 1000);
//   }

//   onResendClick(): void {
//     if (!this.canResend) return;

//     this.resend.emit();
//     this.startTimer();
//   }

//   onKeyDown(index: number, event: KeyboardEvent): void {
//     const key = event.key;

//     if (/^\d$/.test(key)) {
//       event.preventDefault();

//       this.setInputValue(index, key);

//       if (index < this.otpValues.length - 1) {
//         this.focusInput(index + 1);
//       }

//       this.emitCode();
//       return;
//     }

//     if (key === 'Backspace') {
//       event.preventDefault();

//       if (this.otpValues[index]) {
//         this.setInputValue(index, '');
//       } else if (index > 0) {
//         this.setInputValue(index - 1, '');
//         this.focusInput(index - 1);
//       }

//       this.emitCode();
//       return;
//     }

//     if (key === 'ArrowLeft' && index < this.otpValues.length - 1) {
//       event.preventDefault();
//       this.focusInput(index + 1);
//       return;
//     }

//     if (key === 'ArrowRight' && index > 0) {
//       event.preventDefault();
//       this.focusInput(index - 1);
//       return;
//     }

//     if (key !== 'Tab') {
//       event.preventDefault();
//     }
//   }

//   onPaste(event: ClipboardEvent): void {
//     event.preventDefault();

//     const digits = (event.clipboardData?.getData('text') ?? '')
//       .replace(/\D/g, '')
//       .slice(0, 6)
//       .split('');

//     this.otpValues = ['', '', '', '', '', ''];

//     digits.forEach((digit, index) => {
//       this.otpValues[index] = digit;
//     });

//     this.refreshInputs();
//     this.focusInput(Math.min(digits.length, 5));
//     this.emitCode();
//   }

//   private setInputValue(index: number, value: string): void {
//     this.otpValues[index] = value;

//     const input = this.inputs.get(index)?.nativeElement;
//     if (input) {
//       input.value = value;
//     }
//   }

//   private focusInput(index: number): void {
//     setTimeout(() => {
//       this.inputs.get(index)?.nativeElement.focus();
//     });
//   }

//   private refreshInputs(): void {
//     this.inputs.forEach((inputRef, index) => {
//       inputRef.nativeElement.value = this.otpValues[index];
//     });
//   }

//   private emitCode(): void {
//     const code = this.otpValues.join('');
//     this.codeChange.emit(code);

//     if (this.otpValues.every(Boolean)) {
//       this.completed.emit(code);
//     }
//   }
// }

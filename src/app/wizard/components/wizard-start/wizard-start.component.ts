import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-wizard-start',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './wizard-start.component.html',
  styleUrl: './wizard-start.component.scss',
})
export class WizardStartComponent implements OnInit {
  private readonly fb = inject(FormBuilder);

  isSending = false;

  readonly token = 'secure-token-xyz';

  readonly form = this.fb.nonNullable.group({
    firstName: ['יוסי', Validators.required],
    lastName: ['אהרוני', Validators.required],
    governmentId: ['314327735', Validators.required],
    mobile: ['0549452396', Validators.required],
    email: ['german.isaev@gmail.com', Validators.required],
    loanAmount: ['20,000 ₪', Validators.required],
    linkageType: ['צמודה למדד', Validators.required],
    serviceType: ['ייעוץ', Validators.required],
    orderNumber: ['2356', Validators.required],
    privacyApproved: [false, Validators.requiredTrue],
  });

  ngOnInit(): void {}

  sendLinkToCustomer(): void {
    this.form.markAllAsTouched();

    if (this.form.invalid) {
      return;
    }

    this.isSending = true;

    const customerLink = `${window.location.origin}/wizard/intro?token=${this.token}`;

    const payload = {
      ...this.form.getRawValue(),
      customerLink,
    };

    console.log('send email payload', payload);

    setTimeout(() => {
      this.isSending = false;

      alert(`הקישור נשלח ללקוח:\n${customerLink}`);
    }, 700);
  }
}

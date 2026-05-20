import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { OtpPopupComponent } from '../otp-popup.component';
import { Router } from '@angular/router';
import { StartWorkflowType } from '../../../shared/models/workflow.types';
import { START_WORKFLOW_CONFIG } from '../../../shared/models/workflow-field.config';
import {
  createCompanyEmployeeStartForm,
  createCustomerDirectStartForm,
} from '../../../shared/models/workflow.factory';
import { WizardFlowService } from '../../../shared/services/wizard-flow.service';
import { BankRequestDraft } from '../../../shared/models/step.model';
import { LoanDecisionModalComponent } from '../../../shared/components/loan-decision-modal.component';

@Component({
  selector: 'app-wizard-start',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    OtpPopupComponent,
    LoanDecisionModalComponent,
  ],
  templateUrl: './wizard-start.component.html',
  styleUrl: './wizard-start.component.scss',
})
export class WizardStartComponent implements OnInit {
  private readonly fb = inject(FormBuilder);
  private router = inject(Router);
  private flow = inject(WizardFlowService);

  readonly token = 'secure-token-xyz';

  isSending = false;
  showOtpPopup = false;
  showSuccessPopup = false;

  workflowType = StartWorkflowType.CompanyEmployee;
  // workflowType = StartWorkflowType.CustomerDirect;
  config = START_WORKFLOW_CONFIG[this.workflowType];
  form = this.createFormByWorkflow(this.workflowType);

  ngOnInit(): void {
    console.log('WizardStartComponent opened');
  }

  onOtpConfirmed(code: string): void {
    if (code.length !== 6) {
      return;
    }

    this.isSending = true;
    this.showOtpPopup = false;

    this.router.navigate(['/customer', 'intro'], {
      queryParams: { token: this.token },
    });
  }

  onOtpResend(): void {
    // тут потом API resendOtp()
    console.log('resend otp');
  }

  getControl(controlName: string): AbstractControl | null {
    return (this.form as FormGroup).get(controlName);
  }

  isInvalid(controlName: string): boolean {
    const control = this.getControl(controlName);

    return !!control && control.invalid && (control.touched || control.dirty);
  }

  submitStartForm(): void {
    this.form.markAllAsTouched();

    console.log('FORM VALID:', this.form.valid);
    console.log('FORM VALUE:', this.form.getRawValue());
    console.log('ACTION:', this.config.afterSubmitAction);

    console.log('valid:', this.form.valid);
    console.log('errors:', this.form.errors);
    // console.log('privacy:', this.form.get('privacyApproved')?.value);
    // console.log('privacy errors:', this.form.get('privacyApproved')?.errors);
    console.log('action:', this.config.afterSubmitAction);

    if (this.form.invalid) {
      return;
    }

    switch (this.config.afterSubmitAction) {
      case 'sendSmsAndShowSuccess':
        this.sendSmsAndShowSuccess();
        break;

      case 'goToIntro':
        this.router.navigate(['/customer', 'intro'], {
          queryParams: { token: this.token },
        });
        break;

      case 'custom':
        this.handleFutureFlow();
        break;
    }
  }

  // -------------------- helper -----------------------
  private createFormByWorkflow(type: StartWorkflowType) {
    switch (type) {
      case StartWorkflowType.CompanyEmployee:
        return createCompanyEmployeeStartForm(this.fb);

      case StartWorkflowType.CustomerDirect:
        return createCustomerDirectStartForm(this.fb);

      default:
        return createCustomerDirectStartForm(this.fb);
    }
  }

  private sendSmsAndShowSuccess(): void {
    this.isSending = true;

    const customerLink = `${window.location.origin}/customer/intro?token=${this.token}`;
    const formValue = this.form.getRawValue();

    this.flow.patchBankRequestData(formValue as BankRequestDraft);

    const payload = {
      ...formValue,
      customerLink,
      workflowType: this.workflowType,
    };

    console.log('save + send SMS payload', payload);

    // потом API:
    // this.startService.createRequest(payload).subscribe({
    //   next: () => {
    //     this.isSending = false;
    //     this.showSuccessPopup = true;
    //   },
    //   error: () => {
    //     this.isSending = false;
    //   }
    // });

    setTimeout(() => {
      this.isSending = false;
      this.showSuccessPopup = true;

      console.log('showSuccessPopup:', this.showSuccessPopup);
    }, 700);
  }

  private handleFutureFlow(): void {
    console.log('handleFutureFlow');
  }
}

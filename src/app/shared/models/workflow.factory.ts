import { FormBuilder, Validators } from '@angular/forms';
import { CompanyEmployeeStartForm, CustomerDirectStartForm } from './workflow.types';
import { emailValidator, israeliIdValidator, mobilePhoneValidator } from './validators';

export function createCompanyEmployeeStartForm(fb: FormBuilder): CompanyEmployeeStartForm {
  return fb.nonNullable.group({
    firstName: ['יוסי', Validators.required],
    lastName: ['אהרוני', Validators.required],
    governmentId: ['314327735', [Validators.required, israeliIdValidator]],
    mobile: ['0549452396', [Validators.required, mobilePhoneValidator]],
    email: ['german.isaev@gmail.com', [Validators.required, emailValidator]],
    loanAmount: ['20,000', Validators.required],
    linkageType: ['צמודה למדד', Validators.required],
    orderNumber: ['2356', Validators.required],
    serviceType: ['ייעוץ', Validators.required],
    privacyApproved: [false, Validators.requiredTrue],
  });
}

export function createCustomerDirectStartForm(
  fb: FormBuilder
): CustomerDirectStartForm {
  return fb.nonNullable.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    governmentId: ['', [Validators.required, israeliIdValidator]],
    mobile: ['', [Validators.required, mobilePhoneValidator]],
  });
}
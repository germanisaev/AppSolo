import { FormBuilder, Validators } from '@angular/forms';
import {
  CheckControl,
  Step1Form1,
  Step2Form1,
  Step2Form2,
  Step2Form3,
  Step2Form31,
  Step3Form1,
  Step3Form2,
  Step3Form3,
  Step3Form31,
  Step4Form1,
  Step4Form2,
  Step5Form1,
  Step5Form2,
} from './step.types';
import { dateValidator, israeliIdValidator, mobilePhoneValidator } from './validators';

export function createStep1Form1(fb: FormBuilder): Step1Form1 {
  const form = fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    governmentId: ['314327735', [
      Validators.required, 
      Validators.pattern(/^\d+$/),
      Validators.maxLength(9), 
      Validators.minLength(9),
      israeliIdValidator,
    ]],
    mobile: ['0549452396', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      mobilePhoneValidator,
    ]],
  });

  form.controls.governmentId.disable();
  form.controls.mobile.disable();

  return form;
}

export function createStep2Form1(fb: FormBuilder): Step2Form1 {
  const form = fb.nonNullable.group({
    loanAmount: [''],
    numberOfPayments: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    linkageType: ['none'],
    monthlyPayment: ['3000', Validators.pattern(/^\d+$/)],
  });

  form.controls.linkageType.disable();
  form.controls.monthlyPayment.disable();

  return form;
}

export function createStep2Form2(fb: FormBuilder): Step2Form2 {
  return fb.nonNullable.group({
    monthlyChargeDate: ['', [
      Validators.required, 
      Validators.min(1), 
      Validators.max(28),
      Validators.minLength(1), 
      Validators.maxLength(2),
    ]],
    loanBeneficiary: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    bank: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    branchNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    accountNumber: ['', [Validators.required, 
      Validators.pattern(/^\d+$/),
      Validators.minLength(6), 
      Validators.maxLength(7)]],
  });
}

export function createStep2Form3(fb: FormBuilder): Step2Form3 {
  return fb.group({
    idIssueDate: fb.nonNullable.control('', { validators: [Validators.required, dateValidator] }),
    idExpiryDate: fb.nonNullable.control('', { validators: [Validators.required, dateValidator] }),
    biometricId: fb.control<string | null>(null, Validators.required),
    birthDate: fb.nonNullable.control('', { validators: [Validators.required, dateValidator] }),
    birthCountry: fb.nonNullable.control('', Validators.required),
    gender: fb.nonNullable.control('', Validators.required),
    email: fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
    ]),
    familyStatus: fb.nonNullable.control('', Validators.required),
    childreNumUnder18: fb.nonNullable.control('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    creditReportConsentExpiryDate: createStep2Form31(fb),
  });
}

/* export function createStep2Form31(fb: FormBuilder): Step2Form31 {
  return fb.nonNullable.group({
    checked: ['', Validators.required],
    executedTransactionConsentExpiryDate: [''],
    nonExecutedTransactionConsentExpiryDate: [''],
  });
} */
export function createStep2Form31(fb: FormBuilder): Step2Form31 {
  return fb.nonNullable.group({
    checked: [false, Validators.requiredTrue],
    executedTransactionConsentExpiryDate: ['', [dateValidator]],
    nonExecutedTransactionConsentExpiryDate: ['', [dateValidator]],
  });
}

export function createStep3Form1(fb: FormBuilder): Step3Form1 {
  return fb.nonNullable.group({
    borrower1: fb.nonNullable.control(false, {
      validators: [Validators.requiredTrue],
    }),
  });
}

export function createStep3Form2(fb: FormBuilder): Step3Form2 {
  return fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    governmentId: ['', [Validators.required, Validators.maxLength(9), Validators.minLength(9), israeliIdValidator]],
    monthlyIncome: ['', [Validators.required, Validators.pattern(/^\d{1,3}(,\d{3})*$/)]],
  });
}

export function createStep3Form3(fb: FormBuilder): Step3Form3 {
  /* const form = fb.nonNullable.group({
    city: fb.nonNullable.control('קרית גת'),
    street: fb.nonNullable.control('נחל ירקון'),
    houseNumber: fb.nonNullable.control('5'),
    entranceNumber: fb.nonNullable.control('1'),
    apartmentNumber: fb.nonNullable.control('76'),
    zipCode: fb.nonNullable.control('867870'),
    isMailingAddressDifferent: [false],
    differentMailingAddress: createStep3Form31(fb),
  }); */
  const form = fb.nonNullable.group({
    city: ['קרית גת', Validators.pattern(/^[א-ת\s-]+$/)],
    street: ['נחל ירקון', Validators.pattern(/^[א-ת\s-]+$/)],
    houseNumber: ['5', Validators.pattern(/^\d+$/)],
    entranceNumber: ['1', Validators.pattern(/^\d+$/)],
    apartmentNumber: ['76', Validators.pattern(/^\d+$/)],
    zipCode: ['867870', [Validators.maxLength(7), Validators.minLength(6), Validators.pattern(/^\d+$/)]],
    isMailingAddressDifferent: [false],
    differentMailingAddress: createStep3Form31(fb),
  });

  // 👉 disable AFTER creation
  form.controls.city.disable();
  form.controls.street.disable();
  form.controls.houseNumber.disable();
  form.controls.entranceNumber.disable();
  form.controls.apartmentNumber.disable();
  form.controls.zipCode.disable();

  return form;
}

export function createStep3Form31(fb: FormBuilder): Step3Form31 {
  return fb.nonNullable.group({
    city: ['', Validators.pattern(/^[א-ת\s-]+$/)],
    street: fb.nonNullable.control({ value: '', disabled: true }, [Validators.pattern(/^[א-ת\s-]+$/)]),
    houseNumber: ['', [Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
    entranceNumber: ['', [Validators.minLength(1), Validators.maxLength(2), Validators.pattern(/^\d+$/)]],
    apartmentNumber: ['', [Validators.minLength(1), Validators.maxLength(3), Validators.pattern(/^\d+$/)]],
    zipCode: ['', [Validators.minLength(6), Validators.maxLength(7), Validators.pattern(/^\d+$/)]],
    poBoxNumber: [''],
  });
}

export function createStep4Form1(fb: FormBuilder): Step4Form1 {
  return fb.nonNullable.group({
    // businessActivity: fb.nonNullable.control<string[]>([], Validators.required),
    businessActivity: ['', Validators.required],
    fieldsOfOccupation: ['', Validators.required],
    employmentStatus: ['', Validators.required],
    tenureValue: ['', Validators.required],
    tenureUnit: ['שנים', Validators.required],
    workplaceType: ['', Validators.required],
    education: ['', Validators.required],
    salaryPaymentDay: ['', Validators.required],
    monthlyIncome: ['', Validators.required],
    additionalHouseholdIncome: ['', Validators.required],
    monthlyAlimonyExpense: [''],
    monthlyRentExpense: ['', Validators.required],
    hasOwnedApartment: ['', Validators.required],
  });
}

export function createCheckControl(
  fb: FormBuilder,
  checkedRequired = true,
): CheckControl {
  return fb.group({
    checked: fb.control<null>(
      null,
      checkedRequired ? Validators.required : null,
    ),
    value: fb.control<null>(null),
  });
}

export function createStep4Form2(fb: FormBuilder): Step4Form2 {
  return fb.nonNullable.group({
    publicPersonnel: createCheckControl(fb),
    familyMemberPublicPersonnel: createCheckControl(fb),
    additionalBeneficiaries: createCheckControl(fb),
    nonIsraeliTaxResidency: createCheckControl(fb),
    usTaxResidency: createCheckControl(fb, false),
    notIsraeliTaxResidencyCountry: createCheckControl(fb, false),
    marketingConsent: [false],
    bankNotifications: [false],
    notificationMethod: [1],
  });
}

export function createStep5Form1(fb: FormBuilder): Step5Form1 {
  return fb.nonNullable.group({
    documentUploaded: [false, Validators.requiredTrue],
  });
}

export function createStep5Form2(fb: FormBuilder): Step5Form2 {
  return fb.nonNullable.group({
    agreed: fb.nonNullable.control(
      { value: false, disabled: true },
      Validators.requiredTrue,
    ),
  });
}

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  CheckControl,
  Step1Form1,
  Step2Form1,
  Step2Form2,
  Step3Form1,
  Step3Form11,
  Step3Form2,
  Step3Form3,
  Step3Form4,
  Step3Form41,
  Step4Form1,
  Step4Form2,
  Step5Form1,
  Step5Form2,
} from './step.types';
import {
  accountNumberValidator,
  dateValidator,
  emailValidator,
  israeliIdValidator,
  mobilePhoneValidator,
  zipCodeValidator,
} from './validators';

export function createStep1Form1(fb: FormBuilder): Step1Form1 {
  const form = fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    lastName: ['', [Validators.required, Validators.pattern(/^[א-ת\s-]+$/)]],
    governmentId: [
      '314327735',
      [
        Validators.required,
        Validators.pattern(/^\d+$/),
        Validators.maxLength(9),
        Validators.minLength(9),
        israeliIdValidator,
      ],
    ],
    mobile: [
      '0549452396',
      [Validators.required, Validators.pattern(/^\d+$/), mobilePhoneValidator],
    ],
  });

  form.controls.governmentId.disable();
  form.controls.mobile.disable();

  return form;
}

export function createStep2Form1(fb: FormBuilder): Step2Form1 {
  const form = fb.nonNullable.group({
    loanAmount: ['', Validators.required],
    numberOfPayments: [
      2,
      [Validators.required, Validators.min(2), Validators.max(20)],
    ],
    linkageType: ['', Validators.required],
    monthlyPayment: [{ value: '', disabled: true }],
  });

  return form;
}

export function createStep2Form2(fb: FormBuilder): Step2Form2 {
  return fb.nonNullable.group({
    monthlyChargeDate: [
      '',
      [
        Validators.required,
        Validators.min(1),
        Validators.max(28),
        Validators.minLength(1),
        Validators.maxLength(2),
      ],
    ],
    loanBeneficiary: ['', [Validators.required]],
    /* bank: ['', [Validators.required, Validators.pattern(/^\d+$/)]],
    branchNumber: ['', [Validators.required, Validators.pattern(/^\d+$/)]], */
    bank: fb.nonNullable.control('', Validators.required),
    branchNumber: fb.nonNullable.control(
      { value: '', disabled: true },
      Validators.required,
    ),
    accountNumber: ['', [Validators.required, accountNumberValidator]],
  });
}

export function createStep3Form1(fb: FormBuilder): Step3Form1 {
  return fb.group({
    idIssueDate: fb.nonNullable.control('', {
      validators: [Validators.required, dateValidator],
    }),
    idExpiryDate: fb.nonNullable.control('', {
      validators: [Validators.required, dateValidator],
    }),
    biometricId: fb.control<boolean | null>(null, Validators.required),
    birthDate: fb.nonNullable.control('', {
      validators: [Validators.required, dateValidator],
    }),
    // birthCountry: fb.nonNullable.control('', Validators.required),
    birthCountry: fb.nonNullable.control('IL', Validators.required),
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
    creditReportConsentExpiryDate: createStep3Form11(fb),
  });
}

export function createStep3Form11(fb: FormBuilder): Step3Form11 {
  return fb.group({
    checked: fb.nonNullable.control(false),
    executedTransactionConsentExpiryDate: fb.nonNullable.control(''),
    nonExecutedTransactionConsentExpiryDate: fb.nonNullable.control(''),
  });
}

export function createStep3Form2(fb: FormBuilder): Step3Form2 {
  return fb.nonNullable.group({
    borrower1: fb.nonNullable.control(false, {
      validators: [Validators.requiredTrue],
    }),
  });
}

export function createStep3Form3(fb: FormBuilder): Step3Form3 {
  return fb.nonNullable.group({
    firstName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[א-ת\s-]+$/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[א-ת\s-]+$/),
      ],
    ],
    governmentId: [
      '',
      [
        Validators.required,
        Validators.maxLength(9),
        Validators.minLength(9),
        israeliIdValidator,
      ],
    ],
    monthlyIncome: [
      '',
      [Validators.required, Validators.pattern(/^\d{1,3}(,\d{3})*$/)],
    ],
  });
}

export function createStep3Form4(fb: FormBuilder): Step3Form4 {
  const form = fb.nonNullable.group({
    city: [
      'קרית גת',
      [
        Validators.minLength(3),
        Validators.maxLength(30),
        Validators.pattern(/^[א-ת\s-]+$/),
      ],
    ],
    street: [
      'נחל ירקון',
      [
        Validators.minLength(5),
        Validators.maxLength(35),
        Validators.pattern(/^[א-ת\s-]+$/),
      ],
    ],
    houseNumber: ['5', Validators.pattern(/^\d+$/)],
    entranceNumber: ['1', Validators.pattern(/^\d+$/)],
    apartmentNumber: ['76', Validators.pattern(/^\d+$/)],
    zipCode: ['8224705', [Validators.pattern(/^\d+$/)]],
    isMailingAddressDifferent: [false],
    differentMailingAddress: createStep3Form41(fb),
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
// { value: '', disabled: true }
export function createStep3Form41(fb: FormBuilder): Step3Form41 {
  return fb.nonNullable.group({
    city: ['', Validators.pattern(/^[א-ת\s-]+$/)],
    // street: fb.nonNullable.control('', [Validators.pattern(/^[א-ת\s-]+$/)]),
    street: fb.nonNullable.control({ value: '', disabled: true }, [
      Validators.pattern(/^[א-ת\s-]+$/),
    ]),
    houseNumber: [
      '',
      [
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern(/^\d+$/),
      ],
    ],
    entranceNumber: [
      '',
      [
        Validators.minLength(1),
        Validators.maxLength(2),
        Validators.pattern(/^\d+$/),
      ],
    ],
    apartmentNumber: [
      '',
      [
        Validators.minLength(1),
        Validators.maxLength(3),
        Validators.pattern(/^\d+$/),
      ],
    ],
    zipCode: ['', [Validators.pattern(/^\d+$/)]],
    poBoxNumber: [''],
  });
} // zipCodeValidator

/* 
tenureValue
workplaceType
salaryPaymentDayOptions
monthlyIncome
*/
export function createStep4Form1(fb: FormBuilder): Step4Form1 {
  return fb.nonNullable.group({
    // businessActivity: fb.nonNullable.control<string[]>([], Validators.required),
    businessActivity: ['', Validators.required],
    // fieldsOfOccupation: ['', Validators.required],
    employmentStatus: ['', Validators.required],
    tenureValue: [''],
    tenureUnit: ['שנים', Validators.required],
    workplaceType: [''],
    education: ['', Validators.required],
    salaryPaymentDay: [''],
    monthlyIncome: [''],
    additionalHouseholdIncome: ['', Validators.required],
    monthlyAlimonyExpense: ['', Validators.required],
    monthlyRentExpense: ['', Validators.required],
    hasOwnedApartment: ['', Validators.required],
  });
}

export function createCheckControl(
  fb: FormBuilder,
  checkedRequired = true,
): CheckControl {
  return fb.group({
    checked: fb.control<string | null>(
      null,
      checkedRequired ? Validators.required : null,
    ),
    value: fb.control<string | null>(null),
  });
}

/* export function createCheckControl(
  fb: FormBuilder,
  checkedRequired = true,
): CheckControl {
  return fb.group({
    checked: fb.control<boolean | null>(
      null,
      checkedRequired ? Validators.required : null,
    ),

    value: fb.control<string | null>(null),
  });
} */

export function createStep4Form2(fb: FormBuilder): Step4Form2 {
  return fb.nonNullable.group({
    publicPersonnel: createCheckControl(fb),
    familyMemberPublicPersonnel: createCheckControl(fb),
    additionalBeneficiaries: createCheckControl(fb),
    // nonIsraeliTaxResidency: createCheckControl(fb),
    nonIsraeliTaxResidency: fb.nonNullable.group({
      checked: fb.nonNullable.control(false),
      isUsCitizen: fb.nonNullable.control(false),
      isOtherCountryTaxResident: fb.nonNullable.control(false),
    }),
    usTaxResidency: createCheckControl(fb, false),
    notIsraeliTaxResidencyCountry: createCheckControl(fb, false),
    businessArea: fb.nonNullable.control('', Validators.required),
    marketingConsent: [false],
    bankNotifications: [false],
    notificationMethod: [1],
  });
}

/* export function createStep5Form1(fb: FormBuilder): Step5Form1 {
  return fb.nonNullable.group({
    documentUploaded: [false, Validators.requiredTrue],
  });
} */
export function createStep5Form1(fb: FormBuilder): Step5Form1 {
  return fb.nonNullable.group({});
}

export function createStep5Form2(fb: FormBuilder): Step5Form2 {
  return fb.nonNullable.group({});
}

/* export function createStep5Form2(fb: FormBuilder): Step5Form2 {
  return fb.nonNullable.group({
    agreed: fb.nonNullable.control(
      { value: false, disabled: true },
      Validators.requiredTrue,
    ),
  });
} */

export function createStep5Form3(fb: FormBuilder): FormGroup {
  return fb.group({});
}


export function createBankRequestForm(fb: FormBuilder) {
  return fb.nonNullable.group({
    firstName: ['גרמן', Validators.required],
    lastName: ['ישייב', Validators.required],
    governmentId: ['314327735', [Validators.required, israeliIdValidator]],
    mobile: ['0549452396', [Validators.required, mobilePhoneValidator]],
    email: ['german.isaev@gmail.com', [Validators.required, emailValidator]],

    loanAmount: ['50000', Validators.required],
    orderNumber: ['2356', Validators.required],

    linkageType: ['ייעוץ', Validators.required],
    loanType: ['צמודה למדד', Validators.required],
    serviceType: [true, Validators.required],
  });
}

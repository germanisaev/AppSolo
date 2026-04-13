import { FormControl, FormGroup } from "@angular/forms";

export type Step1Form1 = FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    governmentId: FormControl<string>;
    mobile: FormControl<string>;
}>;

export type Step2Form1 = FormGroup<{
    loanAmount: FormControl<string>;
    numberOfPayments: FormControl<string>;
    linkageType: FormControl<string>;
    monthlyPayment: FormControl<string>;
}>;

export type Step2Form2 = FormGroup<{
    monthlyChargeDate: FormControl<string>;
    loanBeneficiary: FormControl<string>;
    bank: FormControl<string>;
    branchNumber: FormControl<string>;
    accountNumber: FormControl<string>;
}>;

export type Step2Form31 = FormGroup<{
    checked: FormControl<string>;
    executedTransactionConsentExpiryDate: FormControl<string>;
    nonExecutedTransactionConsentExpiryDate: FormControl<string>;
}>;

export type Step2Form3 = FormGroup<{
    idIssueDate: FormControl<string>;
    idExpiryDate: FormControl<string>;
    biometricId: FormControl<string>;
    birthDate: FormControl<string>;
    birthCountry: FormControl<string>;
    gender: FormControl<string>;
    email: FormControl<string>;
    familyStatus: FormControl<string>;
    childreNumUnder18: FormControl<string>;
    creditReportConsentExpiryDate: Step2Form31;
}>;

export type Step3Form1 = FormGroup<{
    borrower1: FormControl<string>;
}>;

export type Step3Form2 = FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
    governmentId: FormControl<string>;
    monthlyIncome: FormControl<string>;
}>;

export type Step3Form3 = FormGroup<{
    city: FormControl<string>;
    street: FormControl<string>;
    houseNumber: FormControl<string>;
    entranceNumber: FormControl<string>;
    apartmentNumber: FormControl<string>;
    zipCode: FormControl<string>;
    isMailingAddressDifferent: FormControl<boolean>;
    differentMailingAddress: Step3Form31
}>;

export type Step3Form31 = FormGroup<{
    city: FormControl<string>;
    street: FormControl<string>;
    houseNumber: FormControl<string>;
    entranceNumber: FormControl<string>;
    apartmentNumber: FormControl<string>;
    zipCode: FormControl<string>;
    poBoxNumber: FormControl<string>;
}>;

export type Step4Form1 = FormGroup<{
    businessActivity: FormControl<string[]>;  // FormArray<FormControl<string>>
    fieldsOfOccupation: FormControl<string>;
    employmentStatus: FormControl<string>;
    tenureValue: FormControl<string>;
    tenureUnit: FormControl<string>;
    workplaceType: FormControl<string>;
    education: FormControl<string>;
    salaryPaymentDay: FormControl<string>;
    monthlyIncome: FormControl<string>;
    additionalHouseholdIncome: FormControl<string>;
    monthlyAlimonyExpense: FormControl<string>;
    monthlyRentExpense: FormControl<string>;
    hasOwnedApartment: FormControl<string>;
}>;

export type Step4Form2 = FormGroup<{
    publicPersonnel: CheckControl;
    familyMemberPublicPersonnel: CheckControl;
    additionalBeneficiaries: CheckControl;
    nonIsraeliTaxResidency: CheckControl;
    usTaxResidency: CheckControl;
    notIsraeliTaxResidencyCountry: CheckControl;
    marketingConsent: FormControl<boolean>;
    bankNotifications: FormControl<boolean>;
    notificationMethod: FormControl<number>;
}>;

export type CheckControl = FormGroup<{
    checked: FormControl<null>;
    value: FormControl<null>;
}>;

export type Step5Form1 = FormGroup<{
    documentUploaded: FormControl<boolean>;
}>;

export type Step5Form2 = FormGroup<{
    agreed: FormControl<boolean>;
}>;
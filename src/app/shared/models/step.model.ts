export interface StepMeta {
    step: number;
    title: string;
    formsCount: number;
}

export interface WizardStorageState {
    currentStep: number;
    currentForm: number;
    data: Record<string, unknown>;
}

export interface BankRequestDraft {
  firstName: string;
  lastName: string;
  governmentId: string;
  mobile: string;
  email: string;

  loanAmount: string;
  numberOfPayments: string;
  linkageType: string;

  loanBeneficiary: string;
  bank: string;
  branchNumber: string;
  accountNumber: string;

  orderNumber: string;
  loanType: string;
  serviceType: string;
}
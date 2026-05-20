import { FormControl, FormGroup } from '@angular/forms';

export enum StartWorkflowType {
  CompanyEmployee = 'companyEmployee',
  CustomerDirect = 'customerDirect',
  FutureFlow = 'futureFlow',
}

/* 
export interface CompanyDetails {
    requestStep1: RequestStep;
    requestStep2: RequestStep;
    requestStep3: RequestStep;
    initialLoanAmount: number;
    linkageType: LinkageType;
    minLoanAmount: number;
    maxLoanAmount: number;
    monthlyPaymentDayOptions: DropdownOption[];
    linkageTypes: LinkageType[];
    loanPlans: LoanPlan[];
    base64logo: string;
    editableFields?: {
        canEditLoanAmount: boolean;
        canEditLinkageType: boolean;
    };
}
*/

export type CompanyEmployeeStartForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  governmentId: FormControl<string>;
  mobile: FormControl<string>;
  email: FormControl<string>;
  loanAmount: FormControl<string>;
  linkageType: FormControl<string>;
  orderNumber: FormControl<string>;
  serviceType: FormControl<string>;
  privacyApproved: FormControl<boolean>;
}>;

export type CustomerDirectStartForm = FormGroup<{
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  governmentId: FormControl<string>;
  mobile: FormControl<string>;
}>;
import { FormControl, FormGroup } from "@angular/forms";

export type Step1Form1 = FormGroup<{
    firstName: FormControl<string>;
    lastName: FormControl<string>;
}>;

export type Step1Form2 = FormGroup<{
    phone: FormControl<string>;
    email: FormControl<string>;
}>;

export type Step1Form3 = FormGroup<{
    city: FormControl<string>;
    street: FormControl<string>;
}>;

export type Step2Form1 = FormGroup<{
    carBrand: FormControl<string>;
    carModel: FormControl<string>;
}>;

export type Step2Form2 = FormGroup<{
    year: FormControl<string>;
    color: FormControl<string>;
}>;

export type Step3Form1 = FormGroup<{
    borrower1: FormControl<string>;
}>;

export type Step3Form2 = FormGroup<{
    borrower2: FormControl<string>;
}>;

export type Step3Form3 = FormGroup<{
    borrower3: FormControl<string>;
}>;

export type Step3Form4 = FormGroup<{
    borrower4: FormControl<string>;
}>;

export type Step3Form5 = FormGroup<{
    borrower5: FormControl<string>;
}>;

export type Step3Form6 = FormGroup<{
    borrower6: FormControl<string>;
}>;

export type Step4Form1 = FormGroup<{
    bank: FormControl<string>;
    branch: FormControl<string>;
    account: FormControl<string>;
}>;

export type Step5Form1 = FormGroup<{
    documentUploaded: FormControl<boolean>;
}>;

export type Step5Form2 = FormGroup<{
    agreed: FormControl<boolean>;
}>;
import { Injectable, inject } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { StepMeta, WizardStorageState } from '../models/step.model';
import {
    Step1Form1,
    Step2Form1,
    Step2Form2,
    Step2Form3,
    Step3Form1,
    Step3Form2,
    Step3Form3,
    Step4Form1,
    Step4Form2,
    Step5Form1,
    Step5Form2
} from '../models/step.types';

@Injectable({ providedIn: 'root' })
export class WizardFlowService {
    private fb = inject(FormBuilder);
    private readonly storageKey = 'wizard-progress';

    readonly steps: Omit<StepMeta, 'formsCount'>[] = [
        { step: 1, title: 'Personal Info' },
        { step: 2, title: 'Car Details' },
        { step: 3, title: 'Borrowers' },
        { step: 4, title: 'Banking' },
        { step: 5, title: 'Documents' },
    ];

    readonly formSlugsByStep = {
        1: ['personal-details'],
        2: ['loan-amount', 'loan-account-setup', 'additional-personal-details'],
        3: ['account-setup-confirmation', 'spouse-details', 'address-details'],
        4: ['salary-details', 'personal-declarations'],
        5: ['loan-submission-completion', 'loan-summary'],
    } as const;

    getFormSlug(step: number, formIndex: number): string {
        const normalizedStep = this.normalizeStep(step) as keyof typeof this.formSlugsByStep;
        return this.formSlugsByStep[normalizedStep]?.[formIndex - 1] ?? `step${step}-form${formIndex}`;
    }

    getAllRawValue(): Record<string, Array<Record<string, unknown>>> {
        const result: Record<string, Array<Record<string, unknown>>> = {};

        this.steps.forEach(({ step }) => {
            const stepKey = step as keyof typeof this.formsByStep;

            result[`step${step}`] = this.formsByStep[stepKey].map((form, index) => ({
                [this.getFormSlug(step, index + 1)]: form.getRawValue(),
            }));
        });

        return result;
    }

    readonly formsByStep = {
        1: [
            this.fb.nonNullable.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
                governmentId: [{ value: '123456789', disabled: true }, Validators.required],
                mobile: [{ value: '0541234567', disabled: true }, Validators.required],
            }) as Step1Form1,
        ],
        2: [
            this.fb.nonNullable.group({
                loanAmount: [''],
                numberOfPayments: ['', Validators.required],
                linkageType: [{ value: '', disabled: true }],
                monthlyPayment: [{ value: '', disabled: true }],

            }) as Step2Form1,
            this.fb.nonNullable.group({
                monthlyChargeDate: ['', Validators.required],
                loanBeneficiary: ['', Validators.required],
                bank: ['', Validators.required],
                branchNumber: ['', Validators.required],
                accountNumber: ['', Validators.required],
            }) as Step2Form2,
            this.fb.nonNullable.group({
                idIssueDate: ['', Validators.required],
                idExpiryDate: ['', Validators.required],
                biometricId: ['', Validators.required],
                birthDate: ['', Validators.required],
                birthCountry: ['', Validators.required],
                gender: ['', Validators.required],
                email: ['', Validators.required],
                familyStatus: ['', Validators.required],
                childreNumUnder18: ['', Validators.required],
                creditReportConsentExpiryDate: this.fb.nonNullable.group({
                    checked: [''],
                    executedTransactionConsentExpiryDate: [''],
                    nonExecutedTransactionConsentExpiryDate: [''],
                }),
            }) as Step2Form3,
        ],
        3: [
            this.fb.nonNullable.group({
                borrower1: ['', Validators.required],
            }) as Step3Form1,
            this.fb.nonNullable.group({
                firstName: [''],
                lastName: [''],
                governmentId: [''],
                monthlyIncome: [''],
            }) as Step3Form2,
            this.fb.nonNullable.group({
                city: [{ value: '', disabled: true }],
                street: [{ value: '', disabled: true }],
                houseNumber: [{ value: '', disabled: true }],
                entranceNumber: [{ value: '', disabled: true }],
                apartmentNumber: [{ value: '', disabled: true }],
                zipCode: [{ value: '', disabled: true }],
                isMailingAddressDifferent: [false],
                differentMailingAddress: this.fb.group({
                    city: [''],
                    street: [{ value: '', disabled: true }],
                    houseNumber: [''],
                    entranceNumber: [''],
                    apartmentNumber: [''],
                    zipCode: [''],
                    poBoxNumber: [''],
                }),
            }) as Step3Form3,
        ],
        4: [
            this.fb.nonNullable.group({
                businessActivity: [[] as string[], [Validators.required]],
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
            }) as Step4Form1,
            this.fb.nonNullable.group({
                publicPersonnel: this.fb.group({
                    checked: [null, Validators.required],
                    value: [null],
                }),
                familyMemberPublicPersonnel: this.fb.group({
                    checked: [null, Validators.required],
                    value: [null],
                }),
                additionalBeneficiaries: this.fb.group({
                    checked: [null, Validators.required],
                    value: [null],
                }),
                nonIsraeliTaxResidency: this.fb.group({
                    checked: [null, Validators.required],
                    value: [null],
                }),
                usTaxResidency: this.fb.group({
                    checked: [null],
                    value: [null],
                }),
                notIsraeliTaxResidencyCountry: this.fb.group({
                    checked: [null],
                    value: [null],
                }),
                marketingConsent: [false],
                bankNotifications: [false],
                notificationMethod: [1]
            }) as Step4Form2,
        ],
        5: [
            this.fb.nonNullable.group({
                documentUploaded: [false, Validators.requiredTrue],
            }) as Step5Form1,
            this.fb.nonNullable.group({
                agreed: [false, Validators.requiredTrue],
            }) as Step5Form2,
        ],
    } as const;

    constructor() {
        this.restoreProgress();
        // this.registerAutoSave();
    }

    getFormsCount(step: number): number {
        return this.formsByStep[step as keyof typeof this.formsByStep]?.length ?? 0;
    }

    getSteps(): StepMeta[] {
        return this.steps.map(step => ({
            ...step,
            formsCount: this.getFormsCount(step.step)
        }));
    }

    getForm(step: number, formIndex: number): FormGroup | null {
        const forms = this.formsByStep[step as keyof typeof this.formsByStep];
        return forms?.[formIndex - 1] ?? null;
    }

    normalizeStep(step: number): number {
        if (step < 1) return 1;
        if (step > this.steps.length) return this.steps.length;
        return step;
    }

    normalizeForm(step: number, formIndex: number): number {
        const total = this.getFormsCount(step);
        if (total <= 0) return 1;
        if (formIndex < 1) return 1;
        if (formIndex > total) return total;
        return formIndex;
    }

    markTouched(step: number, formIndex: number): void {
        const form = this.getForm(step, formIndex);
        form?.markAllAsTouched();
        form?.updateValueAndValidity();
    }

    isValid(step: number, formIndex: number): boolean {
        return this.getForm(step, formIndex)?.valid ?? false;
    }

    isStepCompleted(step: number): boolean {
        const total = this.getFormsCount(step);

        if (!total) {
            return false;
        }

        for (let i = 1; i <= total; i++) {
            if (!this.isValid(step, i)) {
                return false;
            }
        }

        return true;
    }

    canOpenStep(step: number): boolean {
        if (step <= 1) {
            return true;
        }

        for (let i = 1; i < step; i++) {
            if (!this.isStepCompleted(i)) {
                return false;
            }
        }

        return true;
    }

    getLastAllowedStep(): number {
        let lastAllowed = 1;

        for (let step = 1; step <= this.steps.length; step++) {
            if (this.canOpenStep(step)) {
                lastAllowed = step;
            } else {
                break;
            }
        }

        return lastAllowed;
    }

    getNextInStep(step: number, formIndex: number): { step: number; form: number } {
        const totalForms = this.getFormsCount(step);

        return {
            step,
            form: Math.min(formIndex + 1, totalForms),
        };
    }

    getPrevInStep(step: number, formIndex: number): { step: number; form: number } {
        return {
            step,
            form: Math.max(formIndex - 1, 1),
        };
    }

    /*  */
    getNextPosition(step: number, formIndex: number): { step: number; form: number } | null {
        const normalizedStep = this.normalizeStep(step);
        const totalForms = this.getFormsCount(normalizedStep);

        if (formIndex < totalForms) {
            return {
                step: normalizedStep,
                form: formIndex + 1,
            };
        }

        const nextStep = normalizedStep + 1;

        if (nextStep <= this.steps.length) {
            return {
                step: nextStep,
                form: 1,
            };
        }

        return null;
    }

    getPrevPosition(step: number, formIndex: number): { step: number; form: number } | null {
        const normalizedStep = this.normalizeStep(step);

        if (formIndex > 1) {
            return {
                step: normalizedStep,
                form: formIndex - 1,
            };
        }

        const prevStep = normalizedStep - 1;

        if (prevStep >= 1) {
            return {
                step: prevStep,
                form: this.getFormsCount(prevStep),
            };
        }

        return null;
    }

    /*  */
    saveCurrentPosition(step: number, form: number): void {
        const previousState = this.readStorageState();

        const nextState: WizardStorageState = {
            currentStep: step,
            currentForm: form,
            data: this.getAllRawValue(),
        };

        localStorage.setItem(
            this.storageKey,
            JSON.stringify({
                ...previousState,
                ...nextState,
            })
        );

        console.log(localStorage.getItem(this.storageKey));
    }

    getSavedPosition(): { step: number; form: number } {
        const state = this.readStorageState();

        if (!state) {
            return { step: 1, form: 1 };
        }

        const rawStep = this.normalizeStep(state.currentStep ?? 1);
        const step = this.canOpenStep(rawStep) ? rawStep : this.getLastAllowedStep();
        const form = this.normalizeForm(step, state.currentForm ?? 1);

        return { step, form };
    }

    clearProgress(): void {
        localStorage.removeItem(this.storageKey);
    }

    /* getAllRawValue() {
        return {
            step1: this.formsByStep[1].map((f) => f.getRawValue()),
            step2: this.formsByStep[2].map((f) => f.getRawValue()),
            step3: this.formsByStep[3].map((f) => f.getRawValue()),
            step4: this.formsByStep[4].map((f) => f.getRawValue()),
            // step5: this.formsByStep[5].map((f) => f.getRawValue()),
        };
    } */

    isStepValid(step: number): boolean {
        const normalizedStep = this.normalizeStep(step) as keyof typeof this.formsByStep;
        const forms = this.formsByStep[normalizedStep];

        return forms.every((form) => form.valid);
    }

    isStepAccessible(targetStep: number, currentStep: number): boolean {
        const normalizedTarget = this.normalizeStep(targetStep);
        const normalizedCurrent = this.normalizeStep(currentStep);

        // Назад и на текущий шаг — всегда можно
        if (normalizedTarget <= normalizedCurrent) {
            return true;
        }

        // Вперед — только если все предыдущие шаги валидны
        for (let i = 1; i < normalizedTarget; i++) {
            if (!this.isStepValid(i)) {
                return false;
            }
        }

        return true;
    }

    /* private registerAutoSave(): void {
        const controls = Object.values(this.formsByStep)
            .flat()
            .map((form) => form as AbstractControl);

        merge(...controls.map((control) => control.valueChanges))
            .pipe(debounceTime(300))
            .subscribe((item) => {
                console.log(item);
                const state = this.readStorageState();

                this.saveCurrentPosition(
                    state?.currentStep ?? 1,
                    state?.currentForm ?? 1
                );
            });
    } */

    private extractFormValue(item: unknown): object | null {
        if (!item || typeof item !== 'object') {
            return null;
        }

        const values = Object.values(item as Record<string, unknown>);
        const first = values[0];

        return first && typeof first === 'object' ? (first as object) : null;
    }

    private restoreProgress(): void {
        const state = this.readStorageState();

        if (!state?.data) {
            return;
        }

        const data = state.data as Record<string, unknown>;

        this.patchStepData(1, data['step1'] as unknown[] | undefined);
        this.patchStepData(2, data['step2'] as unknown[] | undefined);
        this.patchStepData(3, data['step3'] as unknown[] | undefined);
        this.patchStepData(4, data['step4'] as unknown[] | undefined);
        this.patchStepData(5, data['step5'] as unknown[] | undefined);
    }

    /* private patchStepData(step: number, values?: unknown[]): void {
        if (!Array.isArray(values)) {
            return;
        }

        const forms = this.formsByStep[step as keyof typeof this.formsByStep];

        values.forEach((value, index) => {
            const form = forms?.[index];

            if (form && value && typeof value === 'object') {
                form.patchValue(value as object, { emitEvent: false });
            }
        });
    } */

    private patchStepData(step: number, values?: unknown[]): void {
        if (!Array.isArray(values)) {
            return;
        }

        const forms = this.formsByStep[step as keyof typeof this.formsByStep];

        values.forEach((item, index) => {
            const form = forms?.[index];
            const value = this.extractFormValue(item);

            if (form && value) {
                form.patchValue(value, { emitEvent: false });
            }
        });
    }

    private readStorageState(): WizardStorageState | null {
        try {
            const raw = localStorage.getItem(this.storageKey);
            return raw ? (JSON.parse(raw) as WizardStorageState) : null;
        } catch {
            return null;
        }
    }
}
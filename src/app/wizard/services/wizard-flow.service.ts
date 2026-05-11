import { Injectable, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  BankRequestDraft,
  StepMeta,
  WizardStorageState,
} from '../models/step.model';
import {
  createStep1Form1,
  createStep2Form1,
  createStep2Form2,
  createStep3Form1,
  createStep3Form2,
  createStep3Form3,
  createStep3Form4,
  createStep4Form1,
  createStep4Form2,
  createStep5Form1,
  createStep5Form2,
  createStep5Form3,
} from '../models/forms.factory';
import { delay } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WizardFlowService {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  private readonly storageKey = 'wizard-progress';
  private introCompleted = false;
  readonly showLoanBlockedPopup$ = new BehaviorSubject<boolean>(false);

  readonly steps: Omit<StepMeta, 'formsCount'>[] = [
    { step: 1, title: 'מילוי פרטים אישיים' },
    { step: 2, title: 'נתוני הלוואה' },
    { step: 3, title: 'המשך מילוי פרטים אישיים' },
    { step: 4, title: 'נתונים נוספים' },
    { step: 5, title: 'סיום' },
  ];

  readonly formSlugsByStep = {
    1: ['personal-details'],
    2: ['loan-amount', 'loan-account-setup'],
    3: [
      'additional-personal-details',
      'account-setup-confirmation',
      'spouse-details',
      'address-details',
    ],
    4: ['salary-details', 'personal-declarations'],
    5: ['loan-submission-completion', 'loan-summary', 'loan-final-details'],
  } as const;

  completeIntro(): void {
    this.introCompleted = true;
    sessionStorage.setItem('introCompleted', 'true');
  }

  isIntroCompleted(): boolean {
    return (
      this.introCompleted || sessionStorage.getItem('introCompleted') === 'true'
    );
  }

  getFormSlug(step: number, formIndex: number): string {
    const normalizedStep = this.normalizeStep(
      step,
    ) as keyof typeof this.formSlugsByStep;
    return (
      this.formSlugsByStep[normalizedStep]?.[formIndex - 1] ??
      `step${step}-form${formIndex}`
    );
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

  saveForm(step: number, formIndex: number, value: unknown) {
    return this.http
      .post('https://jsonplaceholder.typicode.com/posts', {
        step,
        formIndex,
        value,
      })
      .pipe(delay(500));
  }

  readonly formsByStep = {
    1: [createStep1Form1(this.fb)],
    2: [createStep2Form1(this.fb), createStep2Form2(this.fb)],
    3: [
      createStep3Form1(this.fb),
      createStep3Form2(this.fb),
      createStep3Form3(this.fb),
      createStep3Form4(this.fb),
    ],
    4: [createStep4Form1(this.fb), createStep4Form2(this.fb)],
    5: [
      createStep5Form1(this.fb),
      createStep5Form2(this.fb),
      createStep5Form3(this.fb),
    ],
  } as const;

  constructor() {
    this.restoreProgress();
    // this.registerAutoSave();
  }

  patchBankRequestData(data: BankRequestDraft): void {
    this.clearProgress();

    this.formsByStep[1][0].patchValue(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        governmentId: data.governmentId,
        mobile: data.mobile,
      },
      { emitEvent: false },
    );

    this.formsByStep[2][0].patchValue(
      {
        loanAmount: data.loanAmount,
        numberOfPayments: Number(data.numberOfPayments),
        linkageType: data.linkageType,
      },
      { emitEvent: false },
    );

    this.formsByStep[2][1].patchValue(
      {
        loanBeneficiary: data.loanBeneficiary,
        bank: data.bank,
        branchNumber: data.branchNumber,
        accountNumber: data.accountNumber,
      },
      { emitEvent: false },
    );

    this.formsByStep[3][0].patchValue(
      {
        email: data.email,
        birthCountry: 'IL',
      },
      { emitEvent: false },
    );

    this.saveCurrentPosition(1, 1);

    localStorage.setItem(
      'wizard-progress',
      JSON.stringify({
        current: { step: 1, form: 1 },
        data: this.getAllRawValue(),
      }),
    );
  }

  isUsTaxResident(): boolean {
    const form = this.formsByStep[4][1] as any;
    const raw = form?.getRawValue?.() ?? {};

    return raw.nonIsraeliTaxResidency?.isUsCitizen === true;
  }

  getFormsCount(step: number): number {
    return this.formsByStep[step as keyof typeof this.formsByStep]?.length ?? 0;
  }

  getSteps(): StepMeta[] {
    return this.steps.map((step) => ({
      ...step,
      formsCount: this.getFormsCount(step.step),
    }));
  }

  getForm(step: number, formIndex: number): FormGroup {
    const normalizedStep = this.normalizeStep(step);
    const normalizedForm = this.normalizeForm(normalizedStep, formIndex);

    const form =
      this.formsByStep[normalizedStep as keyof typeof this.formsByStep]?.[
        normalizedForm - 1
      ];

    if (!form) {
      throw new Error(`Form not found: step=${step}, form=${formIndex}`);
    }

    return form as FormGroup;
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

  getNextInStep(
    step: number,
    formIndex: number,
  ): { step: number; form: number } {
    const totalForms = this.getFormsCount(step);

    return {
      step,
      form: Math.min(formIndex + 1, totalForms),
    };
  }

  getPrevInStep(
    step: number,
    formIndex: number,
  ): { step: number; form: number } {
    return {
      step,
      form: Math.max(formIndex - 1, 1),
    };
  }

  getNextPosition(
    step: number,
    formIndex: number,
  ): { step: number; form: number } | null {
    const normalizedStep = this.normalizeStep(step);

    if (normalizedStep === 4 && formIndex === 2) {
      return {
        step: 5,
        form: 2,
      };
    }

    if (normalizedStep === 5 && (formIndex === 1 || formIndex === 2)) {
      return {
        step: 5,
        form: 3,
      };
    }

    if (normalizedStep === 3 && formIndex === 2 && !this.isMarried()) {
      return {
        step: 3,
        form: 4,
      };
    }

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

  getPrevPosition(
    step: number,
    formIndex: number,
  ): { step: number; form: number } | null {
    const normalizedStep = this.normalizeStep(step);

    if (normalizedStep === 3 && formIndex === 4 && !this.isMarried()) {
      return {
        step: 3,
        form: 2,
      };
    }

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

    if (normalizedStep === 5 && formIndex === 3) {
      return {
        step: 5,
        form: 1,
      };
    }

    return null;
  }

  /* isStepValidForNavigation(step: number): boolean {
    const forms = this.formsByStep[step as keyof typeof this.formsByStep];

    if (!forms) {
      return false;
    }

    return forms.every((form, index) => {
      const formNumber = index + 1;

      if (step === 3 && formNumber === 3 && !this.isMarried()) {
        return true;
      }

      return form.valid;
    });
  } */
  isStepValidForNavigation(step: number): boolean {
    const normalizedStep = this.normalizeStep(step);
    const forms =
      this.formsByStep[normalizedStep as keyof typeof this.formsByStep];

    return forms.every((form, index) => {
      const formNumber = index + 1;

      if (normalizedStep === 3 && formNumber === 3 && !this.isMarried()) {
        return true;
      }

      return form.valid;
    });
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
      }),
    );

    console.log(localStorage.getItem(this.storageKey));
  }

  getSavedPosition(): { step: number; form: number } {
    const state = this.readStorageState();

    if (!state) {
      return { step: 1, form: 1 };
    }

    const rawStep = this.normalizeStep(state.currentStep ?? 1);
    const step = this.canOpenStep(rawStep)
      ? rawStep
      : this.getLastAllowedStep();
    const form = this.normalizeForm(step, state.currentForm ?? 1);

    return { step, form };
  }

  clearProgress(): void {
    localStorage.removeItem(this.storageKey);
  }

  isStepValid(step: number): boolean {
    const normalizedStep = this.normalizeStep(
      step,
    ) as keyof typeof this.formsByStep;
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

  private patchStepData(step: number, values?: unknown[]): void {
    if (!Array.isArray(values)) {
      return;
    }

    const forms = this.formsByStep[step as keyof typeof this.formsByStep];

    values.forEach((item, index) => {
      const form = forms?.[index];
      const value = this.extractFormValue(item);

      if (!form || !value) {
        return;
      }

      const normalizedValue = this.normalizePatchValue(value);
      form.patchValue(normalizedValue, { emitEvent: false });
    });
  }

  private normalizePatchValue(value: any): any {
    if (!value) {
      return value;
    }

    return {
      ...value,

      birthCountry: value.birthCountry || 'IL',

      creditReportConsentExpiryDate: value.creditReportConsentExpiryDate
        ? {
            ...value.creditReportConsentExpiryDate,
            checked:
              typeof value.creditReportConsentExpiryDate.checked === 'boolean'
                ? value.creditReportConsentExpiryDate.checked
                : false,
          }
        : value.creditReportConsentExpiryDate,
    };
  }

  private readStorageState(): WizardStorageState | null {
    try {
      const raw = localStorage.getItem(this.storageKey);
      return raw ? (JSON.parse(raw) as WizardStorageState) : null;
    } catch {
      return null;
    }
  }

  private isMarried(): boolean {
    const step3Forms = this.formsByStep[3] as unknown as any[];
    const step3Form1 = step3Forms?.[0];

    return step3Form1?.controls?.familyStatus?.value === 'married';
  }
}

import { Injectable, inject } from '@angular/core';
import {
    AbstractControl,
    FormBuilder,
    FormGroup,
    Validators,
} from '@angular/forms';
import { merge } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { StepMeta, WizardStorageState } from '../models/step.model';
import { Step1Form1, Step1Form2, Step1Form3, Step2Form1, Step2Form2, Step3Form1, Step3Form2, Step3Form3, Step3Form4, Step3Form5, Step3Form6, Step4Form1, Step5Form1, Step5Form2 } from '../models/step.types';

@Injectable({ providedIn: 'root' })
export class WizardFlowService {
    private fb = inject(FormBuilder);
    private readonly storageKey = 'wizard-progress';

    readonly steps: StepMeta[] = [
        { step: 1, title: 'Personal Info', formsCount: 3 },
        { step: 2, title: 'Car Details', formsCount: 2 },
        { step: 3, title: 'Borrowers', formsCount: 6 },
        { step: 4, title: 'Banking', formsCount: 1 },
        { step: 5, title: 'Documents', formsCount: 2 },
    ];

    readonly formsByStep = {
        1: [
            this.fb.nonNullable.group({
                firstName: ['', Validators.required],
                lastName: ['', Validators.required],
            }) as Step1Form1,
            this.fb.nonNullable.group({
                phone: ['', Validators.required],
                email: [''],
            }) as Step1Form2,
            this.fb.nonNullable.group({
                city: [''],
                street: [''],
            }) as Step1Form3,
        ],
        2: [
            this.fb.nonNullable.group({
                carBrand: ['', Validators.required],
                carModel: ['', Validators.required],
            }) as Step2Form1,
            this.fb.nonNullable.group({
                year: [''],
                color: [''],
            }) as Step2Form2,
        ],
        3: [
            this.fb.nonNullable.group({
                borrower1: ['', Validators.required],
            }) as Step3Form1,
            this.fb.nonNullable.group({
                borrower2: [''],
            }) as Step3Form2,
            this.fb.nonNullable.group({
                borrower3: [''],
            }) as Step3Form3,
            this.fb.nonNullable.group({
                borrower4: [''],
            }) as Step3Form4,
            this.fb.nonNullable.group({
                borrower5: [''],
            }) as Step3Form5,
            this.fb.nonNullable.group({
                borrower6: [''],
            }) as Step3Form6
        ],
        4: [
            this.fb.nonNullable.group({
                bank: ['', Validators.required],
                branch: [''],
                account: [''],
            }) as Step4Form1,
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
        this.registerAutoSave();
    }

    getSteps(): StepMeta[] {
        return this.steps;
    }

    getFormsCount(step: number): number {
        return this.formsByStep[step as keyof typeof this.formsByStep]?.length ?? 0;
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

    getAllRawValue() {
        return {
            step1: this.formsByStep[1].map((f) => f.getRawValue()),
            step2: this.formsByStep[2].map((f) => f.getRawValue()),
            step3: this.formsByStep[3].map((f) => f.getRawValue()),
            step4: this.formsByStep[4].map((f) => f.getRawValue()),
            step5: this.formsByStep[5].map((f) => f.getRawValue()),
        };
    }

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

    private registerAutoSave(): void {
        const controls = Object.values(this.formsByStep)
            .flat()
            .map((form) => form as AbstractControl);

        merge(...controls.map((control) => control.valueChanges))
            .pipe(debounceTime(300))
            .subscribe(() => {
                const state = this.readStorageState();

                this.saveCurrentPosition(
                    state?.currentStep ?? 1,
                    state?.currentForm ?? 1
                );
            });
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

        values.forEach((value, index) => {
            const form = forms?.[index];

            if (form && value && typeof value === 'object') {
                form.patchValue(value as object, { emitEvent: false });
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
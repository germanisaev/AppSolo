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
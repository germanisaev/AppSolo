import { StartWorkflowType } from "./workflow.types";

export type StartFieldName =
  | 'firstName'
  | 'lastName'
  | 'governmentId'
  | 'mobile'
  | 'email'
  | 'loanAmount'
  | 'linkageType'
  | 'orderNumber'
  | 'serviceType';

export interface StartFieldConfig {
  name: StartFieldName;
  label: string;
  type: 'text' | 'email' | 'select';
  required: boolean;
}

export const COMPANY_EMPLOYEE_FIELDS: StartFieldConfig[] = [
  { name: 'firstName', label: 'שם פרטי', type: 'text', required: true },
  { name: 'lastName', label: 'שם משפחה', type: 'text', required: true },
  { name: 'governmentId', label: 'מספר ת״ז', type: 'text', required: true },
  { name: 'mobile', label: 'טלפון נייד', type: 'text', required: true },
  { name: 'email', label: 'כתובת דוא״ל', type: 'email', required: true },
  { name: 'linkageType', label: 'סוג הצמדה', type: 'text', required: true },
  { name: 'loanAmount', label: 'סכום ההלוואה המבוקשת', type: 'text', required: true },
  { name: 'orderNumber', label: 'מספר הזמנה', type: 'text', required: true },
  { name: 'serviceType', label: 'סוג השירות', type: 'text', required: true },
];

export const CUSTOMER_DIRECT_FIELDS: StartFieldConfig[] = [
  { name: 'firstName', label: 'שם פרטי', type: 'text', required: true },
  { name: 'lastName', label: 'שם משפחה', type: 'text', required: true },
  { name: 'governmentId', label: 'מספר ת״ז', type: 'text', required: true },
  { name: 'mobile', label: 'טלפון נייד', type: 'text', required: true },
];

export interface StartWorkflowConfig {
  type: StartWorkflowType;
  fields: StartFieldConfig[];
  showPrivacyCheckbox: boolean;
  submitButtonText: string;
  afterSubmitAction: 'sendSmsAndShowSuccess' | 'goToIntro' | 'custom';
}

export const START_WORKFLOW_CONFIG: Record<StartWorkflowType, StartWorkflowConfig> = {
  [StartWorkflowType.CompanyEmployee]: {
    type: StartWorkflowType.CompanyEmployee,
    fields: COMPANY_EMPLOYEE_FIELDS,
    showPrivacyCheckbox: true,
    submitButtonText: 'שליחת קישור ללקוח',
    afterSubmitAction: 'sendSmsAndShowSuccess',
  },

  [StartWorkflowType.CustomerDirect]: {
    type: StartWorkflowType.CustomerDirect,
    fields: CUSTOMER_DIRECT_FIELDS,
    showPrivacyCheckbox: false,
    submitButtonText: 'המשך',
    afterSubmitAction: 'goToIntro',
  },

  [StartWorkflowType.FutureFlow]: {
    type: StartWorkflowType.FutureFlow,
    fields: [],
    showPrivacyCheckbox: false,
    submitButtonText: 'המשך',
    afterSubmitAction: 'custom',
  },
};
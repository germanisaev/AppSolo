import { Step1Form1Component } from './step1-form1.component';

import { Step2Form1Component } from './step2-form1.component';
import { Step2Form2Component } from './step2-form2.component';
import { Step2Form3Component } from './step2-form3.component';

import { Step3Form1Component } from './step3-form1.component';
import { Step3Form2Component } from './step3-form2.component';
import { Step3Form3Component } from './step3-form3.component';

import { Step4Form1Component } from './step4-form1.component';
import { Step4Form2Component } from './step4-form2.component';

import { Step5Form1Component } from './step5-form1.component';
import { Step5Form2Component } from './step5-form2.component';

export {
    Step1Form1Component,
    Step2Form1Component,
    Step2Form2Component,
    Step2Form3Component,
    Step3Form1Component,
    Step3Form2Component,
    Step3Form3Component,
    Step4Form1Component,
    Step4Form2Component,
    Step5Form1Component,
    Step5Form2Component,
};

export const WIZARD_FORM_COMPONENTS = [
    Step1Form1Component,
    Step2Form1Component,
    Step2Form2Component,
    Step2Form3Component,
    Step3Form1Component,
    Step3Form2Component,
    Step3Form3Component,
    Step4Form1Component,
    Step4Form2Component,
    Step5Form1Component,
    Step5Form2Component,
] as const;
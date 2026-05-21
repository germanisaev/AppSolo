import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WizardFlowService } from '../services';

export const wizardStepGuard: CanActivateFn = (route) => {
  const flow = inject(WizardFlowService);
  const router = inject(Router);

  const stepParam = Number(route.paramMap.get('step') ?? 1);
  const step = flow.normalizeStep(stepParam);

  console.log('wizardStepGuard executed, step:', step);
  console.log('GUARD STEP:', step);
  console.log('CAN OPEN:', flow.canOpenStep(step));
  console.log('LAST ALLOWED:', flow.getLastAllowedStep());

  if (flow.canOpenStep(step)) {
    return true;
  }

  const allowedStep = flow.getLastAllowedStep();

  return router.createUrlTree(['/customer/wizard/step', allowedStep], {
    queryParams: { form: 1 },
  });
};

// export const wizardStepGuard: CanActivateFn = (route) => {
//     const flow = inject(WizardFlowService);
//     const router = inject(Router);

//     const stepParam = Number(route.paramMap.get('step') ?? 1);
//     const step = flow.normalizeStep(stepParam);

//     if (flow.canOpenStep(step)) {
//         return true;
//     }

//     const allowedStep = flow.getLastAllowedStep();

//     return router.createUrlTree(['/wizard/step', allowedStep], {
//         queryParams: { form: 1 },
//     });
// };

import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WizardFlowService } from '../services';

export const introCompletedGuard: CanActivateFn = () => {
  const flow = inject(WizardFlowService);
  const router = inject(Router);

  console.log('introCompletedGuard executed, intro completed:', flow.isIntroCompleted());

  if (flow.isIntroCompleted()) {
    return true;
  }

  return router.createUrlTree(['/customer/intro']);
};

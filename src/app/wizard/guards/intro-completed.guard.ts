import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WizardFlowService } from '../services/wizard-flow.service';

export const introCompletedGuard: CanActivateFn = () => {
  const flow = inject(WizardFlowService);
  const router = inject(Router);

  if (flow.isIntroCompleted()) {
    return true;
  }

  return router.createUrlTree(['/wizard/intro']);
};

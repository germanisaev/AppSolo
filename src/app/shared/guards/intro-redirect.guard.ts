import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WizardFlowService } from '../services';

export const introRedirectGuard: CanActivateFn = () => {
  const flow = inject(WizardFlowService);
  const router = inject(Router);

  if (!flow.isIntroCompleted()) {
    return true;
  }

  const saved = flow.getSavedPosition();

  return router.createUrlTree(['/customer/wizard/step', saved.step], {
    queryParams: { form: saved.form },
  });
};

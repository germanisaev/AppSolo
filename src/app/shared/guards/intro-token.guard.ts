import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const introTokenGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = route.queryParamMap.get('token');

  console.log('introTokenGuard url:', state.url);
  console.log('introTokenGuard token:', token);

  if (token === 'secure-token-xyz') {
    return true;
  }

  return router.createUrlTree(['/customer/start']);
};

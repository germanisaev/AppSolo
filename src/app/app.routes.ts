import { Routes } from '@angular/router';
import { CUSTOMER_ROUTES } from './wizard/components/customer-shell/customer.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'wizard',
    pathMatch: 'full',
  },
  {
    path: 'wizard',
    children: CUSTOMER_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'wizard',
  },
];
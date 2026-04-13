import { Routes } from '@angular/router';
import { CustomerShellComponent } from './customer-shell.component';
import { WIZARD_ROUTES } from '../../wizard/wizard.routes';

export const CUSTOMER_ROUTES: Routes = [
  {
    path: '',
    component: CustomerShellComponent,
    children: WIZARD_ROUTES,
  },
];
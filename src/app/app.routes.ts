import { Routes } from '@angular/router';
import { WIZARD_ROUTES } from './wizard/wizard.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'wizard',
    pathMatch: 'full',
  },
  {
    path: 'wizard',
    children: WIZARD_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'wizard',
  },
];
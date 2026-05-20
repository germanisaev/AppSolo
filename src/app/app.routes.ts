import { Routes } from '@angular/router';
import { CustomerShellComponent } from './components/customer-shell/customer-shell.component';
import { WIZARD_ROUTES } from './wizard/wizard.routes';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'customer/start',
    pathMatch: 'full',
  },
  {
    path: 'customer',
    component: CustomerShellComponent,
    children: WIZARD_ROUTES,
  },
  {
    path: '**',
    redirectTo: 'customer/start',
  },
];

// export const routes: Routes = [
//   {
//     path: '',
//     redirectTo: 'customer/start',
//     pathMatch: 'full',
//   },
//   {
//     path: 'customer',
//     component: CustomerShellComponent,
//     children: WIZARD_ROUTES,
//   },
//   {
//     path: '**',
//     redirectTo: 'customer/start',
//   },
// ];

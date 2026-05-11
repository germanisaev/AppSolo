import { Routes } from '@angular/router';
import { WizardShellComponent } from './components/wizard-shell.component';
import { WizardStepPageComponent } from './components/wizard-step-page/wizard-step-page.component';
import { wizardStepGuard } from './guards/wizard-step.guard';

/* export const WIZARD_ROUTES: Routes = [
  {
    path: '',
    component: WizardShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'step/1',
        pathMatch: 'full',
      },
      {
        path: 'step/:step',
        component: WizardStepPageComponent,
        canActivate: [wizardStepGuard],
      },
    ],
  },
]; */
export const WIZARD_ROUTES: Routes = [
  {
    path: 'start',
    loadComponent: () =>
      import('./components/wizard-start/wizard-start.component').then(
        (m) => m.WizardStartComponent,
      ),
  },
  {
    path: '',
    component: WizardShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'step/1',
        pathMatch: 'full',
      },
      {
        path: 'step/:step',
        component: WizardStepPageComponent,
        canActivate: [wizardStepGuard],
      },
    ],
  },
];

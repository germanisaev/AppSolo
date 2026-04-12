import { Routes } from '@angular/router';
import { WizardShellComponent } from './components/wizard-shell.component';
import { WizardStepPageComponent } from './components/wizard-step-page/wizard-step-page.component';
import { wizardStepGuard } from './wizard-step.guard';

export const WIZARD_ROUTES: Routes = [
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
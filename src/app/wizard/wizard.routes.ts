import { Routes } from '@angular/router';
import { WizardShellComponent } from './components/wizard-shell.component';
import { WizardStepPageComponent } from './components/wizard-step-page/wizard-step-page.component';
import { wizardStepGuard } from '../shared/guards/wizard-step.guard';
import { WizardIntroComponent } from './components/wizard-intro.component';
import { introCompletedGuard } from '../shared/guards/intro-completed.guard';
import { WizardStartComponent } from './components/wizard-start/wizard-start.component';
import { introTokenGuard } from '../shared/guards/intro-token.guard';

export const WIZARD_ROUTES: Routes = [
  {
    path: 'start',
    component: WizardStartComponent,
  },
  {
    path: 'intro',
    component: WizardIntroComponent,
    canActivate: [introTokenGuard],
  },
  {
    path: 'wizard',
    component: WizardShellComponent,
    canActivate: [introCompletedGuard],
    children: [
      {
        path: 'step/:step',
        component: WizardStepPageComponent,
        canActivate: [wizardStepGuard],
      },
      {
        path: '',
        redirectTo: 'step/1',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'start',
    pathMatch: 'full',
  },
];

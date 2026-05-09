import { Routes } from '@angular/router';
import { CustomerShellComponent } from './components/customer-shell/customer-shell.component';
import { WizardIntroComponent } from './wizard/components/wizard-intro.component';
import { WizardShellComponent } from './wizard/components/wizard-shell.component';
import { introCompletedGuard } from './wizard/guards/intro-completed.guard';
import { WizardStepPageComponent } from './wizard/components/wizard-step-page/wizard-step-page.component';
import { introRedirectGuard } from './wizard/guards/intro-redirect.guard';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'wizard/intro',
    pathMatch: 'full',
  },
  {
    path: 'wizard',
    component: CustomerShellComponent,
    children: [
      {
        path: '',
        redirectTo: 'intro',
        pathMatch: 'full',
      },
      {
        path: 'intro',
        component: WizardIntroComponent,
        canActivate: [introRedirectGuard],
      },
      {
        path: '',
        component: WizardShellComponent,
        canActivate: [introCompletedGuard],
        children: [
          {
            path: 'step/:step',
            component: WizardStepPageComponent,
          },
        ],
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'wizard/intro',
  },
];
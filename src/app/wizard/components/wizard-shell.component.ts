
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WizardTimelineComponent } from './wizard-timeline.component';

@Component({
  selector: 'app-wizard-shell',
  imports: [RouterOutlet, WizardTimelineComponent],
  template: `
    <div class="wizard-page">
      <app-wizard-timeline></app-wizard-timeline>

      <main class="wizard-content">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .wizard-page {
      min-height: 100vh;
      padding: 32px 24px 40px;
      box-sizing: border-box;

      position: relative;
      overflow: hidden;

      /* фон */
      background: url('/background-bank.jpg') center / cover no-repeat;
    }

    .wizard-page::before {
      content: '';
      position: absolute;
      inset: 0;

      /* затемнение + стекло */
      background: rgba(255, 255, 255, 0.25);
      backdrop-filter: blur(4px);

      z-index: 0;
    }

      .wizard-content,
      app-wizard-timeline {
        position: relative;
        z-index: 1;
      }
  `],
})
export class WizardShellComponent { }
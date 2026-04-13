
import { Component, inject, Input } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WizardTimelineComponent } from './wizard-timeline.component';
import { ButtonModule } from 'primeng/button';
import { WizardFlowService } from '../services/wizard-flow.service';

@Component({
  selector: 'app-wizard-shell',
  imports: [RouterOutlet, WizardTimelineComponent, ButtonModule],
  template: `
    <div class="wizard-page">
      <div class="wizard-top">
        <div class="wizard-inner">
          <app-wizard-timeline></app-wizard-timeline>

          <main class="wizard-content">
            <router-outlet></router-outlet>
          </main>
        </div>
      </div>

      <div class="wizard-bottom-bg"></div>

      <!-- <div class="wiizar-buttons">
        <div class="actions">
          <p-button label="Back" icon="pi pi-arrow-left" severity="secondary" [outlined]="true"
            [disabled]="vm.step === 1 && vm.formIndex === 1" (onClick)="prev(vm.step, vm.formIndex)">
          </p-button>

          <p-button [label]="vm.step === 5 && vm.formIndex === vm.totalForms ? 'Finish' : 'Next'" icon="pi pi-arrow-right"
            iconPos="right" (onClick)="next(vm.step, vm.formIndex)">
          </p-button>
        </div>
      </div> -->
    </div>
  `,
  styles: [`
    /* .wizard-page {
      min-height: 100vh;
      position: relative;
      overflow: hidden;
      background: #f5f7fb;
    } */

    /* нижняя картинка */
    /* .wizard-page::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      height: 58vh;
      background: url('/background-customer.png') bottom center / 100% 100% no-repeat;
      z-index: 0;
    } */

    /* белая волна сверху картинки */
    /* .wizard-page::before {
      content: '';
      position: absolute;
      left: -8%;
      right: -8%;
      bottom: calc(58vh - 110px);
      height: 230px;
      background: #f5f7fb;
      border-bottom-left-radius: 55% 100%;
      border-bottom-right-radius: 55% 100%;
      z-index: 1;
    } */

      .wizard-page {
        background: transparent;
      }
    .wizard-inner {
      position: relative;
      z-index: 2;
      max-width: 1180px;
      margin: 0 auto;
      box-sizing: border-box;
    }

      .wizard-content,
      app-wizard-timeline {
        position: relative;
        z-index: 1;
      }
  `],
})
export class WizardShellComponent { 

  @Input() vm: any;
  animationDirection: 'next' | 'prev' = 'next';
  animationTick = 0;

  readonly flow = inject(WizardFlowService);
  private router = inject(Router);

  next(step: number, formIndex: number): void {
    this.animationDirection = 'next';

    this.flow.markTouched(step, formIndex);

    if (!this.flow.isValid(step, formIndex)) {
      return;
    }

    const next = this.flow.getNextInStep(step, formIndex);

    if (!next) {
      this.submitAll();
      return;
    }

    this.animationTick++;
    this.navigate(next.step, next.form);
  }

  prev(step: number, formIndex: number): void {
    this.animationDirection = 'prev';

    const prev = this.flow.getPrevInStep(step, formIndex);
    if (!prev) return;

    this.animationTick++;
    this.navigate(prev.step, prev.form);
  }

  private navigate(step: number, form: number): void {
    this.router.navigate(['/wizard/step', step], {
      queryParams: { form },
    });
  }

  private submitAll(): void {
    console.log('submit all', this.flow.getAllRawValue());
    alert('Wizard completed. Check console.');
  }
}
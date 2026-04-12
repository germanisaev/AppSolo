
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  inject,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, startWith } from 'rxjs/operators';
import { WizardFlowService } from '../services/wizard-flow.service';

@Component({
  selector: 'app-wizard-timeline',
  imports: [CommonModule],
  template: `
    <div class="stripe-timeline" #timeline>
      <div
        class="stripe-timeline__track"
        [style.left.px]="trackLeftPx"
        [style.width.px]="trackWidthPx">
      </div>

      <div
        class="stripe-timeline__progress"
        [style.left.px]="trackLeftPx"
        [style.width.px]="progressWidthPx">
      </div>

      <a
        *ngFor="let item of steps"
        class="stripe-step"
        [class.is-active]="item.step === currentStep"
        [class.is-completed]="item.step < currentStep"
        [class.is-locked]="!flow.isStepAccessible(item.step, currentStep)"
        (click)="goToStep(item.step, $event)"
      >
        <span class="stripe-step__circle">
          <ng-container *ngIf="item.step < currentStep; else currentOrLocked">
            <i class="pi pi-check"></i>
          </ng-container>

          <ng-template #currentOrLocked>
            <ng-container *ngIf="!flow.isStepAccessible(item.step, currentStep); else stepNumber">
              <i class="pi pi-lock"></i>
            </ng-container>
          </ng-template>

          <ng-template #stepNumber>
            <span class="stripe-step__number">{{ item.step }}</span>
          </ng-template>
        </span>

        <span class="stripe-step__label">
          {{ item.title }}
        </span>
      </a>
    </div>
    <div class="timeline-warning" *ngIf="showCurrentStepWarning()">
      <i class="pi pi-exclamation-circle"></i>
      <span>Complete the current step to unlock the next steps.</span>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
    }

    .stripe-timeline {
      --small-size: 22px;
      --active-size: 48px;
      --track-color: #d9e2ec;
      --progress-color: #635bff;
      --completed-color: #18c37e;
      --inactive-color: #bcc9d8;

      position: relative;
      max-width: 820px;
      margin: 0 auto;
      padding: 0 20px 24px;
      box-sizing: border-box;

      display: grid;
      grid-template-columns: repeat(5, 1fr);
      align-items: start;
    }

    .stripe-timeline__track,
    .stripe-timeline__progress {
      position: absolute;
      top: 40px;
      height: 3px;
      border-radius: 999px;
      pointer-events: none;
    }

    .stripe-timeline__track {
      background: var(--track-color);
    }

    .stripe-timeline__progress {
      background: linear-gradient(90deg, var(--progress-color), #7a73ff);
      transition: width 260ms ease, left 260ms ease;
    }

    .stripe-step {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-self: center;
      text-decoration: none;
      color: inherit;
      min-width: 72px;
    }

    .stripe-step__circle {
      width: var(--small-size);
      height: var(--small-size);
      margin-top: calc(40px - var(--small-size) / 2);
      border-radius: 50%;
      background: var(--track-color);
      /* background: var(--inactive-color); */

      display: flex;
      align-items: center;
      justify-content: center;

      transition:
        width 260ms ease,
        height 260ms ease,
        margin-top 260ms ease,
        background-color 260ms ease,
        box-shadow 260ms ease,
        transform 260ms ease;
    }

    .stripe-step__circle i {
      font-size: 9px;
      color: #fff;
      line-height: 1;
    }

    .stripe-step__number {
      opacity: 0;
      transform: scale(0.9);
      color: #fff;
      font-size: 18px;
      font-weight: 700;
      transition: opacity 180ms ease, transform 180ms ease;
    }

    .stripe-step__label {
      margin-top: 12px;
      min-height: 20px;
      font-size: 14px;
      font-weight: 600;
      line-height: 1.2;
      color: #0f172a;
      text-align: center;

      opacity: 0;
      transform: translateY(-6px);
      transition: opacity 220ms ease, transform 220ms ease;
    }

    .stripe-step.is-active .stripe-step__circle {
      width: var(--active-size);
      height: var(--active-size);
      margin-top: calc(40px - var(--active-size) / 2);
      background: var(--progress-color);
      box-shadow: 0 12px 28px rgba(99, 91, 255, 0.22);
    }

    .stripe-step.is-active .stripe-step__number {
      opacity: 1;
      transform: scale(1);
    }

    .stripe-step.is-active .stripe-step__label {
      opacity: 1;
      transform: translateY(0);
    }

    .stripe-step.is-completed .stripe-step__circle {
      background: var(--completed-color);
    }

    .timeline-warning {
      width: 50%;
      min-width: 620px;
      margin: 0 auto;
      margin-bottom: 1rem;
      padding: 10px 14px;

      display: flex;
      align-items: center;
      gap: 8px;

      background: #fef2f2;
      border: 1px solid #fecaca;
      border-radius: 12px;

      color: #991b1b;
      font-size: 13px;
      font-weight: 500;

      opacity: 0;
      transform: translateY(-12px);
      animation: fadeIn 0.45s ease forwards;
    }

    .timeline-warning i {
      font-size: 14px;
      color: #c2410c;
      flex-shrink: 0;
    }

    .stripe-step {
      cursor: pointer;
      transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .stripe-step.is-locked {
      cursor: not-allowed;
      opacity: 0.55;
    }

    .stripe-step.is-locked .stripe-step__circle {
      background: #64748b;
    }

    .stripe-step.is-locked .stripe-step__circle i {
      font-size: 10px;
      color: #ffffff;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @media (max-width: 768px) {
      .stripe-timeline {
        --small-size: 18px;
        --active-size: 42px;
        padding: 0 12px 20px;
      }

      .stripe-timeline__track,
      .stripe-timeline__progress {
        top: 32px;
      }

      .stripe-step__circle {
        margin-top: calc(32px - var(--small-size) / 2);
      }

      .stripe-step.is-active .stripe-step__circle {
        margin-top: calc(32px - var(--active-size) / 2);
      }

      .stripe-step__label {
        font-size: 12px;
        max-width: 74px;
      }

      .stripe-step__number {
        font-size: 16px;
      }
    }
  `],
})
export class WizardTimelineComponent implements AfterViewInit {
  private router = inject(Router);
  readonly flow = inject(WizardFlowService);

  @ViewChild('timeline', { static: true })
  timelineRef!: ElementRef<HTMLElement>;

  steps = this.flow.getSteps();
  currentStep = 1;

  trackLeftPx = 0;
  trackWidthPx = 0;
  progressWidthPx = 0;

  constructor() {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        startWith(null),
        map(() => this.extractStepFromUrl(this.router.url))
      )
      .subscribe((step) => {
        this.currentStep = this.flow.normalizeStep(step);
        requestAnimationFrame(() => this.recalculateLines());
      });
  }

  ngAfterViewInit(): void {
    requestAnimationFrame(() => this.recalculateLines());
  }

  @HostListener('window:resize')
  onResize(): void {
    this.recalculateLines();
  }

  goToStep(step: number, event: MouseEvent): void {
    event.preventDefault();

    if (!this.flow.isStepAccessible(step, this.currentStep)) {
      return;
    }

    this.router.navigate(['/wizard/step', step], {
      queryParams: { form: 1 },
    });
  }

  showCurrentStepWarning(): boolean {
    const isLastStep = this.currentStep === this.steps.length;

    return !isLastStep && !this.flow.isStepValid(this.currentStep);
  }

  private extractStepFromUrl(url: string): number {
    const cleanUrl = url.split('?')[0];
    const match = cleanUrl.match(/\/wizard\/step\/(\d+)/);
    return match ? Number(match[1]) : 1;
  }

  private recalculateLines(): void {
    const host = this.timelineRef?.nativeElement;
    if (!host) return;

    const circles = Array.from(
      host.querySelectorAll('.stripe-step__circle')
    ) as HTMLElement[];

    if (circles.length !== this.steps.length) return;

    const hostRect = host.getBoundingClientRect();
    const centers = circles.map((circle) => {
      const rect = circle.getBoundingClientRect();
      return rect.left - hostRect.left + rect.width / 2;
    });

    const firstCenter = centers[0];
    const lastCenter = centers[centers.length - 1];
    const activeCenter = centers[this.currentStep - 1];

    this.trackLeftPx = firstCenter;
    this.trackWidthPx = Math.max(0, lastCenter - firstCenter);
    this.progressWidthPx = Math.max(0, activeCenter - firstCenter);
  }
}
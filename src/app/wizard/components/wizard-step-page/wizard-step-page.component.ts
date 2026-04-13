
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { ButtonModule } from 'primeng/button';

import { WizardFlowService } from '../../services/wizard-flow.service';

import { WIZARD_FORM_COMPONENTS } from '../../forms';
import { animate, group, query, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-wizard-step-page',
  imports: [
    CommonModule,
    ButtonModule,
    ...WIZARD_FORM_COMPONENTS
  ],
  templateUrl: './wizard-step-page.component.html',
  styleUrl: './wizard-step-page.component.scss',
  animations: [
    trigger('slideForm', [
      transition('* => *', [
        query(
          ':enter, :leave',
          [
            style({
              position: 'absolute',
              width: '100%',
              top: 0,
              left: 0,
            }),
          ],
          { optional: true }
        ),
        group([
          query(
            ':leave',
            [
              animate(
                '260ms ease',
                style({
                  opacity: 0,
                  transform: 'translateX(-30px)',
                })
              ),
            ],
            { optional: true }
          ),
          query(
            ':enter',
            [
              style({
                opacity: 0,
                transform: 'translateX(30px)',
              }),
              animate(
                '260ms ease',
                style({
                  opacity: 1,
                  transform: 'translateX(0)',
                })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class WizardStepPageComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  readonly flow = inject(WizardFlowService);

  animationDirection: 'next' | 'prev' = 'next';
  animationTick = 0;

  getAnimationState(step: number, formIndex: number): string {
    return `${this.animationDirection}-${step}-${formIndex}-${this.animationTick}`;
  }

  readonly vm$ = combineLatest([
    this.route.paramMap.pipe(map((params) => Number(params.get('step') ?? 1))),
    this.route.queryParamMap.pipe(map((params) => Number(params.get('form') ?? 1))),
  ]).pipe(
    map(([stepParam, formParam]) => {
      const step = this.flow.normalizeStep(stepParam);
      const formIndex = this.flow.normalizeForm(step, formParam);
      const form = this.flow.getForm(step, formIndex) as FormGroup;

      return {
        step,
        formIndex,
        form,
        totalForms: this.flow.getFormsCount(step),
      };
    })
  );

  getFormKey(step: number, formIndex: number): string {
    return `${step}-${formIndex}`;
  }

  /* next(step: number, formIndex: number): void {
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
  } */

  /* next(step: number, formIndex: number): void {
    this.animationDirection = 'next';

    this.flow.markTouched(step, formIndex);

    if (!this.flow.isValid(step, formIndex)) {
      return;
    }

    const next = this.flow.getNextPosition(step, formIndex);

    if (!next) {
      this.submitAll();
      return;
    }

    this.animationTick++;
    this.navigate(next.step, next.form);
  }

  prev(step: number, formIndex: number): void {
    this.animationDirection = 'prev';

    const prev = this.flow.getPrevPosition(step, formIndex);

    if (!prev) {
      return;
    }

    this.animationTick++;
    this.navigate(prev.step, prev.form);
  } */

  next(step: number, formIndex: number): void {
    this.animationDirection = 'next';

    this.flow.markTouched(step, formIndex);

    if (!this.flow.isValid(step, formIndex)) {
      return;
    }

    const totalForms = this.flow.getFormsCount(step);
    const isLastFormInStep = formIndex === totalForms;

    if (isLastFormInStep && !this.flow.isStepValid(step)) {
      return;
    }

    const next = this.flow.getNextPosition(step, formIndex);

    if (!next) {
      this.flow.saveCurrentPosition(step, formIndex);
      this.submitAll();
      return;
    }

    this.flow.saveCurrentPosition(next.step, next.form);

    this.animationTick++;
    this.navigate(next.step, next.form);
  }

  prev(step: number, formIndex: number): void {
    this.animationDirection = 'prev';

    const prev = this.flow.getPrevPosition(step, formIndex);
    if (!prev) return;

    this.flow.saveCurrentPosition(prev.step, prev.form);

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
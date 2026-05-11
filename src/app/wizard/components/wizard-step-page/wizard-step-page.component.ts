import { CommonModule, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { ButtonModule } from 'primeng/button';
import { WizardFlowService } from '../../services/wizard-flow.service';
import { WIZARD_FORM_COMPONENTS } from '../../forms';
import {
  animate,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { LoanBlockedPopupComponent } from '../loan-blocked-popup.component';

@Component({
  selector: 'app-wizard-step-page',
  imports: [
    NgIf,
    LoanBlockedPopupComponent,
    CommonModule,
    ButtonModule,
    ...WIZARD_FORM_COMPONENTS,
  ],
  templateUrl: './wizard-step-page.component.html',
  styleUrl: './wizard-step-page.component.scss',
  animations: [
    trigger('slideForm', [
      transition('* => *', [
        query(
          ':enter',
          [style({ opacity: 0 }), animate('180ms ease', style({ opacity: 1 }))],
          { optional: true },
        ),
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
  currentFormTitle = 'בואו נכיר אותכם קצת';

  onFormTitleChange(title: string): void {
    this.currentFormTitle = title;
  }

  getAnimationState(step: number, formIndex: number): string {
    return `${this.animationDirection}-${step}-${formIndex}-${this.animationTick}`;
  }

  readonly vm$ = combineLatest([
    this.route.paramMap.pipe(map((params) => Number(params.get('step') ?? 1))),
    this.route.queryParamMap.pipe(
      map((params) => Number(params.get('form') ?? 1)),
    ),
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
    }),
  );

  shouldShowPrevButton(step: number, formIndex: number): boolean {
    return !(step === 5 && (formIndex === 1 || formIndex === 3));
  }

  shouldShowNextButton(step: number, formIndex: number): boolean {
    return !(step === 5 && formIndex === 3);
  }

  getFormKey(step: number, formIndex: number): string {
    return `${step}-${formIndex}`;
  }

  next(step: number, formIndex: number): void {
    this.animationDirection = 'next';

    const form = this.flow.getForm(step, formIndex);

    if (step === 4 && formIndex === 2) {
      const rawValue = form.getRawValue();

      const isOtherCountryTaxResident =
        rawValue.nonIsraeliTaxResidency?.isOtherCountryTaxResident === true;

      if (isOtherCountryTaxResident) {
        this.flow.showLoanBlockedPopup$.next(true);
        return;
      }
    }

    this.flow.markTouched(step, formIndex);

    if (!form.valid) {
      return;
    }

    const totalForms = this.flow.getFormsCount(step);
    const isLastFormInStep = formIndex === totalForms;

    if (isLastFormInStep && !this.flow.isStepValidForNavigation(step)) {
      return;
    }

    const next = this.flow.getNextPosition(step, formIndex);

    this.flow.saveForm(step, formIndex, form.getRawValue()).subscribe({
      next: () => {
        if (!next) {
          this.flow.saveCurrentPosition(step, formIndex);
          this.submitAll();
          return;
        }

        this.flow.saveCurrentPosition(next.step, next.form);

        this.animationTick++;
        this.navigate(next.step, next.form);
      },
      error: (error) => {
        console.error('SAVE FORM ERROR:', error);
      },
    });
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

  private getFormErrors(form: FormGroup): Record<string, unknown> {
    const errors: Record<string, unknown> = {};

    Object.keys(form.controls).forEach((key) => {
      const control = form.get(key);

      if (control instanceof FormGroup) {
        const nestedErrors = this.getFormErrors(control);

        if (Object.keys(nestedErrors).length) {
          errors[key] = nestedErrors;
        }

        return;
      }

      if (control?.errors) {
        errors[key] = control.errors;
      }
    });

    return errors;
  }

  private submitAll(): void {
    console.log('submit all', this.flow.getAllRawValue());
    // alert('Wizard completed. Check console.');
  }
}

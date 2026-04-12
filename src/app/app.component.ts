import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WizardFlowService } from './wizard/services/wizard-flow.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  private flow = inject(WizardFlowService);

  constructor() {
    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl === '') {
      const saved = this.flow.getSavedPosition();

      this.router.navigate(['/wizard/step', saved.step], {
        queryParams: { form: saved.form },
      });
    }
  }
}

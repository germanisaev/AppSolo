import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WizardFlowService } from './wizard/services/wizard-flow.service';
import { LoaderComponent } from './wizard/services/loader.component';
import { LoaderService } from './wizard/services/loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  private router = inject(Router);
  private flow = inject(WizardFlowService);
  readonly loader = inject(LoaderService);

  constructor() {
    this.loader.show();
    const currentUrl = this.router.url;

    if (currentUrl === '/' || currentUrl === '') {
      const saved = this.flow.getSavedPosition();

      this.router.navigate(['/wizard/step', saved.step], {
        queryParams: { form: saved.form },
      });
    }

    setTimeout(() => {
      this.loader.hide();
    }, 2000);
  }
}

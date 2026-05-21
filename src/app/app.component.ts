import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { WizardFlowService, LoaderService } from './shared/services';
import { LoaderComponent } from './shared/components';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private router = inject(Router);
  private flow = inject(WizardFlowService);
  readonly loader = inject(LoaderService);

  constructor() {
    this.loader.show();

    setTimeout(() => {
      this.loader.hide();
    }, 2000);
  }
}

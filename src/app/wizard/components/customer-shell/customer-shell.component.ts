import { Component } from '@angular/core';
import { WizardShellComponent } from '../wizard-shell.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-shell',
  imports: [WizardShellComponent, RouterOutlet],
  templateUrl: './customer-shell.component.html',
  styleUrl: './customer-shell.component.scss'
})
export class CustomerShellComponent {

}

import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customer-shell',
  imports: [RouterOutlet, NgIf],
  templateUrl: './customer-shell.component.html',
  styleUrl: './customer-shell.component.scss',
})
export class CustomerShellComponent {
  private router = inject(Router);

  isIntroPage = this.router.url.includes('/wizard/intro');

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.isIntroPage = this.router.url.includes('/wizard/intro');
      });
  }
}

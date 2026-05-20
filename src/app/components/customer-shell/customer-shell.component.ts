import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-customer-shell',
  imports: [RouterOutlet, NgClass],
  templateUrl: './customer-shell.component.html',
  styleUrl: './customer-shell.component.scss',
})
export class CustomerShellComponent {
  isIntroBackgroundPage = false;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isIntroBackgroundPage =
          event.urlAfterRedirects.startsWith('/customer/intro') ||
          event.urlAfterRedirects.startsWith('/customer/start');
      });
  }
}



// private router = inject(Router);

  // isIntroPage = this.router.url.includes('/wizard/intro');

  // constructor() {
  //   this.router.events
  //     .pipe(filter((event) => event instanceof NavigationEnd))
  //     .subscribe(() => {
  //       this.isIntroPage = this.router.url.includes('/wizard/intro');
  //     });
  // }

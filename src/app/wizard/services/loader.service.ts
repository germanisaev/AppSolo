import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requestsCount = 0;
  private minDuration = 500; // мс
  private startTime = 0;

  readonly isLoading = signal(false);

  //   show(): void {
  //     this.requestsCount++;
  //     this.isLoading.set(true);
  //   }

  //   hide(): void {
  //     this.requestsCount = Math.max(0, this.requestsCount - 1);

  //     if (this.requestsCount === 0) {
  //       this.isLoading.set(false);
  //     }
  //   }

  //   show(): void {
  //     this.requestsCount++;
  //     this.isLoading.set(true);
  //     console.log('LOADER SHOW', this.requestsCount, this.isLoading());
  //   }

  //   hide(): void {
  //     this.requestsCount = Math.max(0, this.requestsCount - 1);

  //     if (this.requestsCount === 0) {
  //       this.isLoading.set(false);
  //     }

  //     console.log('LOADER HIDE', this.requestsCount, this.isLoading());
  //   }
  show(): void {
    this.requestsCount++;
    this.startTime = Date.now();
    this.isLoading.set(true);
  }

  hide(): void {
    const elapsed = Date.now() - this.startTime;
    const delay = Math.max(0, this.minDuration - elapsed);

    setTimeout(() => {
      this.requestsCount = Math.max(0, this.requestsCount - 1);

      if (this.requestsCount === 0) {
        this.isLoading.set(false);
      }
    }, delay);
  }
}

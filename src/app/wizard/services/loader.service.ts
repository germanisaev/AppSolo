import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private requestsCount = 0;
  private minDuration = 500; // мс
  private startTime = 0;

  readonly isLoading = signal(false);

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

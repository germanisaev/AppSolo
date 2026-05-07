import { Component, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LoaderService } from './loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf],
  template: `
    <div class="loader-overlay" *ngIf="loader.isLoading()">
      <div class="loader-box">
        <div class="spinner"></div>
        <div class="loader-text">שומר נתונים...</div>
      </div>
    </div>
  `,
  styles: [
    `
      .loader-overlay {
        position: fixed;
        inset: 0;
        z-index: 9999;

        display: flex;
        align-items: center;
        justify-content: center;

        background: rgba(15, 23, 42, 0.25);
        backdrop-filter: blur(2px);
      }

      .loader-box {
        min-width: 160px;
        padding: 24px;

        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;

        background: #ffffff;
        border-radius: 18px;
        box-shadow: 0 20px 50px rgba(15, 23, 42, 0.18);
        z-index: 1000;
      }

      .spinner {
        width: 42px;
        height: 42px;

        border: 4px solid #ffe0cc;
        border-top-color: #ff6600;
        border-radius: 50%;

        animation: spin 0.8s linear infinite;
      }

      .loader-text {
        font-weight: 700;
        color: #0f172a;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }
    `,
  ],
})
export class LoaderComponent {
  readonly loader = inject(LoaderService);

  constructor() {
    console.log('LOADER COMPONENT CREATED');
  }
}

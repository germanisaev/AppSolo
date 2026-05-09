import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LoaderService } from '../services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgFor],
  template: `
    <!-- <div class="loader-overlay" *ngIf="loader.isLoading()">
      <div class="loader-box">
        <div class="spinner"></div>
        <div class="loader-text">שומר נתונים...</div>
      </div>
    </div> -->
    <div class="brand-loader">
      <span
        class="loader-bar"
        *ngFor="let item of bars; let i = index"
        [style.--i]="i"
      ></span>

      <span class="dash dash-left"></span>
      <span class="dash dash-right"></span>
      <span class="shape triangle"></span>
      <span class="shape dot"></span>
    </div>
  `,
  styles: [
    `
      .brand-loader {
        position: relative;
        width: 220px;
        height: 140px;
        margin: 0 auto;
      }

      .loader-bar {
        position: absolute;
        left: 50%;
        top: 50%;

        width: 12px;
        height: 34px;
        border-radius: 999px;

        background: #ff7a2f;

        transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
          translateY(-44px);

        animation: loader-fade 1.2s linear infinite;
        animation-delay: calc(var(--i) * -0.1s);
      }

      @keyframes loader-fade {
        0% {
          opacity: 1;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
            translateY(-44px) scale(1);
        }

        100% {
          opacity: 0.2;
          transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
            translateY(-44px) scale(0.85);
        }
      }

      .dash {
        position: absolute;
        width: 74px;
        height: 44px;
        border-top: 3px dashed #2f2f2f;
        border-radius: 50%;
        opacity: 0.9;
      }

      .dash-left {
        left: 8px;
        top: 18px;
        transform: rotate(-22deg);
      }

      .dash-right {
        right: 4px;
        bottom: 20px;
        transform: rotate(24deg);
      }

      .shape {
        position: absolute;
        display: block;
      }

      .triangle {
        right: 28px;
        top: 32px;

        width: 0;
        height: 0;

        border-left: 9px solid #8e24aa;
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;

        animation: float-shape 1.8s ease-in-out infinite;
      }

      .dot {
        right: 18px;
        bottom: 24px;

        width: 18px;
        height: 18px;

        background: #8e24aa;
        border-radius: 5px;

        transform: rotate(20deg);
        animation: float-shape 2.1s ease-in-out infinite;
      }

      @keyframes float-shape {
        0%,
        100% {
          transform: translateY(0) rotate(20deg);
        }

        50% {
          transform: translateY(-8px) rotate(35deg);
        }
      }
      /* .loader-overlay {
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
      } */
    `,
  ],
})
export class LoaderComponent {
  // readonly loader = inject(LoaderService);

  bars = Array.from({ length: 12 });

  constructor() {
    console.log('LOADER COMPONENT CREATED');
  }
}

import { Component, inject } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { LoaderService } from '../services';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <div class="loader-overlay" *ngIf="loader.isLoading()">
      <div class="loader-box">
        <div class="brand-loader">
          <span
            class="loader-bar"
            *ngFor="let item of bars; let i = index"
            [style.--i]="i"
          ></span>

          <span class="dash dash-left"></span>
          <span class="mini-burst"></span>
          <span class="dash dash-right"></span>
          <!-- <span class="shape triangle"></span> -->
          <span class="shape triangle">
            <svg viewBox="0 0 16 16" aria-hidden="true">
              <path d="M8 2 L14 13 L2 13 Z" />
            </svg>
          </span>
          <span class="shape dot"></span>
        </div>
        <div class="loader-title">טוענים את הפעולה</div>
        <div class="loader-text">זה יקח מספר שניות</div>
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
        background: rgba(0, 0, 0, 0.45);
      }

      .loader-box {
        width: min(604px, calc(100vw - 96px));
        min-height: 286px;
        padding: 56px 48px 52px;
        display: flex;
        flex-direction: column;
        align-items: center;
        background: #ffffff;
        border-radius: 20px;
        box-shadow: 0 24px 70px rgba(0, 0, 0, 0.22);
      }

      .brand-loader {
        position: relative;
        width: 260px;
        height: 130px;
        margin: 0 auto 14px;
      }

      .loader-bar {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 10px;
        height: 34px;
        border-radius: 999px;
        background: #ff7a2f;
        transform: translate(-50%, -50%) rotate(calc(var(--i) * 30deg))
          translateY(-42px);
        transform-origin: center;
        animation: loader-fade 1.1s linear infinite;
        animation-delay: calc(var(--i) * -0.09s);
      }

      @keyframes loader-fade {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0.18;
        }
      }

      .dash {
        position: absolute;
        width: 88px;
        height: 48px;
        border-top: 2px dashed #2f2f2f;
        border-radius: 50%;
        opacity: 0.9;
      }

      .dash-left {
        left: 28px;
        top: 18px;
        transform: rotate(-28deg);
      }

      .dash-right {
        right: 30px;
        top: 68px;
        width: 74px;
        height: 40px;
        border-top: 2px dashed #2f2f2f;
        border-radius: 50%;
        transform: rotate(28deg);
      }

      .triangle {
        position: absolute;
        right: 52px;
        top: 32px;
        width: 15px;
        height: 15px;
        background: transparent;
        transform: rotate(28deg);
        animation: float-triangle 1.8s ease-in-out infinite;

        svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        path {
          fill: none;
          stroke: #8e24aa;
          stroke-width: 1.8;
          stroke-linejoin: round;
        }
      }

      .dot {
        position: absolute;
        right: 18px;
        top: 98px;
        width: 18px;
        height: 18px;
        background: #8e24aa;
        clip-path: polygon(25% 5%, 75% 5%, 100% 50%, 75% 95%, 25% 95%, 0 50%);
        transform: rotate(12deg);
        transform-origin: center;
        animation: float-dot 2.1s ease-in-out infinite;
      }

      .mini-burst {
        position: absolute;
        left: 16px;
        top: 52px;
        width: 28px;
        height: 28px;
        border: 2px dashed #2f2f2f;
        border-radius: 50%;
        opacity: 0.9;
        animation: mini-spin 2.4s linear infinite;
      }

      .mini-burst::before,
      .mini-burst::after {
        content: '';
        position: absolute;
        background: #2f2f2f;
        border-radius: 999px;
      }

      .mini-burst::before {
        width: 8px;
        height: 2px;
        left: -10px;
        top: 12px;
      }

      .mini-burst::after {
        width: 2px;
        height: 8px;
        right: 5px;
        top: -10px;
      }

      @keyframes mini-spin {
        to {
          transform: rotate(360deg);
        }
      }

      @keyframes float-triangle {
        0%,
        100% {
          transform: translateY(0) rotate(0deg);
        }
        50% {
          transform: translateY(-6px) rotate(12deg);
        }
      }

      @keyframes float-dot {
        0%,
        100% {
          transform: translateY(0) rotate(12deg);
        }
        50% {
          transform: translateY(-4px) rotate(18deg);
        }
      }

      .loader-title {
        margin-top: 0;
        font-size: 32px;
        line-height: 1.15;
        font-weight: 600;
        color: #333333;
        text-align: center;
      }

      .loader-text {
        margin-top: 14px;
        font-size: 18px;
        line-height: 1.3;
        font-weight: 400;
        color: #333333;
        text-align: center;
      }
    `,
  ],
})
export class LoaderComponent {
  readonly loader = inject(LoaderService);

  bars = Array.from({ length: 12 });

  constructor() {
    console.log('LOADER COMPONENT CREATED');
  }
}

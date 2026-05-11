import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { inject } from '@angular/core';
import { WizardFlowService } from '../services/wizard-flow.service';

@Component({
  selector: 'app-wizard-intro',
  standalone: true,
  template: `
    <div class="intro-layout" dir="rtl">
      <aside class="intro-hero">
        <div class="hero-small">חדש במזרחי-טפחות!</div>
        <div class="hero-title">
          אשראי<br />
          צרכני
        </div>
      </aside>

      <div>
        <section class="intro-card" dir="rtl">
          <h1>
            הגעתם למערכת אשראי צרכני של בנק מזרחי טפחות.<br />
            <span>כדי להתחיל, מלאו את פרטי הלקוח כדי לשלוח לו קישור</span>
          </h1>

          <div class="intro-steps">
            <div class="intro-step">
              <div class="step-circle">1</div>
              <h3>מילוי פרטים אישיים</h3>
              <p>נמלא פרטים אישיים לצורך היכרות</p>
            </div>

            <div class="intro-step">
              <div class="step-circle">2</div>
              <h3>פרטי הלוואה מבוקשים</h3>
              <p>נבחר את סכום ההלוואה ומספר התשלומים</p>
            </div>

            <div class="intro-step">
              <div class="step-circle">3</div>
              <h3>פרטים נוספים</h3>
              <p>מידע נוסף כדי שהקמת ההלוואה תושלם בצורה בטוחה</p>
            </div>
          </div>

          <button type="button" class="start-button" (click)="start()">
            בואו נתחיל
          </button>

          <p class="legal-text">
            אני מאשר/ת שקראתי את תנאי השימוש ומדיניות הפרטיות באתר וכי המידע
            אודותיי נשמר במאגרי המידע של החברה ו/או חברות מהקבוצה ו/או שותף
            רבינה, לשימושים המפורטים במדיניות הפרטיות.
          </p>

          <p class="legal-text">
            אי עמידה בפרעון האשראי עלול לגרור חיוב בריבית פיגורים והליכי הוצאה
            לפועל. אישור ההלוואה כפוף לתנאי החיתום ואישור המלווה בנק מזרחי טפחות
            בע״מ.
          </p>
        </section>
        <footer class="intro-footer" dir="rtl">
          <div>נתקלת בבעיה? מוקד השירות שלנו: 03-0000000</div>
          <span> בלחיצה כאן נציג יוכל לחזור אליך </span>
        </footer>
      </div>
    </div>
  `,
  styles: [
    `
      .intro-layout {
        // width: min(1180px, calc(100vw - 96px));
        display: flex;
        justify-content: space-between;
        align-items: start;
        margin: 0 auto;
        padding: 0 200px;
        padding-top: 72px;

        /* display: grid;
        grid-template-columns: 680px 1fr; */
        gap: 72px;
      }

      .intro-card {
        width: 920px;
        min-height: 520px;
        padding: 36px 76px;

        background: #fff;
        border-radius: 10px;
        box-shadow: 0 20px 45px rgba(15, 23, 42, 0.14);
        text-align: center;
      }

      .intro-card h1 > span {
        font-size: 24px;
        font-weight: 500;
        color: #333;
      }

      .intro-hero {
        min-height: 360px;
        display: flex;
        flex-direction: column;
        justify-content: center;

        color: #fff;
        text-align: right;
      }

      .hero-small {
        font-size: 48px;
      }
      .hero-title {
        font-size: 150px;
        line-height: 0.95;
        font-weight: 900;
      }

      .intro-footer {
        position: relative;
        z-index: 2;
        margin-top: 24px;
      }

      .intro-footer div {
        font-size: 18px;
        font-weight: 500;
      }

      @media (max-width: 900px) {
        .intro-layout {
          grid-template-columns: 1fr;
        }

        .intro-hero {
          text-align: center;
          padding: 0;
        }

        .hero-title {
          font-size: 56px;
        }
      }

      h1 {
        margin: 0 0 42px;
        color: #3a3a3a;
        font-size: 28px;
        line-height: 1.55;
        font-weight: 800;
      }

      .intro-steps {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 56px;
        margin-bottom: 44px;
      }

      .intro-step {
        display: flex;
        flex-direction: column;
        align-items: center;
      }

      .step-circle {
        width: 72px;
        height: 72px;
        margin-bottom: 22px;

        display: flex;
        align-items: center;
        justify-content: center;

        border-radius: 50%;
        background: #ff6600;
        color: #fff;

        font-size: 34px;
        font-weight: 800;

        box-shadow: 0 20px 32px rgba(255, 102, 0, 0.25);
      }

      .intro-step h3 {
        margin: 0 0 8px;
        color: #3a3a3a;
        font-size: 19px;
        font-weight: 800;
      }

      .intro-step p {
        max-width: 190px;
        margin: 0;
        color: #3a3a3a;
        font-size: 15px;
        line-height: 1.45;
      }

      .start-button {
        min-width: 132px;
        height: 44px;
        margin-bottom: 40px;

        border: none;
        border-radius: 999px;

        background: #711aaa;
        color: #fff;

        font-family: inherit;
        font-size: 16px;
        font-weight: 800;

        cursor: pointer;
      }

      .legal-text {
        max-width: 760px;
        margin: 0 auto 22px;
        color: #3a3a3a;
        font-size: 15px;
        line-height: 1.7;
      }

      .intro-footer {
        margin-top: 22px;
        text-align: center;
        color: #3a3a3a;
      }

      .intro-footer strong {
        display: block;
        margin-bottom: 8px;
        font-size: 19px;
        font-weight: 800;
      }

      .intro-footer span {
        font-size: 15px;
      }

      @media (max-width: 768px) {
        .intro-layout {
          width: 100%;
          min-height: calc(100vh - 60px);

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          padding: 0 16px 40px;
          gap: 0;
        }

        .intro-hero {
          width: 100%;
          min-height: 350px;

          justify-content: flex-start;
          align-items: center;

          padding: 70px 16px 0;

          text-align: center;
        }

        .hero-small {
          font-size: 34px;
          font-weight: 600;
        }

        .hero-title {
          font-size: 48px;
          font-weight: 800;
        }

        .hero-small,
        .hero-title {
          width: 100%;
          max-width: none;
          line-height: 1.15;
          white-space: nowrap !important;
          text-align: center;
        }

        .intro-card {
          width: 100%;
          min-height: auto;

          margin-top: -74px;
          padding: 28px 20px 24px;

          border-radius: 16px;
          text-align: center;
          z-index: 2;
        }

        h1 {
          margin: 0 0 26px;

          font-size: 15px;
          line-height: 1.45;
          font-weight: 700;
        }

        .intro-card h1 > span {
          display: block;
          margin-top: 4px;

          font-size: 13px;
          line-height: 1.5;
          font-weight: 500;
        }

        .intro-steps {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;

          margin-bottom: 24px;
        }

        .step-circle {
          width: 54px;
          height: 54px;
          margin-bottom: 12px;

          font-size: 24px;
        }

        .intro-step h3 {
          margin-bottom: 5px;
          font-size: 14px;
        }

        .intro-step p {
          max-width: 190px;
          font-size: 12px;
          line-height: 1.45;
        }

        .start-button {
          min-width: 112px;
          height: 36px;
          margin-bottom: 20px;

          font-size: 13px;
        }

        .legal-text {
          max-width: 230px;
          margin-bottom: 14px;

          font-size: 10px;
          line-height: 1.55;
        }

        .intro-footer {
          width: min(100%, 280px);
          margin-top: 14px;

          text-align: center;
          font-size: 11px;
        }

        .intro-footer div {
          font-size: 12px;
          font-weight: 600;
        }

        .intro-footer span {
          font-size: 10px;
        }
      }

      /* @media (max-width: 768px) {
        .intro-card {
          padding: 32px 24px;
        }

        .intro-steps {
          grid-template-columns: 1fr;
          gap: 32px;
        }

        h1 {
          font-size: 22px;
        }
      } */
    `,
  ],
})
export class WizardIntroComponent {
  private router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly flow = inject(WizardFlowService);

  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');

    if (!token) {
      return;
    }

    /* this.flow.patchBankRequestData({
      firstName: 'יוסי',
      lastName: 'אהרוני',
      governmentId: '223343456',
      mobile: '0508832233',
      email: 'yossi@gmail.com',

      loanAmount: '20000',
      numberOfPayments: '20',
      linkageType: 'indexLinked',

      loanBeneficiary: 'applicant',
      bank: '10',
      branchNumber: '941',
      accountNumber: '382382',

      orderNumber: '2356',
      loanType: 'consumer',
      serviceType: 'consulting',
    });*/
  }

  /* start(): void {
    this.flow.completeIntro();

    this.router.navigate(['/wizard/step', 1], {
      queryParams: { form: 1 },
    });
  }  */
  start(): void {
    this.flow.patchBankRequestData({
      firstName: 'יוסי',
      lastName: 'ישראלי',
      governmentId: '223343456',
      mobile: '0508832233',
      email: 'yossi@gmail.com',
      loanAmount: '20000',
      numberOfPayments: '20',
      linkageType: 'none',
      loanBeneficiary: 'applicant',
      bank: '10',
      branchNumber: '941',
      accountNumber: '382382',
      orderNumber: '2356',
      loanType: 'consumer',
      serviceType: 'consulting',
    });

    this.flow.completeIntro();

    this.router.navigate(['/wizard/step', 1], {
      queryParams: { form: 1 },
    });
  }
}

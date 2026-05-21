import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  Input,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBaseComponent } from '../../shared/base/form-base.component';
import { Step3Form2 } from '../../shared/models/step.types';
import { NgIf } from '@angular/common';
import { WizardFlowService } from '../../shared/services';
import { WizardCardComponent } from '../components/wizard-card.component';

@Component({
  selector: 'app-step3-form2',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, WizardCardComponent],
  template: `
    <div class="agreement-card" [formGroup]="form">
      <app-wizard-card>
        <h3 class="card-title">הסכמת לקוח לצורך התקשרות בעסקת אשראי</h3>
        <p style="text-align: right;">
          בהתאם לחוק נתוני אשראי הוקם מאגר נתוני אשראי אשר מופעל על ידי בנק
          ישראל. אין באפשרותנו לקבל נתוני אשראי, לרבות נתונים היסטורים המופיעים
          במאגר לגביך, אלא בהסכמתך, במפורט להלן:
        </p>

        <section class="customer-details">
          <h3 class="section-title">פרטי לקוח</h3>

          <div class="customer-grid">
            <div class="customer-row">
              <span class="customer-label">שם</span>
              <strong class="customer-value">{{
                customerDetails.firstName
              }}</strong>
            </div>

            <div class="customer-row">
              <span class="customer-label">שם משפחה</span>
              <strong class="customer-value">{{
                customerDetails.lastName
              }}</strong>
            </div>

            <div class="customer-row">
              <span class="customer-label">תעודת זהות</span>
              <strong class="customer-value">{{
                customerDetails.governmentId
              }}</strong>
            </div>
          </div>
        </section>

        <h3 class="card-title">עסקת אשראי חדשה</h3>

        <div class="agreement-scroll" (scroll)="onAgreementScroll($event)">
          <p>
            בקשה לפתיחת חשבון פיקדונות במערכת סגורה מס' 54769786 סניף 567 הננו
            מבקשים בזאת מבנק מזרחי לפתוח עבורנו חשבון במערכת סגורה שאינו חשבון
            עו"ש בהתאם לפרטים המפורטים בסעיפים 1 ו- 2 להלן (להלן: "החשבון"). אשר
            כל מטרתו הינה הפקדת כספים לפיקדונות במערכת סגורה בבנק מזרחי (להלן:
            "הפיקדון"). בתום תקופת הפיקדון וללא כל הוראה נוספת מצדנו, יוחזרו
            כספי הפיקדון לחשבון העו"ש בבנק ממנו הועברו הכספים (להלן: "החשבון
            המעביר" ו/או "חשבון המקור" ו"הבנק המעביר" בהתאמה) והכל בהתאם ובכפוף
            לפרטים ולהצהרות כאמור להלן במסמך זה ובמסמכים משלימים אשר יפרטו את כל
            תנאי הפיקדון (להלן :"הסכם תנאי הפיקדון"). חשבון זה מאפשר הפקדה מעת
            לעת של פיקדונות בתנאים המפורטים בכתב זה, החשבון ייסגר אוטומטית לאחר
            החזרת כספי הפיקדון. למרות האמור, ככל ויתאפשר ובמידה וניתנה על ידנו
            הוראת הפקדה מחדש לפני תום הפיקדון, הכספים יופקדו מחדש לתקופה נוספת,
            ככל שיוסכם ביננו ובין הבנק. במקרה זה הכספים לא יחזרו לחשבון המעביר
            בתום תקופת הפיקדון והם יופקדו בפיקדון אשר בחרנו ובמועד הפירעון. אם
            לא ניתנה הוראה נוספת מצידנו, הכספים יחזרו לחשבון המעביר.
          </p>
          <p>
            2. הגדרות: א. "יום עסקים" או "יום עסקים בנקאי" – יום עסקים בנקאי הוא
            כל יום, למעט יום שבת, ימי שבתון, שני ימי ראש השנה, ערב יום כיפור
            ויום כיפור, ראשון של סוכות ושמיני עצרת, פורים, ראשון ושביעי של פסח,
            יום העצמאות, חג השבועות ותשעה באב וכל יום אחר שיקבע על ידי המפקח על
            הבנקאים כי אינו יום עסקים. ב. "יום עסקים במט"ח" – יום עסקים בנקאי,
            כהגדרתו לעיל, שבו בנקים בישראל ובמדינה בה הונפק המטבע פתוחים לביצוע
            עסקים במטבע הרלוונטי, ומתקיים בו מסחר במדינה שבה הונפק. ג. "לקוח"-
            כל יחידי בעל החשבון שפרטיהם מופיעים לעיל או מי מהם, וכל הבא מכוחו או
            במקומו. התחייבויות והצהרות יחידי הלקוח הינן ביחד ולחוד.
          </p>
          <p>
            4. השירותים אשר יינתנו ללקוח בגין הפקדת הפיקדון והצהרות הלקוח א.
            הננו מבקשים מהבנק להפקיד כל פיקדון בהתאם לתנאי הפיקדון כמפורט בהסכם
            תנאי הפיקדון. ב. מובהר בזאת כי הפיקדון יתנהל על שם הלקוח בהתאם לכתב
            זה ולמפורט בהסכם תנאי הפיקדון. ג. בעלי החשבון המקור, ורק הם חלקם או
            כולם, יהיו בעלי החשבון בבנק מזרחי. ד. הוראות הסכם זה תחייבנה את כל
            החותמים ביחד ולחוד. ה. תאריך תחילת תקופת הפיקדון הינו תאריך ההפקדה
            בפועל לפיקדון באמצעות העברה בנקאית מחשבון המעביר מאותו יום עסקים. ו.
            אנו מצהירים כי בתום תקופת הפיקדון הכספים יוחזרו לחשבון המקור וכי לא
            תהא לנו זכות לתת הוראות להעברת הכספים לחשבון אחר שאינו החשבון המעביר
            אלא במקרים המנויים בכתב זה להלן. ז. הננו מאשרים בזאת כי לא קיבלנו
            מהבנק כל ייעוץ להפקדה בפיקדון בבנק. ח. ידוע לנו כי האמור בכתב זה
            אינו מהווה התחייבות או הסכמה מצד הבנק למתן שירותים בנקאיים מכל סוג
            שהוא, וכי נוסף על האמור בכתב זה כפוף הפיקדון לתנאי הפיקדון כפי
            שיימסרו לנו.
          </p>
          <p>
            5. הוראה בלתי חוזרת הננו מורים בזאת בהוראה בלתי חוזרת להעביר בתום
            תקופת כל פיקדון, כהגדרתה בהסכם תנאי הפיקדון, את כל כספי הפיקדון
            ולרבות ריבית וכל תוספת אחרת לחשבון המעביר כהגדרתו בהסכם הפיקדון,
            וזאת ללא כל הוראה נוספת או אחרת מצדנו. ידוע לנו כי איננו רשאי להעביר
            את כספי הפיקדון לחשבון אחר זולת החשבון המעביר.
          </p>
          <p>
            6. הצהרות א. בכל מקרה בו לא ניתן יהיה להעביר את הכספים לחשבון המעביר
            כתוצאה מסגירתו ולא הודענו על סגירת החשבון המעביר ו/או לא פעלנו
            כמתחייב על פי סעיפים אלה, יפעל הבנק לאיתור הלקוח ולהפקדת הכספים לפי
            שיקול דעתו ובכפוף לכל דין. ב. מבלי לגרוע באמור במסמך זה, אנו מצהירים
            ומסכימים כי החזרת כל פיקדון בתום תקופת הפיקדון לחשבון המעביר, מהווה
            תנאי בסיסי לתוקפו של הסכם זה והבנק יחזיר את כספי כל פיקדון כאמור ללא
            כל הוראה נוספת מצדנו. למרות האמור, ככל ויתאפשר ובמידה וניתנה על ידנו
            הוראת הפקדה מחדש לפני תום הפיקדון, הכספים יופקדו מחדש לתקופה נוספת,
            ככל שיוסכם ביננו ובין הבנק. במקרה זה הכספים לא יחזרו לחשבון המעביר
            בתום תקופת הפיקדון והם יופקדו בפיקדון אשר בחרנו ובמועד הפירעון. אם
            לא ניתנה הוראה נוספת מצידנו, הכספים יחזרו לחשבון המעביר. ג. על אף
            האמור לעיל, במקרה בו נסגר החשבון המעביר לפני תום תקופת הפיקדון, אנו
            מתחייבים להמציא לבנק אישור בכתב בדבר סגירת חשבון המקור מהבנק המעביר
            אצלו התנהל החשבון. ד. כמו כן, בכל מקרה שהתברר כי חשבון המעביר נסגר
            אנו מתחייבים לקיים את כל דרישות הבנק ולהמציא כל מסמך שיידרש לניהול
            חשבון הפיקדון בבנק בגין סגירת חשבון המעביר לרבות ומבלי לגרוע מכלליות
            האמור, להופיע בבנק לשם זיהוי ואימות בהתאם להוראות חוק איסור הלבנת
            הון. ה. אנו מתחייבים להעביר את הכספים מהחשבון המעביר לחשבון הפיקדון
            אך ורק באמצעות העברה בנקאית. ו. אנו מצהירים כי אנו רשומים כבעלי
            החשבון המעביר המנוהל בבנק המעביר כדין וכי לא תהיה לנו כל טענה או
            דרישה או תביעה כלפי הבנק במישרין או בעקיפין אם לא יפתח הפיקדון בשל
            חוסר התאמה בין פרטי הבעלים ו/או החשבונות ו/או המסמכים כאמור.
          </p>
          <p>
            7. מתן שירותים בנקאיים בתקשורת אנו מבקשים כי נעביר לבנקאי מדי פעם
            בפעם הוראה לביצוע שירות בנקאי כמפורט להלן באמצעות טלפון, פקסימיליה,
            מייל מאובטח באתר האינטרנט / באפליקציות של הבנק או אמצעי תקשורת מקובל
            אחר הנהוג בבנק (להלן: "ההוראות הנ"ל"), יחולו התנאים הבאים: א. התנאים
            להלן באים להוסיף על כל תנאי הכלול בכל מסמך שחתמנו עליו. ב. כל פעולה
            בנקאית שתתבצע עפ"י הוראה כזו תהיה תקפה כאילו אישרנו אותה בכתב. ג.
            האמור בסעיף זה יחול בקשר עם הוראותינו בתחומים המפורטים בסעיפים
            ג.1-ג.2 להלן, ככל שייבחרו על ידינו והבנק הסכים לכך: ג.1. מידע מסירת
            מידע על כל חשבונותינו ונכסינו המוחזקים בבנק. ג.2. עסקאות פעולות
            בנקאיות המפורטות להלן: ג.2.א. ביצוע הפקדה או משיכה בחסכון או בפיקדון
            לזמן קצוב ובפיקדון חוזר קרדיטורי - כפי שנהוג ומקובל בבנק. ג.2.ב.
            שינויים מנהליים מסוימים. ג.2.ג. העברות כספים מחשבון במערכת סגורה
            באמצעות שירותי בנקאות בתקשורת. ג.3. ביצוע הוראה מההוראות המפורטות
            בסעיף ג.2- יהיה כפוף לחתימתנו על התנאים המסדירים פעילות בתחום נשוא
            ההוראה (ככול שקיימים). ד. נכיר בכל סכום שיירשם עקב ביצוע ההוראות
            הנ"ל, ונשלם לבנק, לפי דרישתו הראשונה, כל סכום שנהיה חייבים לו אם
            החשבון יהיה ביתרת חובה. ה. הבנק יהיה רשאי: • שלא לבצע את ההוראה הנ"ל
            בכלל, או בשעה מסוימת. • להתנות ביצוע ההוראה הנ"ל בתנאים נוספים. •
            להפסיק ללא הודעה מוקדמת, מתן שירות על פי ההוראות הנ"ל. הבנק יודיע
            לנו על כך בהקדם האפשרי. ו. הבנק יישא באחריות לנזק שייגרם לנו עקב
            ביצוע פעולה בלתי מורשית, שנעשתה שלא בידיעתנו, הסכמתנו או הרשאתנו,
            אלא אם כן התאפשר ביצועה עקב רשלנותנו. ז. הוראה תיחשב כמבוטלת אם תהיה
            מניעה חוקית לביצועה. ח. אנחנו מוותרים בזה על כל תביעה לשיפוי או
            פיצוי או נזק כנגד קבוצת הבנק, וקבוצת הבנק תהא פטורה מכל אחריות
            לאובדן, נזק, הפסד או הוצאה שייגרמו לנו, גם בעקיפין, כתוצאה מאי הבנה
            לגבי איזו הוראה מן ההוראות, או אם היתה מניעה לביצועה. הבנק לא יהיה
            פטור אם הנזק, ההפסד או ההוצאה נגרמו כתוצאה מרשלנותו. ט. הוראות בסעיף
            זה תחייבנה אותנו עד שנורה לבנק בכתב על ביטולן. אחרי הביטול יישארו
            ההוראות בתוקף רק ביחס לתקופה שקדמה לביטול. י. הוראות בסעיף זה גם
            תחייבנה גם את הבאים מכוחנו, כגון יורשים ומבצעי צוואה, נאמנים,
            כונסים, מפרקים. יא. הסיכונים הקשורים בשימוש בשירותים אלו, עקרונות
            אבטחת המידע והגנת הפרטיות המומלצים ליישום בידינו, על מנת למזער
            סיכונים אלה, מוצגים בנספח ב' להלן. יב. מבלי לגרוע מהאמור לעיל היענות
            הבנק לקבלת שירותים בקווי תקשורת/הוראות שלא בכתב נתונה לשיקול דעתו של
            הבנק.
          </p>
          <p>
            8. שעבוד וקיזוז ידוע לנו כי סכום הפיקדון ו/או חשבון הפיקדון ו/או
            זכויותיו כלפי הבנק לא ניתנים לשעבוד לכל אדם או גוף והכל בכפוף
            להוראות החוק. כמו כן לבנק לא תהיה זכות קיזוז על כספי הפיקדון ו/או
            חשבון הפיקדון ו/או זכויותינו כלפיו בגין התחייבות או חוב שלנו לבנק.
            על אף האמור מובהר בזאת כי הבנק רשאי לנכות לפי דין מכספי הפיקדון את
            העלויות בהן יישא במסגרת נקיטת אמצעים לשם איתור בעלי החשבון או מי מהם
            אשר לא הודיעו על סגירת החשבון המעביר כדין.
          </p>
          <p>
            9. שונות א. אנו מתחייבים להודיע לבנק על כל שינוי שיחול בפרטים
            הרשומים בכתב זה מיד עם קרות השינוי. ב. אנו מסכימים כי הודעות תשלחנה
            לכתובת אותה מסרנו ככתובת למשלוח דואר. ג. עמלות - בחשבון זה לא ייגבו
            עמלות. מס על פיקדונות ייגבה כדין.
          </p>
          <p>
            10. מסרים פרסומיים הננו מסכימים למשלוח דברי פרסומת, מידע ועדכונים על
            מוצרים ושרותים המוצעים בבנק וסקירות כלכליות בדואר אלקטרוני ו/או
            במסרון לטלפון סלולרי.
          </p>
          <p>
            11. תחולת הדין והליכים משפטיים א. הדין הישראלי יחול על כל עניין
            הקשור לפעילות שבין הצדדים, ללא הזדקקות לכללי ברירת הדין של המשפט
            הבינלאומי הפרטי. מקום השיפוט הייחודי יהיה בישראל. ב. בנוסף, ומבלי
            לגרוע מהאמור בסעיף 11.א לעיל, ככל שפעילותי בחשבון או מאפייניי
            האישיים, בעלי זיקה זרה, יחולו על פעילותי בחשבון הוראות הדין הזר, לפי
            העניין. ג. הוגשה על ידי צד שלישי נגד הבנק תביעה, הליך או דרישה בקשר
            עם חשבוננו בבנק, או שהבנק נעשה מעורב בתביעה, דרישה או הליך בעניין
            המהווה כולו סכסוך בינינו לבין הצד השלישי, או סכסוך בין בעלי החשבון
            לבין עצמם, יחולו תנאים אלה: 1. הבנק יהיה רשאי לנקוט כל צעד סביר
            שימצא לנכון ואף למנוע ממני פעולה בחשבונותיי בבנק. 2. נשפה ונפצה את
            הבנק בעד כל נזק שייגרם לבנק לרבות, כתוצאה מנקיטת צעדים על ידיו. הבנק
            יהיה רשאי לחייב כל חשבון שלנו אצלו בכל סכום שיגיע לו מאיתנו כתוצאה
            מכך. 3. הבנק יודיע לנו על קבלת תביעה, הליך או דרישה כאמור, ככל שהדבר
            יהיה אפשרי. 4. בסעיף זה - "נזק" - אבדן, הפסד והוצאה, אלא אם קיים
            לבנק אינטרס עצמאי בתביעה, שאז יכריע בית המשפט מי יישא בנזק.
          </p>
          <p>
            12. רישומי הבנק א. כל פרט בספרי הבנק, ייחשב לנכון וישמש הוכחה קבילה
            לקיומו של הרישום הנ"ל ולנכונות הפרטים הנקובים בו. ב. נודיע לבנק בכתב
            על כל השגה או התנגדות שיהיו לנו בקשר לכל חשבון, תמצית חשבון, אישור
            או הודעה או העתקיהם שיישלחו אלינו על ידי הבנק, וזאת תוך 90 יום מיום
            קבלתם, או תוך 180 יום מהתאריך הנקוב במסמך, לפי המוקדם מבניהם. ג. היה
            הבנק סבור כי פעולה כלשהי נרשמה בטעות בחשבון או שנפלה טעות ברישום
            כלשהו בחשבון לרבות עקב סכום שגוי, מועד שגוי, שער שגוי, ערך נקוב שגוי
            וכו', או כי פעולה כלשהי לא נרשמה בחשבון עקב טעות יהיה הבנק רשאי בכל
            עת לתקן את הטעות והנובע ממנה. התיקון יבוצע על ידי חיוב ו/או זיכוי
            הפיקדון, הכל לפי העניין ובהתאם לנסיבות המקרה, ובכפוף להוראות בנק
            ישראל.
          </p>
        </div>

        <label
          class="checkbox-row"
          [class.disabled]="!agreementRead"
          (click)="onBorrowerClick($event)"
        >
          <input
            type="checkbox"
            formControlName="borrower1"
            [class.disabled]="!agreementRead"
          />
          אני מאשר/ת שקראתי והבנתי את פרטי הקמת החשבון
        </label>

        <div class="error" *ngIf="isControlInvalid('borrower1')">
          {{ getControlErrorMessage('borrower1') }}
        </div>

        <div class="signature-section">
          <h3 class="card-title">חתימה דיגיטלית</h3>
          <p style="text-align: right;">יש לחתום כאן כדי לאשר את המסמך</p>

          <canvas
            #signatureCanvas
            class="signature-canvas"
            (pointerdown)="startDrawing($event)"
            (pointermove)="draw($event)"
            (pointerup)="stopDrawing()"
            (pointerleave)="stopDrawing()"
            (pointercancel)="stopDrawing()"
          ></canvas>

          <button
            type="button"
            class="clear-signature"
            (click)="clearSignature()"
          >
            <i class="pi pi-times"></i>
            ניקוי
          </button>
        </div>
      </app-wizard-card>
    </div>
  `,
  styles: [
    `
      .customer-details {
        margin: 24px 0 28px;
        direction: rtl;
      }

      .section-title {
        margin: 0 0 18px;
        font-size: 22px;
        font-weight: 800;
        color: #333;
        text-align: right;
      }

      .customer-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 28px;
        align-items: start;
      }

      .customer-row {
        display: grid;
        grid-template-columns: auto 1fr;
        gap: 18px;
        align-items: center;
      }

      .customer-label {
        color: #8a8a8a;
        font-size: 15px;
        font-weight: 500;
      }

      .customer-value {
        color: #1f2937;
        font-size: 15px;
        font-weight: 800;
      }

      

      :host ::ng-deep .agreement-card {
        width: min(1040px, 88vw);
        margin: 0 auto;
        padding: 42px 72px;

        background: #fff;
        border-radius: 22px;
        box-shadow: 0 10px 30px rgba(15, 23, 42, 0.06);

        text-align: center;
      }

      :host ::ng-deep .agreement-scroll {
        height: 460px;
        overflow-y: auto;

        margin: 28px auto;
        padding: 24px;

        border: 1px solid #d9dde5;
        border-radius: 12px;

        text-align: right;
        line-height: 1.7;
      }

      :host ::ng-deep .signature-section {
        margin-top: 28px;
      }

      :host ::ng-deep .signature-canvas {
        width: 520px;
        max-width: 100%;
        height: 140px;

        border-bottom: 1px solid #333;
        background: #fff;

        touch-action: none;
      }

      :host ::ng-deep .clear-signature {
        margin-top: 8px;
        font-size: 20px;
        border: 0;
        background: transparent;
        color: #711aaa;
        cursor: pointer;
      }

      @media (max-width: 768px) {
        .customer-grid {
          grid-template-columns: 1fr;
        }

        .agreement-card {
          margin: 0 auto;
          padding: 20px 16px !important;
        }
      }
    `,
  ],
})
export class Step3Form2Component
  extends FormBaseComponent
  implements AfterViewInit
{
  @Input({ required: true }) override form!: Step3Form2;

  private flow = inject(WizardFlowService);
  private cdr = inject(ChangeDetectorRef);

  @ViewChild('signatureCanvas')
  signatureCanvas!: ElementRef<HTMLCanvasElement>;

  agreementRead = false;

  private ctx!: CanvasRenderingContext2D;
  private isDrawing = false;

  get customerDetails() {
    const personalForm = this.flow.getForm(1, 1);

    return personalForm.getRawValue() as {
      firstName: string;
      lastName: string;
      governmentId: string;
      mobile: string;
    };
  }

  ngAfterViewInit(): void {
    this.initCanvas();
  }

  onAgreementScroll(event: Event): void {
    const element = event.target as HTMLElement;

    const reachedBottom =
      element.scrollTop + element.clientHeight >= element.scrollHeight - 12;

    if (reachedBottom && !this.agreementRead) {
      this.agreementRead = true;
      this.cdr.detectChanges();
    }
  }

  onBorrowerClick(event: MouseEvent): void {
    if (!this.agreementRead) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    this.form.controls.borrower1.markAsTouched();
  }

  private initCanvas(): void {
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();
    const ratio = window.devicePixelRatio || 1;

    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;

    this.ctx = canvas.getContext('2d')!;
    this.ctx.scale(ratio, ratio);

    this.ctx.lineWidth = 2;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.strokeStyle = '#111827';
  }

  startDrawing(event: PointerEvent): void {
    const point = this.getPoint(event);

    this.isDrawing = true;
    this.ctx.beginPath();
    this.ctx.moveTo(point.x, point.y);

    (event.target as HTMLElement).setPointerCapture(event.pointerId);
  }

  draw(event: PointerEvent): void {
    if (!this.isDrawing) {
      return;
    }

    const point = this.getPoint(event);

    this.ctx.lineTo(point.x, point.y);
    this.ctx.stroke();
  }

  stopDrawing(): void {
    this.isDrawing = false;
  }

  clearSignature(): void {
    const canvas = this.signatureCanvas.nativeElement;
    const rect = canvas.getBoundingClientRect();

    this.ctx.clearRect(0, 0, rect.width, rect.height);
  }

  private getPoint(event: PointerEvent): { x: number; y: number } {
    const rect = this.signatureCanvas.nativeElement.getBoundingClientRect();

    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
}

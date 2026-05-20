import { Directive, ElementRef, HostListener } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: 'input[numberFormat]',
  standalone: true,
})
export class NumberFormatDirective {
  constructor(
    private el: ElementRef<HTMLInputElement>,
    private ngControl: NgControl
  ) {}

  @HostListener('input')
  onInput(): void {
    const input = this.el.nativeElement;

    const rawValue = input.value.replace(/,/g, '').replace(/\D/g, '');

    if (!rawValue) {
      input.value = '';
      this.ngControl.control?.setValue('', { emitEvent: false });
      return;
    }

    const formatted = new Intl.NumberFormat('en-US').format(Number(rawValue));

    input.value = formatted;
    this.ngControl.control?.setValue(formatted, { emitEvent: false });
  }
}
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  styleUrls: ['./text-input.component.css']
})
export class TextInputComponent {
  @Input() inputId!: string;

  @Input() required = true;

  @Input() labelText!: string;

  @Input() inputType = 'text';

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() minLength = '';

  @Input() maxLength = '';

  @Input() min = '';

  get control() {
    return this.parentForm.get(this.controlName);
  }

  get error() {
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {

      if (this.control?.errors?.['required']) {
        return 'This field is required';
      }

      if (this.control?.errors?.['maxlength']) {
        return `This field must not have more than ${this.maxLength} characters`;
      }

      if (this.control?.errors?.['minlength']) {
        return `This field must not have less than ${this.minLength} characters`;
      }

      if (this.control?.errors?.['pattern']) {
        return 'This field is invaild';
      }

      if (this.control?.errors?.['customError']) {
        return this.control?.errors?.['customError'];
      }
    }

    return null;
  }
}

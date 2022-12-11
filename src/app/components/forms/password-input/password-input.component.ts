import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-password-input',
  templateUrl: './password-input.component.html',
  styleUrls: ['./password-input.component.css']
})
export class PasswordInputComponent {
  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() minLength = '';

  @Input() maxLength = '';

  @Input() customError = '';

  @Input() required = true;

  passwordShown = false;

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
        return this.customError;
      }
    }

    return null;
  }

  tooglePasswordShown() {
    this.passwordShown = !this.passwordShown;
  }
}

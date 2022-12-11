import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-textarea-input',
  templateUrl: './textarea-input.component.html',
  styleUrls: ['./textarea-input.component.css']
})
export class TextareaInputComponent {
  @Input() inputId!: string;

  @Input() required = true;

  @Input() labelText!: string;

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() minLength = '';

  @Input() maxLength = '';

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

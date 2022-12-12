import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormSelectOptionsType } from 'src/app/models/select-input-options.model';

@Component({
  selector: 'app-select-input',
  templateUrl: './select-input.component.html',
  styleUrls: ['./select-input.component.css']
})
export class SelectInputComponent {
  @Input() required = true;

  @Input() inputId!: string;

  @Input() labelText!: string;

  @Input() parentForm!: FormGroup;

  @Input() controlName!: string;

  @Input() options: FormSelectOptionsType[] = [];

  get control() {
    return this.parentForm.get(this.controlName);
  }

  get error() {
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {

      if (this.control?.errors?.['required']) {
        return 'This field is required';
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

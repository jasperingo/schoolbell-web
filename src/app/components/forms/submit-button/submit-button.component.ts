import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css']
})
export class SubmitButtonComponent {
  @Input() loading = false;

  @Input() label = 'Submit';

  @Input() danger = false;

  get color() {
    return {
      'bg-green-700': !this.danger,
      'hover:bg-green-500': !this.danger,
      'bg-red-700': this.danger,
      'hover:bg-red-400': this.danger,
    }
  }
}

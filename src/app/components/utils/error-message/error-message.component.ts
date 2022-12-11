import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent {
  @Input() message = '';

  @Input() buttonText = 'Retry';

  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}

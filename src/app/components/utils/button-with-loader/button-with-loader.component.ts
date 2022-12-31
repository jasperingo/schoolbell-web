import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-with-loader',
  templateUrl: './button-with-loader.component.html',
  styleUrls: ['./button-with-loader.component.css']
})
export class ButtonWithLoaderComponent {
  @Input() loading = false;

  @Input() text!: string;

  @Input() color = 'bg-green-700';

  @Input() colorHover = 'bg-green-400';

  @Output() action = new EventEmitter<void>();

  onAction() {
    this.action.emit();
  }
}

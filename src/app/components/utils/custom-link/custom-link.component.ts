import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-link',
  templateUrl: './custom-link.component.html',
  styleUrls: ['./custom-link.component.css']
})
export class CustomLinkComponent {
  @Input() text!: string;

  @Input() link!: string;
}

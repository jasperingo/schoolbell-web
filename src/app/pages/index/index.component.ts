import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-index-nav-link',
  template: `
    <li>
      <a 
        [routerLink]="link" 
        class="block p-4 text-center"
        routerLinkActive="border-b-2 border-green-700 text-green-700"  
        [routerLinkActiveOptions]="{ exact: true }" 
      >
        {{ text }}
      </a>
    </li>
  `,
  styles: [` :host { @apply flex-grow } `]
})
export class IndexNavLinkComponent {
  @Input() text!: string;

  @Input() link!: string;
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {

}

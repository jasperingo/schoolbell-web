import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { appIcons } from 'src/app/app-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CreateAvatarService } from 'src/app/services/create-avatar/create-avatar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-nav-item',
  template: `
    <li>
      <a 
        [routerLink]="link" 
        routerLinkActive="text-green-700" 
        [routerLinkActiveOptions]="{ exact: true }"
        class="block text-center hover:bg-green-200 py-2" 
      >
        <fa-icon [icon]="icon" class="text-2xl"></fa-icon>
        <span class="block mx-auto text-sm">{{ text }}</span>
      </a>
    </li>
  `,
  styles: [` :host { @apply flex-grow } `]
})
export class AccountNavItemComponent {
  @Input() icon!: IconDefinition;

  @Input() text!: string;

  @Input() link!: string;
}

@Component({
  selector: 'app-user-dl-item',
  template: `
    <dt>
      <fa-icon [icon]="icon" class="text-2xl"></fa-icon>
      <span class="sr-only">{{ title }}</span>
    </dt>
    <dd>{{ body }}</dd>
  `,
  styles: [` :host { @apply flex gap-4 items-center mb-8 } `]
})
export class UserDLItemComponent {
  @Input() icon!: IconDefinition;

  @Input() title!: string;

  @Input() body!: string;
}

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  showSideNav = false;

  appIcons = appIcons;

  initials = '';

  avatarColor = '';

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService, 
    private readonly createAvatarService: CreateAvatarService,
  ) {}

  ngOnInit() {
    const [color, letters] = this.createAvatarService.create([
      this.authService.authUser?.firstName as string, 
      this.authService.authUser?.lastName as string
    ]);

    this.avatarColor = color;
    this.initials = letters;
  }

  toogleSideNav() {
    this.showSideNav = !this.showSideNav;
  }

  onSignOut(event: Event) {
    event.preventDefault();

    this.authService.clearAuth();

    this.router.navigateByUrl('/');
  }
}

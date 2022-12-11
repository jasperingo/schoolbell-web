import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {}

  activate() {
    this.authService.loadAuth();
    
    if (this.authService.auth !== null) {
      return this.router.parseUrl('/account');
    }

    return true;
  }

  canActivate() {
    return this.activate();
  }
  canActivateChild() {
    return this.activate();
  }
}

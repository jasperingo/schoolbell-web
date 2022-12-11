import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { UserService } from 'src/app/services/user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService, 
    private readonly userService: UserService,
  ) {}

  activate() {
    this.authService.loadAuth();
    
    if (this.authService.auth === null) {
      return this.router.parseUrl('/');
    }

    return this.userService.me().pipe(
      mergeMap((user) => {
        this.authService.authUser = user;
        return of(true);
      }),
    );
  }

  canActivate() {
    return this.activate();
  }

  canActivateChild() {
    return this.activate();
  }
}

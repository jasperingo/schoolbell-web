import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
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

  activate(state: RouterStateSnapshot) {
    this.authService.loadAuth();
    
    if (this.authService.auth === null) {
      this.authService.redirectUrl = state.url;
      return this.router.parseUrl('/');
    }

    return this.userService.me().pipe(
      mergeMap((user) => {
        this.authService.authUser = user;
        return of(true);
      }),
    );
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.activate(state);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.activate(state);
  }
}

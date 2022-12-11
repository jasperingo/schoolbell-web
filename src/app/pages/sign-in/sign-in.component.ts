import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth-service/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    readonly router: Router,
    readonly authService: AuthService, 
    readonly toastrService: ToastrService,
  ) {
    authService.dataChanged$.subscribe((data) => {
      if (data !== null) {
        router.navigateByUrl('/account');
        toastrService.success('Sign in successful');
      }
    });

    authService.errorChanged$.subscribe((error) => {
      toastrService.error(error as string);
    });
  }

  onSubmit() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    this.authService.mutate(
      this.signInForm.value.phoneNumber as string, 
      this.signInForm.value.password as string
    );
  }
}

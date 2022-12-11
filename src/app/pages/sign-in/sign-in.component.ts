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
  loading = false;

  signInForm = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(
    private readonly router: Router,
    private readonly authService: AuthService, 
    private readonly toastrService: ToastrService,
  ) {}

  onSubmit() {
    if (!this.signInForm.valid) {
      this.signInForm.markAllAsTouched();
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.authService.create(
      this.signInForm.value.phoneNumber as string, 
      this.signInForm.value.password as string
    )
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/account');
        this.toastrService.success('Sign in successful');
      },

      error: (error) => {
        this.toastrService.error(error);
        this.loading = false;
      },
    });
  }
}

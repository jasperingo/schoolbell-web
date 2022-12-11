import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorDto } from 'src/app/models/validation-error-dto.model';
import { UserService } from 'src/app/services/user-service/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  loading = false;

  signUpForm = new FormGroup({
    lastName: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.maxLength(14), Validators.pattern(/^\+234\d{10}/)]),
  });

  constructor(
    private readonly router: Router,
    private readonly userService: UserService, 
    private readonly toastrService: ToastrService,
  ) {}

  onSubmit() {
    if (!this.signUpForm.valid) {
      this.signUpForm.markAllAsTouched();
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.userService.create({
       firstName: this.signUpForm.value.firstName as string, 
       lastName: this.signUpForm.value.lastName as string,
       phoneNumber: this.signUpForm.value.phoneNumber as string,
       password: this.signUpForm.value.password as string,
    })
    .subscribe({
      next: () => {
        this.router.navigateByUrl('/');
        this.toastrService.success('Account created, you can now sign in.');
      },

      error: (error) => {
        this.loading = false;

        if (Array.isArray(error)) {
          this.onValidationError(error);
        } else {
          this.toastrService.error(error);
        }
      },
    });
  }

  onValidationError(errors: ValidationErrorDto[]) {
    for (let err of errors) {
      switch(err.name) {
        case 'firstName':
          this.signUpForm.controls['firstName'].setErrors({ customError: err.message });
          break;

        case 'lastName':
          this.signUpForm.controls['lastName'].setErrors({ customError: err.message });
          break;

        case 'phoneNumber':
          this.signUpForm.controls['phoneNumber'].setErrors({ customError: err.message });
          break;

        case 'pin':
          this.signUpForm.controls['password'].setErrors({ customError: err.message });
          break;

        default:
          this.toastrService.error(err.message);
      }
    }
  }
}

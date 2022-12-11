import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ValidationErrorDto } from 'src/app/models/validation-error-dto.model';
import { EventService } from 'src/app/services/event-service/event.service';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent {
  loading = false;

  createEventForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly eventService: EventService, 
    private readonly toastrService: ToastrService,
  ) {}

  onSubmit() {
    if (!this.createEventForm.valid) {
      this.createEventForm.markAllAsTouched();
      return;
    }

    if (this.loading) {
      return;
    }

    this.loading = true;

    this.eventService.create({
       title: this.createEventForm.value.title as string, 
       description: this.createEventForm.value.description as string,
    })
    .subscribe({
      next: (data) => {
        this.router.navigateByUrl(`/account/events/${data.id}`);
        this.toastrService.success('Event created.');
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
        case 'title':
          this.createEventForm.controls['title'].setErrors({ customError: err.message });
          break;

        case 'description':
          this.createEventForm.controls['description'].setErrors({ customError: err.message });
          break;

        default:
          this.toastrService.error(err.message);
      }
    }
  }
}

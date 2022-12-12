import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormSelectOptionsType } from 'src/app/models/select-input-options.model';
import { ValidationErrorDto } from 'src/app/models/validation-error-dto.model';
import { EventOccurrenceService } from 'src/app/services/event-occurrence-service/event-occurrence.service';

const VENUE_OPTIONS = [
  { text: 'Virtual', value: 'virtual' },
  { text: 'Physical', value: 'physical' },
];

@Component({
  selector: 'app-create-event-occurrence',
  templateUrl: './create-event-occurrence.component.html',
  styleUrls: ['./create-event-occurrence.component.css']
})
export class CreateEventOccurrenceComponent implements OnInit {
  eventID = '';

  loading = false;

  showLinkInput = false;

  showAddressInput = false;

  venues: FormSelectOptionsType[] = VENUE_OPTIONS;

  createEventForm = new FormGroup({
    link: new FormControl('', []),
    address: new FormControl('', []),
    venue: new FormControl('', [Validators.required]),
    duration: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    startedAt: new FormControl('', [Validators.required]),
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute, 
    private readonly toastrService: ToastrService,
    private readonly eventOccurrenceService: EventOccurrenceService,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventID = params['id'];
    });
  }

  onVenueSelected(event: Event) {
    this.showLinkInput = false;
    this.showAddressInput = false;
    const value = (event.target as HTMLSelectElement).value;

    if (value === 'virtual') {
      this.showLinkInput = true;
    } else if (value === 'physical') {
      this.showAddressInput = true;
    }
  }

  onSubmit() {
    if (!this.createEventForm.valid) {
      this.createEventForm.markAllAsTouched();
      return;
    }
    if (this.loading) {
      return;
    }

    this.loading = true;

    this.eventOccurrenceService.create({
      eventId: Number(this.eventID),
      startedAt: this.createEventForm.value.startedAt as string, 
      description: this.createEventForm.value.description as string,
      venue: this.createEventForm.value.venue as string,
      link: this.createEventForm.value.link as string,
      address: this.createEventForm.value.address as string,
      duration: Number(this.createEventForm.value.duration as string),
    })
    .subscribe({
      next: (data) => {
        this.router.navigateByUrl(`/account/event-occurrences/${data.id}`);
        this.toastrService.success('Event occurrence created.');
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
        case 'startedAt':
          this.createEventForm.controls['startedAt'].setErrors({ customError: err.message });
          break;

        case 'description':
          this.createEventForm.controls['description'].setErrors({ customError: err.message });
          break;

        case 'venue':
          this.createEventForm.controls['venue'].setErrors({ customError: err.message });
          break;

        case 'duraion':
          this.createEventForm.controls['duration'].setErrors({ customError: err.message });
          break;

        case 'link':
          this.createEventForm.controls['link'].setErrors({ customError: err.message });
          break;

        case 'address':
          this.createEventForm.controls['address'].setErrors({ customError: err.message });
          break;

        default:
          this.toastrService.error(err.message);
      }
    }
  }
}

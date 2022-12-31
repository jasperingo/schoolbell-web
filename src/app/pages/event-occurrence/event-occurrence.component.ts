import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventOccurrence, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';
import { EventOccurrenceService } from 'src/app/services/event-occurrence-service/event-occurrence.service';

@Component({
  selector: 'app-event-occurrence-dl-item',
  template: `
    <dt class="font-bold mb-1">{{ title }}</dt>
    <dd *ngIf="!isLink">{{ body }}</dd>
    <dd *ngIf="isLink" >
      <a [href]="body" target="_blank" class="text-blue-500">{{ body }}</a>
    </dd>
  `,
  styles: [` :host { @apply block shadow rounded-lg p-4 mb-4 } `]
})
export class EventOccurrenceDLItemComponent {
  @Input() title!: string;

  @Input() body!: string;

  @Input() isLink = false;
}

@Component({
  selector: 'app-event-occurrence',
  templateUrl: './event-occurrence.component.html',
  styleUrls: ['./event-occurrence.component.css']
})
export class EventOccurrenceComponent implements OnInit {
  eventID = '';

  loading = false;

  error: string | null = null;

  eventOccurrence: EventOccurrence | null = null;

  cancelLoading = false;

  postponeLoading = false;

  reminderLoading = false;

  postponeForm = new FormGroup({
    startedAt: new FormControl(this.eventOccurrence?.startedAt, [Validators.required]),
  });

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly eventOccurrenceService: EventOccurrenceService,
    private readonly eventDateAndStatusService: EventDateAndStatusService,
  ) { }
  
  get canManage() {
    return this.isHost && !this.eventOccurrence?.cancelledAt && this.status !== 'ended';
  }

  get isHost() {
    return this.host?.user.id === this.authService.authUser?.id;
  }

  get host() {
    return this.eventOccurrence?.event.participants.find((p) => p.host);
  }

  get status() {
    return this.eventDateAndStatusService.getStatus(this.eventOccurrence as EventOccurrence);
  }

  get startDate() {
    return this.eventDateAndStatusService.getStartDateString(this.eventOccurrence as EventOccurrence);
  }

  get endDate() {
    return this.eventDateAndStatusService.getEndDateString(this.eventOccurrence as EventOccurrence);
  }

  get cancelDate() {
    return this.eventDateAndStatusService.getCancelDateString(this.eventOccurrence as EventOccurrence);
  }

  get statusTexts(): EventOccurrenceStatusMessages {
    return {
      ended: 'Ended',
      cancelled: 'Cancelled',
      'on-going': 'On going',
      'not-started': 'Not started',
    }
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventID = params['id'];
    });

    this.fetchEvent();
  }

  retryFetchEvent() {
    this.error = null;
    this.fetchEvent();
  }

  fetchEvent() {
    if (this.loading) { 
      return;
    }

    this.loading = true;

    this.eventOccurrenceService.getOne(this.eventID)
      .subscribe({ 
        next: (res) => {
          this.loading = false;
          this.eventOccurrence = res;
        },

        error: (error) =>  {
          this.loading = false;
          this.error = error;
        }
      });
  }

  cancelEvent() {
    this.cancelLoading = true;
    
    this.eventOccurrenceService.cancel(this.eventID)
      .subscribe({ 
        next: (res) => {
          this.cancelLoading = false;
          this.eventOccurrence = res;
          this.toastrService.success('Event cancelled');
        },

        error: (error) =>  {
          this.cancelLoading = false;
          this.toastrService.error(error);
        }
      });
  }

  sendReminder() {
    this.reminderLoading = true;
    
    this.eventOccurrenceService.remind(this.eventID)
      .subscribe({ 
        next: () => {
          this.reminderLoading = false;
          this.toastrService.success('Event reminder sent');
        },

        error: (error) =>  {
          this.reminderLoading = false;
          this.toastrService.error(error);
        }
      });
  }

  onPostpone() {
    this.postponeLoading = true;
    
    this.eventOccurrenceService.postpone(
      this.eventID,
      { startedAt: this.postponeForm.value.startedAt as string }
    )
      .subscribe({ 
        next: (res) => {
          this.postponeLoading = false;
          this.eventOccurrence = res;
          this.toastrService.success('Event start date updated');
          this.postponeForm.value.startedAt = '';
        },

        error: (error) =>  {
          this.postponeLoading = false;
          this.toastrService.error(error);
        }
      });
  }
}

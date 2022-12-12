import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EventOccurrence } from 'src/app/models/event-occurrence.model';
import { AuthService } from 'src/app/services/auth-service/auth.service';
import { EventOccurrenceService } from 'src/app/services/event-occurrence-service/event-occurrence.service';

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
    const endDate = new Date(this.endDate);
    const startDate = new Date(this.startDate);

    return (endDate.getTime() <= Date.now()) 
      ? 'ended'
      : (startDate.getTime() < Date.now() && endDate.getTime() > Date.now())
        ? 'on-going'
        : 'not-started'
  }

  get startDate() {
    return new Date(this.eventOccurrence?.startedAt ?? '').toLocaleString();
  }

  get endDate() {
    const date = new Date(this.eventOccurrence?.startedAt ?? '');
    date.setMinutes(date.getMinutes() + (this.eventOccurrence?.duration ?? 0));
    return date.toLocaleString();
  }

  get cancelDate() {
    return new Date(this.eventOccurrence?.cancelledAt ?? '').toLocaleString();
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
        },

        error: (error) =>  {
          this.postponeLoading = false;
          this.toastrService.error(error);
        }
      });
  }
}

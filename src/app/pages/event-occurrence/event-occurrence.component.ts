import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private readonly route: ActivatedRoute, 
    private readonly authService: AuthService,
    private readonly eventOccurrenceService: EventOccurrenceService,
  ) { }

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
    return new Date(this.eventOccurrence?.startedAt ?? '').toUTCString();
  }

  get endDate() {
    const date = new Date(this.eventOccurrence?.startedAt ?? '');
    date.setMinutes(date.getMinutes() + (this.eventOccurrence?.duration ?? 0));
    return date.toUTCString();
  }

  get cancelDate() {
    return new Date(this.eventOccurrence?.cancelledAt ?? '').toUTCString();
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
}

import { Component, Input } from '@angular/core';
import { EventOccurrenceStatus, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';

@Component({
  selector: 'app-event-occurrence-status',
  templateUrl: './event-occurrence-status.component.html',
  styleUrls: ['./event-occurrence-status.component.css']
})
export class EventOccurrenceStatusComponent {
  @Input() status!: EventOccurrenceStatus;

  @Input() texts!: EventOccurrenceStatusMessages;

  constructor(private readonly eventDateAndStatusService: EventDateAndStatusService) {}

  get statusColor() {
    return this.eventDateAndStatusService.statusColors[this.status];
  }

  get statusText() {
    return this.texts[this.status];
  }
}

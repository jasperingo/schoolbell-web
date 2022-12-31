import { Component, Input } from '@angular/core';
import { EventOccurrenceStatus, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';

@Component({
  selector: 'app-event-occurrence-status-with-date',
  templateUrl: './event-occurrence-status-with-date.component.html',
  styleUrls: ['./event-occurrence-status-with-date.component.css']
})
export class EventOccurrenceStatusWithDateComponent {
  @Input() startDate!: string;

  @Input() endDate!: string;

  @Input() status!: EventOccurrenceStatus;

  @Input() endTexts!: EventOccurrenceStatusMessages;

  @Input() startTexts!: EventOccurrenceStatusMessages;

  constructor(private readonly eventDateAndStatusService: EventDateAndStatusService) {}

  get statusColor() {
    return this.eventDateAndStatusService.statusColors[this.status];
  }

  get startStatusText() {
    return this.startTexts[this.status];
  }

  get endStatusText() {
    return this.endTexts[this.status];
  }
}

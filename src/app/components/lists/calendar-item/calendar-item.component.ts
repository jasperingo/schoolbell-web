import { Component, Input } from '@angular/core';
import { EventOccurrence, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent {
  @Input() item!: EventOccurrence;

  constructor(private readonly eventDateAndStatusService: EventDateAndStatusService) {}

  get startTime() {
    return this.eventDateAndStatusService.getStartTimeString(this.item);
  }

  get endTime() {
    return this.eventDateAndStatusService.getEndTimeString(this.item);
  }

  get status() {
    return this.eventDateAndStatusService.getStatus(this.item);
  }

  get statusTexts(): EventOccurrenceStatusMessages {
    return {
      ended: 'Ended',
      cancelled: 'Cancelled',
      'on-going': 'On going',
      'not-started': 'Not started',
    }
  }
}

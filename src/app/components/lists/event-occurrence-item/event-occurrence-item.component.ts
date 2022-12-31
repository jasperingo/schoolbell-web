import { Component, Input } from '@angular/core';
import { EventOccurrence, EventOccurrenceStatusMessages } from 'src/app/models/event-occurrence.model';
import { EventDateAndStatusService } from 'src/app/services/event-date-and-status/event-date-and-status.service';

@Component({
  selector: 'app-event-occurrence-item',
  templateUrl: './event-occurrence-item.component.html',
  styleUrls: ['./event-occurrence-item.component.css']
})
export class EventOccurrenceItemComponent {
  @Input() item!: EventOccurrence;

  constructor(private readonly eventDateAndStatusService: EventDateAndStatusService) {}

  get status() {
    return this.eventDateAndStatusService.getStatus(this.item);
  }

  get startDate() {
    return this.eventDateAndStatusService.getStartDateString(this.item);
  }

  get endDate() {
    return this.eventDateAndStatusService.getEndDateString(this.item);
  }

  get cancelledStatusTexts(): EventOccurrenceStatusMessages {
    return {
      ended: '',
      'on-going': '',
      'not-started': '',
      cancelled: 'Cancelled',
    };
  }

  get startStatusTexts(): EventOccurrenceStatusMessages {
    return {
      cancelled: '',
      ended: 'Started by',
      'on-going': 'Started by',
      'not-started': 'Starts by',
    };
  }

  get endStatusTexts(): EventOccurrenceStatusMessages {
    return {
      cancelled: '',
      ended: 'Ended by',
      'on-going': 'Ends by',
      'not-started': 'Ends by',
    }
  }
}

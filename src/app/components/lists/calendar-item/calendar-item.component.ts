import { Component, Input } from '@angular/core';
import { EventOccurrence } from 'src/app/models/event-occurrence.model';

@Component({
  selector: 'app-calendar-item',
  templateUrl: './calendar-item.component.html',
  styleUrls: ['./calendar-item.component.css']
})
export class CalendarItemComponent {
  @Input() item!: EventOccurrence;

  get startTime() {
    return new Date(this.item.startedAt).toLocaleTimeString();
  }

  get endTime() {
    const date = new Date(this.item.startedAt);
    date.setMinutes(date.getMinutes() + this.item.duration);
    return date.toLocaleTimeString();
  }

  get status() {
    const endDate = new Date(this.item.startedAt);
    endDate.setMinutes(endDate.getMinutes() + this.item.duration);

    const startDate = new Date(this.item.startedAt);

    return (this.item.cancelledAt)
      ? 'cancelled'
      : (endDate.getTime() <= Date.now()) 
        ? 'ended'
        : (startDate.getTime() < Date.now() && endDate.getTime() > Date.now())
          ? 'on-going'
          : 'not-started'
  }
}

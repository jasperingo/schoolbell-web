import { Component, Input } from '@angular/core';
import { EventOccurrence } from 'src/app/models/event-occurrence.model';

@Component({
  selector: 'app-event-occurrence-item',
  templateUrl: './event-occurrence-item.component.html',
  styleUrls: ['./event-occurrence-item.component.css']
})
export class EventOccurrenceItemComponent {
  @Input() item!: EventOccurrence;

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
    return new Date(this.item.startedAt).toUTCString();
  }

  get endDate() {
    const date = new Date(this.item.startedAt);
    date.setMinutes(date.getMinutes() + this.item.duration);
    return date.toUTCString();
  }
}

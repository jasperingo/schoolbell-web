import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOccurrenceStatusWithDateComponent } from './event-occurrence-status-with-date.component';

describe('EventOccurrenceStatusWithDateComponent', () => {
  let component: EventOccurrenceStatusWithDateComponent;
  let fixture: ComponentFixture<EventOccurrenceStatusWithDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOccurrenceStatusWithDateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOccurrenceStatusWithDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

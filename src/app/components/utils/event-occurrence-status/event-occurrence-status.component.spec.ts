import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOccurrenceStatusComponent } from './event-occurrence-status.component';

describe('EventOccurrenceStatusComponent', () => {
  let component: EventOccurrenceStatusComponent;
  let fixture: ComponentFixture<EventOccurrenceStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOccurrenceStatusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOccurrenceStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOccurrenceComponent } from './event-occurrence.component';

describe('EventOccurrenceComponent', () => {
  let component: EventOccurrenceComponent;
  let fixture: ComponentFixture<EventOccurrenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOccurrenceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOccurrenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

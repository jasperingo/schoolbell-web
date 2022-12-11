import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventOccurrenceItemComponent } from './event-occurrence-item.component';

describe('EventOccurrenceItemComponent', () => {
  let component: EventOccurrenceItemComponent;
  let fixture: ComponentFixture<EventOccurrenceItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventOccurrenceItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventOccurrenceItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

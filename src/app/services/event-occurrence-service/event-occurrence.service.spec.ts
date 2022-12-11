import { TestBed } from '@angular/core/testing';

import { EventOccurrenceService } from './event-occurrence.service';

describe('EventOccurrenceService', () => {
  let service: EventOccurrenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventOccurrenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

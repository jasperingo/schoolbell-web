import { TestBed } from '@angular/core/testing';

import { EventDateAndStatusService } from './event-date-and-status.service';

describe('EventDateAndStatusService', () => {
  let service: EventDateAndStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EventDateAndStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

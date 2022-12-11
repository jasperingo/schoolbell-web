import { TestBed } from '@angular/core/testing';

import { CreateAvatarService } from './create-avatar.service';

describe('CreateAvatarService', () => {
  let service: CreateAvatarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateAvatarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UniqueUsernameService } from './unique-username.service';

describe('UniqueUsernameService', () => {
  let service: UniqueUsernameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UniqueUsernameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

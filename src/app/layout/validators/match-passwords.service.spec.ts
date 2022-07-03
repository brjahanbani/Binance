import { TestBed } from '@angular/core/testing';

import { MatchPasswordsService } from './match-passwords.service';

describe('MatchPasswordsService', () => {
  let service: MatchPasswordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MatchPasswordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

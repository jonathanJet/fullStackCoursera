import { TestBed } from '@angular/core/testing';

import { LeaderService_ } from './leader.service';

describe('LeaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeaderService_ = TestBed.get(LeaderService_);
    expect(service).toBeTruthy();
  });
});

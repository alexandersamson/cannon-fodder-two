import { TestBed } from '@angular/core/testing';

import { SurnamesService } from './surnames.service';

describe('SurnamesService', () => {
  let service: SurnamesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurnamesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

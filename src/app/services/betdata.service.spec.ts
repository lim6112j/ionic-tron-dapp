import { TestBed } from '@angular/core/testing';

import { BetdataService } from './betdata.service';

describe('BetdataService', () => {
  let service: BetdataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BetdataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

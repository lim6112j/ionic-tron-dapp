import { TestBed } from '@angular/core/testing';

import { DatafeedService } from './datafeed.service';

describe('DatafeedService', () => {
  let service: DatafeedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatafeedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

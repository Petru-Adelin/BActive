import { TestBed } from '@angular/core/testing';

import { StatsHTTPService } from './stats-http.service';

describe('StatsHTTPService', () => {
  let service: StatsHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatsHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

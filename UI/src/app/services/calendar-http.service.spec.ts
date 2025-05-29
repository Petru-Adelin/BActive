import { TestBed } from '@angular/core/testing';

import { CalendarHTTPService } from './calendar-http.service';

describe('CalendarHTTPService', () => {
  let service: CalendarHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

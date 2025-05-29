import { TestBed } from '@angular/core/testing';

import { CSRFServiceService } from './csrfservice.service';

describe('CSRFServiceService', () => {
  let service: CSRFServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSRFServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

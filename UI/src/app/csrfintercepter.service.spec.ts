import { TestBed } from '@angular/core/testing';

import { CSRFIntercepterService } from './csrfintercepter.service';

describe('CSRFIntercepterService', () => {
  let service: CSRFIntercepterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSRFIntercepterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

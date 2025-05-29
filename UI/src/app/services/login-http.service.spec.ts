import { TestBed } from '@angular/core/testing';

import { LoginHTTPService } from './login-http.service';

describe('LoginHTTPService', () => {
  let service: LoginHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

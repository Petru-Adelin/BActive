// csrf.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { CSRFServiceService } from './services/csrfservice.service';

export const csrfInterceptor: HttpInterceptorFn = (req, next) => {
  const csrfService = inject(CSRFServiceService);

  // Only add CSRF token to state-changing requests
  if (req.method === 'POST' || req.method === 'PUT' || req.method === 'DELETE') {
    const csrfToken = csrfService.getAuthToken();
    if (csrfToken) {
      const csrfReq = req.clone({
        headers: req.headers.set('X-CSRFToken', csrfToken)
      });
      return next(csrfReq);
    }
  }
  return next(req);
};
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CSRFServiceService {

  private http = inject(HttpClient)
  private csrf_token = new BehaviorSubject<string>('')
  private url = 'localhost:8000/csrf/'

  constructor() { }

  getCSRF(): Observable<any> {
    return this.http.get(`${this.url}`, {withCredentials: true}).pipe(
      tap((response: any) => {
        this.csrf_token.next(response.csrfToken)
      })
    )
  }

  getAuthToken(): string {
    return this.csrf_token.value;
  }
}

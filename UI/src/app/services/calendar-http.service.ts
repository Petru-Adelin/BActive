import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CalendarHTTPService {

  private http = inject(HttpClient)
  private url = '127.0.0.1:8000/'
  private csrf_token = 'AgtRhcofxbuAFZvdLwRTRDfB8RgGH0CF'
  private header = new HttpHeaders({
    'X-CSRFToken': `${this.csrf_token}`,
    'Content-Type': `aplication/json`
  })

  getStatus(){
    return this.http.get(`${this.url}`)
  }

  constructor() { 

    this.http.get(`${this.url}/csrf`);
  }
}

import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http'
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class CalendarHTTPService {

  private http = inject(HttpClient)
  private url = 'http://localhost:8000/'
  private header = new HttpHeaders({
    'Content-Type': 'aplication/json'
  })


  getDailyStats(date: string, user_id: number): Observable<any>{
    const requestBody = {
      date,
      user_id 
    }
    return this.http.post(`${this.url}calendar/`, requestBody, {headers: this.header})
  }

  constructor() { 

    this.http.get(`${this.url}/csrf`);
  }
}

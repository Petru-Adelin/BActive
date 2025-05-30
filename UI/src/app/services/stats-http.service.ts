import { Injectable, inject } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsHTTPService {

  private http = inject(HttpClient)
  private url = 'http://localhost:8000/'
  private header = new HttpHeaders({
    'Content-Type': 'aplication/json'
  })


  getWeeklyStats(date1: string, date2: string, user_id: number): Observable<any> {
    const requestBody = {
      date1,
      date2,
      user_id
    }
    return this.http.post(`${this.url}stats/`, requestBody, {headers: this.header})
  }

  getYearlyStats(year: number, user_id: number): Observable<any>{
    const requestBody = {
      year, 
      user_id
    }
    return this.http.post(`${this.url}stats/yearly/`, requestBody, {headers: this.header})
  }

  constructor() { }
}

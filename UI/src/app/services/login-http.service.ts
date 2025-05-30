import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Inject } from '@angular/core';
import {  Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginHTTPService {

    private http = inject(HttpClient)
    private url = 'http://localhost:8000/'
    private header = new HttpHeaders({
      'Content-Type': 'aplication/json'
    })

    constructor(@Inject(DOCUMENT) private document: Document) { }

  
    getStatus(): Observable<string>{
      return this.http.get(`${this.url}home/`, {
        responseType: 'text'
      })
    }

   

    login(username: string, password: string): Observable<any>{

        const requestBody = {
          username,
          password
        }
        return this.http.post(`${this.url}login/`, requestBody ,{headers: this.header})     
        
    }

    singin(username: string, password: string, email: string, age: number): Observable<any>{
      const requestBody = {
        username, 
        password, 
        age, 
        email
      }
      return this.http.post(`${this.url}singin/`, requestBody, {headers: this.header})

    }
  
}

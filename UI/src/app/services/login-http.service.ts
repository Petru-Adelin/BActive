import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, Inject } from '@angular/core';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LoginHTTPService {

    private http = inject(HttpClient)
    private url = 'http://localhost:8000/'
    private csrf_token = new BehaviorSubject<String>('')
    private header = new HttpHeaders({
      'X-CSRFToken': `${this.csrf_token}`,
      'Content-Type': `text`
    })

    constructor(@Inject(DOCUMENT) private document: Document) { }

  
    getStatus(): Observable<string>{
      return this.http.get(`${this.url}home/`, {
        responseType: 'text'
      })
    }

    

    getCSRFToken(): string | null{
      this.http.get(`${this.url}/csrf`)
      const name = 'csrftoken'
      const val = this.document.cookie.split('; ').find(row => row.startsWith(name + '='))?.split('=')[1]
      return val || null;
    }

    login(username: string, password: string): Observable<string>{


        
            

        const requestBody = {
          username,
          password
        }
        return this.http.post(`${this.url}login/`, requestBody ,{
          responseType: 'text',
          headers: this.header
        })
        
        
    }

    singin(username: string, password: string, email: string, age: number): Observable<String>{
      const requestBody = {
        username, 
        password, 
        age, 
        email
      }
      return this.http.post(`${this.url}singin/`, requestBody, {
        headers: this.header,
        responseType: 'text'
      })

    }
  
}

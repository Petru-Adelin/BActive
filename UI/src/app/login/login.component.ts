import { Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {Router} from '@angular/router';
import { LoginHTTPService } from '../services/login-http.service';
import { OnInit } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,MatCardModule,MatInputModule,MatButtonModule,MatIconModule,MatFormFieldModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  
})
export class LoginComponent  implements OnInit{
  loginHttp = inject(LoginHTTPService)
  user={
    email:'',
    password:''
  };
  storedUser={
    email:'test@gmail.com',
    password:'password123',
  };

  loginValid:boolean=true;

  router=inject(Router);

  /**
   * This part should be reaplaced by the sending of the information via fetch or other http call 
   * to the server
   */
  validateLogin(email:string,password:string):boolean{
    return email===this.storedUser.email && password===this.storedUser.password;
  }

  login(event: Event){

    
    const form = event.target as HTMLFormElement
    const usernameInput = form.querySelector("input[name='email']") as HTMLInputElement
    const passwordInput = form.querySelector("input[name='password']") as HTMLInputElement
    if(usernameInput && passwordInput){
      const data = {
        username: usernameInput.value,
        password: passwordInput.value
      }

      // clean the input fields
      usernameInput.value = ""
      passwordInput.value = ""
      console.log(data)
      this.loginHttp.login(data.username, data.password).subscribe(response => {
        console.log(response)
        if(response.status == 200){
          console.log('login established...')
          this.router.navigate(['/dashboard'])
        }else{
          console.log(response)
        }
      })
    }
   
  }

  signin(event: Event){
    const form = event.target as HTMLFormElement
    const usernameInput = form.querySelector("input[name='username']") as HTMLInputElement
    const passwordInput = form.querySelector("input[name='password']") as HTMLInputElement
    const emailInput = form.querySelector("input[name='email']") as HTMLInputElement
    const ageInput = form.querySelector("input[name='age']") as HTMLInputElement

    if(usernameInput && passwordInput && emailInput && ageInput){
      const data = {
        username: usernameInput.value,
        password: passwordInput.value,
        email: emailInput.value,
        age: +ageInput.value
      }
      this.loginHttp.singin(data.username, data.password, data.email, data.age).subscribe(response => {
        if(response.status == 200){
          console.log('Singin enstablished...')
          this.router.navigate(['/dashboard'])
        }else{
          console.log(response)
        }
      })
    }

  }

  ngOnInit(): void {
      this.loginHttp.login('adelin', 'password123').subscribe((data) => console.log(data))
      // this.loginHttp.getToken().subscribe(dta => console.log(dta))
      
  }

}

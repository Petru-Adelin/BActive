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
    // if(this.validateLogin(this.user.email,this.user.password)){
    //   localStorage.setItem('loggedInUser',JSON.stringify(this.user.email));
    //   this.loginValid=true;
    //   this.router.navigate(['/dashboard']);
    // }else{
    //   // alert('Incorrect email or password');
    //   this.loginValid=false;
    // }
    console.log('asdsf')
  }

  ngOnInit(): void {
      this.loginHttp.login('adelin', 'password123').subscribe((data) => console.log(data))
  }

}

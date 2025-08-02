import { Component } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';
  messageClass: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.http.post<any>('http://localhost:8080/user/login',{ email: this.email, password: this.password }).subscribe(
      response => {
        this.message =` Welcome ${response.username}, Login successful!`;
        this.messageClass = 'success';
        
        setTimeout(() => {
          this.router.navigate(['profile']); // Redirect to a dashboard or home page after login
        }, 2000);
      },
      error => {
        this.message = 'Incorrect email or password.';
        this.messageClass = 'error';
      }
    );
  }
}
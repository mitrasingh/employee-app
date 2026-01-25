import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginResponse } from '../../models/login.model';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  http = inject(HttpClient);
  router = inject(Router);
  apiUrl = 'https://dummyjson.com/auth/login';

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.http.post<LoginResponse>(this.apiUrl, this.loginForm.value).subscribe({
      next: (response) => {
        if (response.accessToken) {
          localStorage.setItem('employee-management', JSON.stringify(response));
          this.router.navigateByUrl('dashboard');
          console.log('Login Successful');
        } else {
          alert('Invalid Credentials');
        }
      },
      error: (error) => {
        console.error('Login failed:', error);
        alert('Invalid username or password');
      },
    });
  }
}

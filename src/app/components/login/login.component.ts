import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from '../../models/login.model';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
    this.authService.login(this.loginForm.value as LoginRequest).subscribe({
      next: (response) => {
        if (response.accessToken) {
          this.authService.storeUserData(response);
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

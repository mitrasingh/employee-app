import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    username: new FormControl('', { nonNullable: true }),
    password: new FormControl('', { nonNullable: true }),
  });

  onSubmit() {
    this.authService.login(this.loginForm.getRawValue()).subscribe({
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

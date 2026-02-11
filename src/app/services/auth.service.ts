import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, LoginResponse } from '../models/login.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private apiUrl = 'https://dummyjson.com/auth/login';

  /*  credentials are: username: 'emilys', password: 'emilyspass' */

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credentials);
  }

  storeUserData(response: LoginResponse) {
    localStorage.setItem('employee-management', JSON.stringify(response));
  }
}

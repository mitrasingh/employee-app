import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}
  private baseUrl = `${environment.supabase.apiUrl}/rest/v1`;
  private headers = new HttpHeaders({
    apikey: environment.supabase.anonKey,
    Authorization: `Bearer ${environment.supabase.anonKey}`,
  });

  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  employees$ = this.employeesSubject.asObservable();

  loadEmployees(): void {
    this.http
      .get<Employee[]>(`${this.baseUrl}/employees`, { headers: this.headers })
      .subscribe((data) => this.employeesSubject.next(data));
  }
}

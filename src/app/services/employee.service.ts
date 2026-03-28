import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, filter } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private baseUrl = `${environment.apiUrl}/employees`;

  private employeesSubject = new BehaviorSubject<Employee[] | null>(null);

  employees$ = this.employeesSubject.pipe(
    filter((employees): employees is Employee[] => employees !== null),
  );

  constructor(private http: HttpClient) {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.http.get<Employee[]>(this.baseUrl).subscribe({
      next: (data) => this.employeesSubject.next(data),
      error: (err) => console.error('API error:', err),
    });
  }

  addEmployee(employee: Partial<Employee>) {
    return this.http.post<Employee>(this.baseUrl, employee).pipe(tap(() => this.loadEmployees()));
  }

  updateEmployee(id: number, employee: Partial<Employee>) {
    return this.http
      .put<Employee>(`${this.baseUrl}/${id}`, employee)
      .pipe(tap(() => this.loadEmployees()));
  }

  deleteEmployee(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`).pipe(tap(() => this.loadEmployees()));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Department } from '../models/department.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = `${environment.apiUrl}/departments`;

  private departmentsSubject = new BehaviorSubject<Department[]>([]);
  departments$ = this.departmentsSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadDepartments();
  }

  loadDepartments(): void {
    this.http.get<Department[]>(this.baseUrl).subscribe({
      next: (data) => {
        this.departmentsSubject.next(data);
      },
      error: (err) => {
        console.error('API error:', err);
      },
    });
  }

  addDepartment(department: Partial<Department>) {
    return this.http.post<Department>(this.baseUrl, department);
  }

  updateDepartment(id: number, department: Partial<Department>) {
    return this.http.put<Department>(`${this.baseUrl}/${id}`, department);
  }

  deleteDepartment(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}

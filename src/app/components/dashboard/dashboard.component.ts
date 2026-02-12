import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        console.log('Employees:', data);
        console.log(environment.supabase.anonKey);
      },
      error: (error) => {
        console.error('Error fetching employees:', error);
      },
    });
  }
}

import { Component } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  employeeCount: number = 0;
  constructor(private employeeService: EmployeeService) {
    this.employeeService.loadEmployees();
    this.employeeService.employees$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => {
        console.log('Employees:', data);
        this.employeeCount = data.length;
      },
      error: (err) => console.error('Error fetching employees:', err),
    });
  }
}

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
  constructor(private employeeService: EmployeeService) {
    this.employeeService.employees$.pipe(takeUntilDestroyed()).subscribe({
      next: (data) => console.log('Employees:', data),
      error: (err) => console.error('Error fetching employees:', err),
    });
  }
}

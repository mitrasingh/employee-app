import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  employeeCount: number = 0;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.employees$.subscribe({
      next: (data) => {
        console.log('Employee data received:', data);
        this.employeeCount = data.length;
        console.log('Employee count set to:', this.employeeCount);
      },
      error: (err) => console.error('Error:', err),
    });

    this.employeeService.loadEmployees();
  }
}

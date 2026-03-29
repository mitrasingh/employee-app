import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  employeeCount$ = this.employeeService.employees$.pipe(map((employees) => employees.length));

  newestHire$ = this.employeeService.employees$.pipe(
    map(
      (employees) =>
        [...employees].sort(
          (a, b) => new Date(b.hire_date).getTime() - new Date(a.hire_date).getTime(),
        )[0] ?? null,
    ),
  );

  constructor(private employeeService: EmployeeService) {}
}

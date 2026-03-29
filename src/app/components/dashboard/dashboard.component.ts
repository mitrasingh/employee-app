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

  averageTenure$ = this.employeeService.employees$.pipe(
    map((employees) => {
      if (!employees.length) return 0;

      const now = new Date();
      const totalYears = employees.reduce((sum, employee) => {
        const hireDate = new Date(employee.hire_date);
        const years = (now.getTime() - hireDate.getTime()) / (1000 * 60 * 60 * 24 * 365.25);
        return sum + years;
      }, 0);

      return (totalYears / employees.length).toFixed(1);
    }),
  );

  constructor(private employeeService: EmployeeService) {}
}

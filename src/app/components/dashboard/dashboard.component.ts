import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  employeeCount$;

  constructor(private employeeService: EmployeeService) {
    this.employeeCount$ = this.employeeService.employees$.pipe(
      map((employees) => employees.length),
    );
  }
}

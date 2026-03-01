import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { map } from 'rxjs/operators';
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
    this.employeeService.employees$.pipe(map((data) => data.length)).subscribe({
      next: (count) => {
        this.employeeCount = count;
      },
      error: (err) => console.error(err),
    });
  }
}

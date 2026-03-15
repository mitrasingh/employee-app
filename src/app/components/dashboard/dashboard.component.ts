import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { DepartmentService } from '../../services/department.service';
import { LocationService } from '../../services/location.service';
import { Employee } from '../../models/employee.model';
import { Department } from '../../models/department.model';
import { Location } from '../../models/location.model';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  employeeCount: number = 0;
  newestHire: Employee | null = null;
  departmentCount: number = 0;
  departments: Department[] = [];
  locations: Location[] = [];

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private locationService: LocationService,
  ) {}

  ngOnInit(): void {
    this.employeeService.employees$.subscribe((data) => {
      this.employeeCount = data.length;
      this.newestHire = data.length > 0 ? data[0] : null;
    });

    this.departmentService.departments$.subscribe((data) => {
      this.departments = data;
      this.departmentCount = data.length;
    });

    this.locationService.locations$.subscribe((data) => {
      this.locations = data;
    });

    this.employeeService.loadEmployees();
    this.departmentService.loadDepartments();
    this.locationService.loadLocations();
  }
}

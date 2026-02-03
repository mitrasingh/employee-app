import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './components/layout/layout.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { DepartmentsComponent } from './components/departments/departments.component';
import { LocationsComponent } from './components/locations/locations.component';
import { ReportsComponent } from './components/reports/reports.component';

// Will add employee details, departments details and location details later
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent,
      },
      {
        path: 'departments',
        component: DepartmentsComponent,
      },
      {
        path: 'locations',
        component: LocationsComponent,
      },
      {
        path: 'reports',
        component: ReportsComponent,
      },
    ],
  },
];

import { Location } from './location.model';
import { Department } from './department.model';
export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  department: Department;
  jobTitle: string;
  hireDate: string;
  salary: number;
  location: Location;
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

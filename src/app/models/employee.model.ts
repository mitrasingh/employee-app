export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  jobTitle: string;
  hireDate: string;
  salary: number;
  location: 'New York' | 'San Francisco' | 'Chicago';
  isActive: boolean;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

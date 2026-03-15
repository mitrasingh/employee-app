export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department: string;
  department_id: number;
  job_title: string;
  hire_date: string;
  salary: number;
  location: string;
  location_id: number;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
}

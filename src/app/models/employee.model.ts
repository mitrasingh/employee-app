export interface Employee {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department_id: number;
  department_name: string;
  job_title: string;
  hire_date: string;
  salary: number;
  location_id: number;
  location_city: string;
  is_active: boolean;
  avatar_url: string | null;
  created_at: string;
}

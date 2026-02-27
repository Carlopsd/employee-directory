export interface EmployeeDetail {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  department: string;
  startDate: string;
  status: "active" | "inactive";
}

export type CreateEmployeeDetail = Omit<EmployeeDetail, "id">;

export type UpdateEmployeeDetail = EmployeeDetail;

export interface Department {
  id: number;
  name: string;
}

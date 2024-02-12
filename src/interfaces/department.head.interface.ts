export interface DepartmentHeadInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  created_by: number;
  department_id: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DepartmentHeadRepositoryInterface {
  findAll(): Promise<DepartmentHeadInterface[]>;
  create(department: DepartmentHeadInterface): Promise<DepartmentHeadInterface>;
  update(id: number, department: DepartmentHeadInterface): Promise<DepartmentHeadInterface>;
  delete(id: number): Promise<DepartmentHeadInterface>;
  findById(id: number): Promise<DepartmentHeadInterface | null>;
  findByEmail(email: string): Promise<DepartmentHeadInterface | null>;
  findByDepartment(id: number): Promise<DepartmentHeadInterface[] | null>;


}

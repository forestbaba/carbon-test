export interface DepartmentInterface {
  id: number;
  name: string;
  created_by: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface DepartmentRepositoryInterface {
  findAll(): Promise<DepartmentInterface[]>;
  create(department: DepartmentInterface): Promise<DepartmentInterface>;
  update(id: number, department: DepartmentInterface): Promise<DepartmentInterface>;
  delete(id: number): Promise<DepartmentInterface>;
  findById(id: number): Promise<DepartmentInterface | null>;
}

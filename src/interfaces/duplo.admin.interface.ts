export interface DuploAdminInterface {
  id: number;
  name: string;
  email: string;
  active: boolean;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface DuploAdminRepositoryInterface {
  findAll(): Promise<DuploAdminInterface[]>;
  create(admin: DuploAdminInterface): Promise<DuploAdminInterface>;
  update(id: number, admin: DuploAdminInterface): Promise<DuploAdminInterface>;
  delete(id: number): Promise<DuploAdminInterface>;
  findById(id: number): Promise<DuploAdminInterface | null>;
  findByEmail(email: string): Promise<DuploAdminInterface | null>;
}

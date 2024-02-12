export interface UserInterface {
  id: number;
  name: string;
  email: string;
  password: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserRepositoryInterface {
  findAll(): Promise<UserInterface[]>;
  create(user: UserInterface): Promise<UserInterface>;
  update(id: number, user: UserInterface): Promise<UserInterface>;
  delete(id: number): Promise<UserInterface>;
  findById(id: number): Promise<UserInterface | null>;
  findByEmail(email: string): Promise<UserInterface | null>;
}

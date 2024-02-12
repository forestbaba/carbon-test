import { User } from "../entity/user.entity";

export interface InventoryInterface {
  id: number;
  name: string;
  price: number;
  quantity: number;
  department_id: number;
  created_by: User;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
export interface InventoryRepositoryInterface {
  findAll(): Promise<InventoryInterface[]>;
  create(inventory: InventoryInterface): Promise<InventoryInterface>;
  update(id: number, inventory: InventoryInterface): Promise<InventoryInterface>;
  delete(id: number): Promise<InventoryInterface>;
  findById(id: number): Promise<InventoryInterface | null>;
  findByNameAndBusinessId(name: string, id: User): Promise<InventoryInterface | null>;
  findByUser(name: string, id: User): Promise<InventoryInterface | null>;
  findByUserAndDepartment(user: User, department: number): Promise<InventoryInterface | null>;
  findByDepartment(department: number): Promise<InventoryInterface[] | null>;
}

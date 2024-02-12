import { OrderItems } from "src/entity/order.items.entity";
import { DepartmentHead } from "src/entity/department.head.entity";

export interface OrderInterface {
  id: number;
  total_amount: number;
  department_id: number;
  business_id: number;
  created_by: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
  order_items: OrderItems[]
}
export interface OrderRepositoryInterface {
  findAll(): Promise<OrderInterface[]>;
  create(order: OrderInterface): Promise<OrderInterface>;
  update(id: number, order: OrderInterface): Promise<OrderInterface>;
  delete(id: number): Promise<OrderInterface>;
  findById(id: number): Promise<OrderInterface | null>;
  findByDepartmentHead(id: number): Promise<OrderInterface[] | null>;
  findAllBusinessOrder(id: number): Promise<OrderInterface[]>;
}

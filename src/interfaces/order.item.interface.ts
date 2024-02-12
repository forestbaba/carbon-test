import { DepartmentHead } from "src/entity/department.head.entity";
import { Order } from "../entity/order.entity";

export interface OrderItemInterface {
  id: number;
  item_id: number;
  order: Order;
  price: number;
  quantity: number;
  department_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
export interface OrderItemRepositoryInterface {
  findAll(): Promise<OrderItemInterface[]>;
  create(order: OrderItemInterface): Promise<OrderItemInterface>;
  update(id: number, order: OrderItemInterface): Promise<OrderItemInterface>;
  delete(id: number): Promise<OrderItemInterface>;
  findById(id: number): Promise<OrderItemInterface | null>;
}

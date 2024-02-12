import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { OrderItems } from "./order.items.entity";

@Entity('business_orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  total_amount: number;

  @Column()
  created_by: number;

  @OneToMany(() => OrderItems, (oItem) => oItem.order)
  order_items: OrderItems[];

  @Column()
  department_id: number;

  @Column()
  business_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}

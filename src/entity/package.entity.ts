import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";


export enum Status {
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  WAREHOUSE = 'warehouse',
  DELIVERED = 'delivered',
}

@Entity('items')
export class Package {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  status: Status;

  @Column()
  created_by: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

}

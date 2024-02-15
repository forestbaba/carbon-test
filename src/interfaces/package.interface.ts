export enum Status {
  PICKED_UP = 'picked_up',
  IN_TRANSIT = 'in_transit',
  WAREHOUSE = 'warehouse',
  DELIVERED = 'delivered',
}

export interface PackageInterface {
  id: number;
  name: string;
  status: Status;
  created_by: number;
  created_at: Date;
  updated_at: Date;
}
export interface PackageRepositoryInterface {
  findAll(): Promise<PackageInterface[]>;
  create(packge: PackageInterface): Promise<PackageInterface>;
  update(id: number, packge: PackageInterface): Promise<PackageInterface>;
  delete(id: number): Promise<PackageInterface>;
  findById(id: number): Promise<PackageInterface | null>;
}

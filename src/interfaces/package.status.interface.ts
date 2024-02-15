import { Status } from "./packge.interface";

export interface PackageStatusInterface {
  id: number;
  item_id: number;
  status: Status;
  created_at: Date;
  updated_at: Date;
}
export interface PackageStatusRepositoryInterface {
  findAll(): Promise<PackageStatusInterface[]>;
  create(packge: PackageStatusInterface): Promise<PackageStatusInterface>;
  update(id: number, packge: PackageStatusInterface): Promise<PackageStatusInterface>;
  delete(id: number): Promise<PackageStatusInterface>;
  findById(id: number): Promise<PackageStatusInterface | null>;
  findByIdAndStatus(id: number, status: Status): Promise<PackageStatusInterface | null>;
}

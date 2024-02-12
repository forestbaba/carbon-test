export interface BusinessInterface {
  id: number;
  name: string;
  owner_id: number;
  created_by: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

export interface BusinessRepositoryInterface {
  findAll(): Promise<BusinessInterface[]>;
  create(business: BusinessInterface): Promise<BusinessInterface>;
  update(id: number, business: BusinessInterface): Promise<BusinessInterface>;
  delete(id: number): Promise<BusinessInterface>;
  findById(id: number): Promise<BusinessInterface | null>;
}

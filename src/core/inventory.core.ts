import { User } from "../entity/user.entity";
import {
  InventoryInterface,
  InventoryRepositoryInterface,
} from "../interfaces/inventory.interface";

export class InventoryCore {
  constructor(private inventoryRepository: InventoryRepositoryInterface) { }
  async findAll() {
    return await this.inventoryRepository.findAll();
  }
  async create(inv: InventoryInterface) {
    return await this.inventoryRepository.create(inv);
  }
  async update(id: number, inv: InventoryInterface) {
    return await this.inventoryRepository.update(id, inv);
  }
  async delete(id: number) {
    return await this.inventoryRepository.delete(id);
  }
  async findById(id: number) {
    return await this.inventoryRepository.findById(id);
  }
  async findByNameAndBusinessId(name: string, id: User) {
    return await this.inventoryRepository.findByNameAndBusinessId(name, id);
  }

  async findByUserAndDepartment(id: User, departmentId: number) {
    return await this.inventoryRepository.findByUserAndDepartment(id, departmentId);
  }

  async findByDepartment(id: number) {
    return await this.inventoryRepository.findByDepartment(id);
  }
}

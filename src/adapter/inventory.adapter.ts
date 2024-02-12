import { Inventory } from "../entity/inventory.entity";
import { AppDataSource } from "../database/config";
import { User } from "../entity/user.entity";
import { InventoryInterface, InventoryRepositoryInterface } from "../interfaces/inventory.interface";
import { ILike } from "typeorm";

export class InventoryAdapter implements InventoryRepositoryInterface {

  async findByDepartment(department_id: number): Promise<InventoryInterface[] | null> {
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    const inventory = await inventoryRepository.findBy({department_id});
    return inventory;

  }
  findByUser(name: string, id: User): Promise<InventoryInterface | null> {
    throw new Error("Method not implemented.");
  }
  findByUserAndDepartment(user: User, department: number): Promise<InventoryInterface | null> {
    throw new Error("Method not implemented.");
  }

  async findByNameAndBusinessId(name: string, id: User): Promise<InventoryInterface | null> {
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    return await inventoryRepository.findOneBy({
      name: ILike(`%${name}%`),
      created_by: id,
    });
  }
  async findAll() {
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    const inventory = await inventoryRepository.find();

    return inventory;
  }
  async create(inventory: Inventory) {
    const userRepository = AppDataSource.getRepository(User);
    const newInventory = new Inventory();
    newInventory.name = inventory.name;
    newInventory.price = inventory.price;
    newInventory.department_id = inventory.department_id;
    newInventory.quantity = inventory.quantity;
    newInventory.created_by = inventory.created_by;
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    await inventoryRepository.save(newInventory);

    return newInventory;
  }

  async update(id: number, inv: Inventory) {
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    const inventoryToUpdate = await inventoryRepository.findOneBy({ id });
    if (!inventoryToUpdate) {
      throw new Error("Inventory not found");
    }
    inventoryToUpdate.name = inv.name;
    inventoryToUpdate.price = inv.price;
    inventoryToUpdate.quantity = inv.quantity;
    await inventoryRepository.save(inventoryToUpdate);

    return inventoryToUpdate;
  }
  async delete(id: number) {
    const inventory = AppDataSource.getRepository(Inventory);
    const inventoryToDelete = await inventory.findOneBy({ id });
    if (!inventoryToDelete) {
      throw new Error("inventory not found");
    }
    await inventory.delete(inventoryToDelete);

    return inventoryToDelete;
  }
  async findById(id: number) {
    const inventoryRepository = AppDataSource.getRepository(Inventory);
    return await inventoryRepository.findOneBy({ id });
  }
}

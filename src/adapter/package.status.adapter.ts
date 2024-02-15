import { Status } from "../entity/package.entity";
import { AppDataSource } from "../database/config";
import {  PackageStatusInterface, PackageStatusRepositoryInterface } from "../interfaces/package.status.interface";
import { PackageStatus } from "../entity/package.status.entity";

export class PackageStatusAdapter implements PackageStatusRepositoryInterface {
  
  async findByIdAndStatus(id: number, status: Status): Promise<PackageStatusInterface | null> {
    const packageStatusRepository = AppDataSource.getRepository(PackageStatus);
    const packge = await packageStatusRepository.findOneBy({item_id: id, status: status });

    return packge;
  }

  async findAll() {
    const packageRepository = AppDataSource.getRepository(PackageStatus);
    const packge = await packageRepository.find();

    return packge;
  }
  async create(it: PackageStatusInterface) {
    const packge = new PackageStatus();
    packge.item_id = it.item_id;
    packge.status = it.status;   
    const packageRepository = AppDataSource.getRepository(PackageStatus);
    await packageRepository.save(packge);
    return packge;
  }

  async update(id: number, packge: PackageStatusInterface) {
    const packageRepository = AppDataSource.getRepository(PackageStatus);
    const packgeToUpdate = await packageRepository.findOneBy({ id });

    if (!packgeToUpdate) {
      throw new Error("Package status not found");
    }
    packgeToUpdate.item_id = packge.item_id;
    packgeToUpdate.status = packge.status;
    await packageRepository.save(packgeToUpdate);

    return packgeToUpdate;
  }

  async delete(id: number) {
    const packge = AppDataSource.getRepository(PackageStatus);
    const packgeToDelete = await packge.findOneBy({ id });
    if (!packgeToDelete) {
      throw new Error("Package not found");
    }
    await packge.delete(packgeToDelete);

    return packgeToDelete;
  }

  async findById(id: number) {
    const packge = AppDataSource.getRepository(PackageStatus);
    return await packge.findOneBy({ id });
  }
}

import { PackageInterface, PackageRepositoryInterface } from "../interfaces/package.interface";
import { AppDataSource } from "../database/config";
import { Package } from "../entity/package.entity";

export class PackageAdapdter implements PackageRepositoryInterface {
  async findAll() {
    const packageRepository = AppDataSource.getRepository(Package);
    const packageItem = await packageRepository.find();

    return packageItem;
  }
  async create(pack: PackageInterface) {
    const newPackage = new Package();
    newPackage.name = pack.name;
    newPackage.status = pack.status;
    newPackage.created_by = pack.created_by;
    const packageRepository = AppDataSource.getRepository(Package);
    await packageRepository.save(newPackage);

    return newPackage;
  }
  async update(id: number, pack: PackageInterface) {
    const packageRepository = AppDataSource.getRepository(Package);
    const packageToUpdate = await packageRepository.findOneBy({ id });
    if (!packageToUpdate) {
      throw new Error("Package not found");
    }
    packageToUpdate.name = pack.name;
    packageToUpdate.status = pack.status;
    await packageRepository.save(packageToUpdate);

    return packageToUpdate;
  }
  async delete(id: number) {
    const packageRepository = AppDataSource.getRepository(Package);
    const packageToDelete = await packageRepository.findOneBy({ id });
    if (!packageToDelete) {
      throw new Error("Package not found");
    }
    await packageRepository.delete(packageToDelete);

    return packageToDelete;
  }
  async findById(id: number) {
    const packageRespository = AppDataSource.getRepository(Package);
    return await packageRespository.findOneBy({ id });
  }
}

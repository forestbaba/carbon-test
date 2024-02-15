import { PackageInterface, PackageRepositoryInterface } from "src/interfaces/package.interface";

export class PackageCore {
  constructor(private packageRepo: PackageRepositoryInterface) {}
  async findAll() {
    return await this.packageRepo.findAll();
  }
  async create(pack: PackageInterface) {
    return await this.packageRepo.create(pack);
  }
  async update(id: number, pack: PackageInterface) {
    return await this.packageRepo.update(id, pack);
  }
  async delete(id: number) {
    return await this.packageRepo.delete(id);
  }
  async findById(id: number) {
    return await this.packageRepo.findById(id);
  }
}

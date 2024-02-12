import {
  DuploAdminInterface,
  DuploAdminRepositoryInterface
} from "../interfaces/duplo.admin.interface";

export class DuploAdminCore {
  constructor(private duploaAdminRepository: DuploAdminRepositoryInterface) {}
  async findAll() {
    return await this.duploaAdminRepository.findAll();
  }
  async create(adminUser: DuploAdminInterface) {
    return await this.duploaAdminRepository.create(adminUser);
  }
  async update(id: number, adminUser: DuploAdminInterface) {
    return await this.duploaAdminRepository.update(id, adminUser);
  }
  async delete(id: number) {
    return await this.duploaAdminRepository.delete(id);
  }
  async findById(id: number) {
    return await this.duploaAdminRepository.findById(id);
  }
  async findByEmail(email: string) {
    return await this.duploaAdminRepository.findByEmail(email);
  }
}

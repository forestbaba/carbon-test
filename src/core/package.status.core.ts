import { Status } from "../entity/package.entity";
import {  PackageStatusInterface, PackageStatusRepositoryInterface } from "../interfaces/package.status.interface";

export class PackageStatusCore {
  constructor(private packageStatusRepository: PackageStatusRepositoryInterface) {}
  async findAll() {
    return await this.packageStatusRepository.findAll();
  }
  async create(pAge: PackageStatusInterface) {
  const payload = pAge;
  payload.status = pAge.status
    const packgeSta =  await this.packageStatusRepository.create(payload);
    return packgeSta;

  }
  async update(id: number, pAge: PackageStatusInterface) {
    return await this.packageStatusRepository.update(id, pAge);
  }
  async delete(id: number) {
    return await this.packageStatusRepository.delete(id);
  }
  async findById(id: number) {
    return await this.packageStatusRepository.findById(id);
  }
  async findByIdAndStatus(id: number, status: Status) {
    return await this.packageStatusRepository.findByIdAndStatus(id,status);
  }
}

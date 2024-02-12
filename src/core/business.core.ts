import { BusinessInterface, BusinessRepositoryInterface } from "../interfaces/business.interface";

export class BusinessCore {
  constructor(private businessRepository: BusinessRepositoryInterface) {}
  async findAll() {
    return await this.businessRepository.findAll();
  }
  async create(business: BusinessInterface) {
    return await this.businessRepository.create(business);
  }
  async update(id: number, business: BusinessInterface) {
    return await this.businessRepository.update(id, business);
  }
  async delete(id: number) {
    return await this.businessRepository.delete(id);
  }
  async findById(id: number) {
    return await this.businessRepository.findById(id);
  }
}

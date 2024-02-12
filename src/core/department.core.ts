import { DepartmentInterface, DepartmentRepositoryInterface } from "src/interfaces/department.interface";

export class DepartmentCore {
  constructor(private departmentRepository: DepartmentRepositoryInterface) {}
  async findAll() {
    return await this.departmentRepository.findAll();
  }
  async create(business: DepartmentInterface) {
    return await this.departmentRepository.create(business);
  }
  async update(id: number, business: DepartmentInterface) {
    return await this.departmentRepository.update(id, business);
  }
  async delete(id: number) {
    return await this.departmentRepository.delete(id);
  }
  async findById(id: number) {
    return await this.departmentRepository.findById(id);
  }
}

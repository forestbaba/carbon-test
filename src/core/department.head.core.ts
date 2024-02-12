import { DepartmentHeadInterface, DepartmentHeadRepositoryInterface } from "src/interfaces/department.head.interface";

export class DepartmentHeadCore {
  constructor(private departmentHeadRepository: DepartmentHeadRepositoryInterface) {}
  async findAll() {
    return await this.departmentHeadRepository.findAll();
  }
  async create(departmentHead: DepartmentHeadInterface) {
    return await this.departmentHeadRepository.create(departmentHead);
  }
  async update(id: number, departmentHead: DepartmentHeadInterface) {
    return await this.departmentHeadRepository.update(id, departmentHead);
  }
  async delete(id: number) {
    return await this.departmentHeadRepository.delete(id);
  }
  async findById(id: number) {
    return await this.departmentHeadRepository.findById(id);
  }
  async findByEmail(email: string) {
    return await this.departmentHeadRepository.findByEmail(email);
  }
  async findByDepartment(id: number) {
    return await this.departmentHeadRepository.findByDepartment(id);
  }
}

import { AppDataSource } from "../database/config";
import { DepartmentInterface } from "../interfaces/department.interface";
import { DepartmentRepositoryInterface } from "../interfaces/department.interface";
import { Department } from "../entity/department.entity";


export class DepartmentAdapdter implements DepartmentRepositoryInterface {
  async findAll() {
    const businessDepartmentRepository = AppDataSource.getRepository(Department);
    const department = await businessDepartmentRepository.find();
    return department;
  }
  async create(buss: DepartmentInterface) {
    const newBusiess = new Department();
    newBusiess.name = buss.name;
    newBusiess.created_by = buss.created_by;
    const businessDepartmentRepository = AppDataSource.getRepository(Department);
    await businessDepartmentRepository.save(newBusiess);
    return newBusiess;
  }
  async update(id: number, department: DepartmentInterface) {
    const businessDepartmentRepository = AppDataSource.getRepository(Department);
    const departmentToUpdate = await businessDepartmentRepository.findOneBy({ id });
    if (!departmentToUpdate) {
      throw new Error("Department not found");
    }
    departmentToUpdate.name = department.name;
    await businessDepartmentRepository.save(departmentToUpdate);

    return departmentToUpdate;
  }
  async delete(id: number) {
    const businessDepartmentRepository = AppDataSource.getRepository(Department);
    const departmentToDelete = await businessDepartmentRepository.findOneBy({ id });
    if (!departmentToDelete) {
      throw new Error("Department not found");
    }
    await businessDepartmentRepository.delete(departmentToDelete);

    return departmentToDelete;
  }
  async findById(id: number) {
    const businessDepartmentRepository = AppDataSource.getRepository(Department);
    return await businessDepartmentRepository.findOneBy({ id });
  }

}

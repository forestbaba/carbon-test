import { AppDataSource } from "../database/config";
import { DepartmentInterface } from "../interfaces/department.interface";
import { DepartmentHeadInterface, DepartmentHeadRepositoryInterface } from "../interfaces/department.head.interface";
import { DepartmentHead } from "../entity/department.head.entity";
import { encrypt } from "../helpers/encrypt";


export class DepartmentHeadsAdapdter implements DepartmentHeadRepositoryInterface {

  async findByDepartment(id: number): Promise<DepartmentHeadInterface[] | null> {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    return await departmentHeadRepository.findBy({ department_id: id });
  }
  async findByEmail(email: string): Promise<DepartmentHeadInterface | null> {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    return await departmentHeadRepository.findOneBy({ email });
  }

  async findAll() {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    const department = await departmentHeadRepository.find();
    return department;
  }

  async create(dept: DepartmentHeadInterface) {
    const newBusiess = new DepartmentHead();
    const hashpass = await encrypt.encryptpass(dept.password);

    newBusiess.name = dept.name;
    newBusiess.email = dept.email;
    newBusiess.password = hashpass;
    newBusiess.created_by = dept.created_by;
    newBusiess.department_id = dept.department_id;
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    await departmentHeadRepository.save(newBusiess);
    return newBusiess;
  }

  async update(id: number, department: DepartmentInterface) {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    const departmentHeadToUpdate = await departmentHeadRepository.findOneBy({ id });
    if (!departmentHeadToUpdate) {
      throw new Error("Department Head not found");
    }
    departmentHeadToUpdate.name = department.name;
    await departmentHeadRepository.save(departmentHeadToUpdate);

    return departmentHeadToUpdate;
  }

  async delete(id: number) {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    const departmentheadToDelete = await departmentHeadRepository.findOneBy({ id });
    if (!departmentheadToDelete) {
      throw new Error("Department head not found");
    }
    await departmentHeadRepository.delete(departmentheadToDelete);

    return departmentheadToDelete;
  }

  async findById(id: number) {
    const departmentHeadRepository = AppDataSource.getRepository(DepartmentHead);
    return await departmentHeadRepository.findOneBy({ id });
  }

}

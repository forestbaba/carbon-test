import { DuploAdminInterface, DuploAdminRepositoryInterface } from "src/interfaces/duplo.admin.interface";
import { AppDataSource } from "../database/config";
import { DuploAdmin } from "../entity/duplo.admin.entity";
import { encrypt } from "../helpers/encrypt";


export class DuploAdminAdapdter implements DuploAdminRepositoryInterface {
  async findAll() {
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    const users = await adminRepository.find();
    return users;
  }
  async create(user: DuploAdminInterface) {
    const hashpass = await encrypt.encryptpass(user.password);
    const newUser = new DuploAdmin();
    newUser.name = user.name;
    newUser.email = user.email;
    newUser.active = true;
    newUser.password = hashpass;
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    await adminRepository.save(newUser);

    return newUser;
  }
  async update(id: number, user: DuploAdminInterface) {
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    const userToUpdate = await adminRepository.findOneBy({ id });
    if (!userToUpdate) {
      throw new Error("User not found");
    }
    userToUpdate.name = user.name;
    userToUpdate.email = user.email;
    userToUpdate.password = user.password;
    await adminRepository.save(userToUpdate);

    return userToUpdate;
  }
  async delete(id: number) {
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    const userToDelete = await adminRepository.findOneBy({ id });
    if (!userToDelete) {
      throw new Error("User not found");
    }
    await adminRepository.delete(userToDelete);

    return userToDelete;
  }
  async findById(id: number) {
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    return await adminRepository.findOneBy({ id });
  }
  async findByEmail(email: string) {
    const adminRepository = AppDataSource.getRepository(DuploAdmin);
    return await adminRepository.findOneBy({ email });
  }
}

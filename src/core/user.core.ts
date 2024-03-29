import {
  UserInterface,
  UserRepositoryInterface,
} from "../interfaces/user.interface";

export class UserCore {
  constructor(private userRepository: UserRepositoryInterface) {}
  async findAll() {
    return await this.userRepository.findAll();
  }
  async create(user: UserInterface) {
    return await this.userRepository.create(user);
  }
  async update(id: number, user: UserInterface) {
    return await this.userRepository.update(id, user);
  }
  async delete(id: number) {
    return await this.userRepository.delete(id);
  }
  async findById(id: number) {
    return await this.userRepository.findById(id);
  }
  async findByEmail(email: string) {
    return await this.userRepository.findByEmail(email);
  }
}

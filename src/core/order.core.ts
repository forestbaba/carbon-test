import { OrderInterface, OrderRepositoryInterface } from "src/interfaces/order.interface";

export class OrderCore {
  constructor(private orderRepository: OrderRepositoryInterface) {}
  async findAll() {
    return await this.orderRepository.findAll();
  }
  async create(order: OrderInterface) {
    return await this.orderRepository.create(order);
  }
  async update(id: number, order: OrderInterface) {
    return await this.orderRepository.update(id, order);
  }
  async delete(id: number) {
    return await this.orderRepository.delete(id);
  }
  async findById(id: number) {
    return await this.orderRepository.findById(id);
  }
  async findByDepartmentHeads(id: number) {
    return await this.orderRepository.findByDepartmentHead(id);
  }

  async findAllBusinessOrder(id: number) {
    return await this.orderRepository.findAllBusinessOrder(id);
  }
}

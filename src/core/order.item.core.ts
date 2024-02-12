import { OrderItemInterface, OrderItemRepositoryInterface } from "../interfaces/order.item.interface";

export class OrderItemCore {
  constructor(private orderItemRepository: OrderItemRepositoryInterface) {}
  async findAll() {
    return await this.orderItemRepository.findAll();
  }
  async create(orderItem: OrderItemInterface) {
    return await this.orderItemRepository.create(orderItem);
  }
  async update(id: number, orderItem: OrderItemInterface) {
    return await this.orderItemRepository.update(id, orderItem);
  }
  async delete(id: number) {
    return await this.orderItemRepository.delete(id);
  }
  async findById(id: number) {
    return await this.orderItemRepository.findById(id);
  }
}

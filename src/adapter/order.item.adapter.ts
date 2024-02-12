import { AppDataSource } from "../database/config";
import { Order } from "../entity/order.entity";
import { OrderItems } from "../entity/order.items.entity";
import { OrderItemRepositoryInterface } from "../interfaces/order.item.interface";

export class OrderItemAdapter implements OrderItemRepositoryInterface {

  async findAll() {
    const orderItemRepository = AppDataSource.getRepository(OrderItems);
    const order = await orderItemRepository.find();

    return order;
  }
  async create(ord: OrderItems) {
    const order = new OrderItems();
    order.price = ord.price;
    order.item_id = ord.item_id;
    order.department_id = ord.department_id;
    order.quantity = ord.quantity;
    order.order = ord.order;
    order.order = ord.order;
    const orderItemRepository = AppDataSource.getRepository(OrderItems);
    await orderItemRepository.save(order);

    return order;
  }

  async update(id: number, order: OrderItems) {
    const orderRepository = AppDataSource.getRepository(OrderItems);
    const orderToUpdate = await orderRepository.findOneBy({ id });
    if (!orderToUpdate) {
      throw new Error("Order item not found");
    }
    orderToUpdate.price = order.price;
    orderToUpdate.quantity = order.quantity;
    orderToUpdate.department_id = order.department_id;
    await orderRepository.save(orderToUpdate);

    return orderToUpdate;
  }
  async delete(id: number) {
    const order = AppDataSource.getRepository(OrderItems);
    const orderItemToDelete = await order.findOneBy({ id });
    if (!orderItemToDelete) {
      throw new Error("order item not found");
    }
    await order.delete(orderItemToDelete);

    return orderItemToDelete;
  }
  async findById(id: number) {
    const orderItem = AppDataSource.getRepository(OrderItems);
    return await orderItem.findOneBy({ id });
  }
}

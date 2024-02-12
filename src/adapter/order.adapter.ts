import { AppDataSource } from "../database/config";
import { OrderInterface, OrderRepositoryInterface } from "../interfaces/order.interface";
import { Order } from "../entity/order.entity";

export class OrderAdapter implements OrderRepositoryInterface {
  async findAllBusinessOrder(id: number): Promise<OrderInterface[]> {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      where:{business_id: id},  
    });
    return orders
  }

 async findByDepartmentHead(id: number): Promise<OrderInterface[] | null> {
    const orderRepository = AppDataSource.getRepository(Order);
    const orders = await orderRepository.find({
      where:{created_by: id},  
      relations: ["order_items"]
    });
    return orders;
  }

  async findAll() {
    const orderRepository = AppDataSource.getRepository(Order);
    const order = await orderRepository.find();

    return order;
  }
  async create(ord: Order) {
    const order = new Order();
    order.total_amount = ord.total_amount;
    order.order_items = ord.order_items;
    order.department_id = ord.department_id;
    order.created_by = ord.created_by;
    order.business_id = ord.business_id;
    const orderRepository = AppDataSource.getRepository(Order);
    await orderRepository.save(order);

    return order;
  }

  async update(id: number, order: Order) {
    const orderRepository = AppDataSource.getRepository(Order);
    const orderToUpdate = await orderRepository.findOneBy({ id });
    if (!orderToUpdate) {
      throw new Error("Order not found");
    }
    orderToUpdate.total_amount = order.total_amount;
    orderToUpdate.order_items = order.order_items;
    orderToUpdate.department_id = order.department_id;
    await orderRepository.save(orderToUpdate);

    return orderToUpdate;
  }
  async delete(id: number) {
    const order = AppDataSource.getRepository(Order);
    const orderToDelete = await order.findOneBy({ id });
    if (!orderToDelete) {
      throw new Error("order not found");
    }
    await order.delete(orderToDelete);

    return orderToDelete;
  }
  async findById(id: number) {
    const order = AppDataSource.getRepository(Order);
    return await order.findOneBy({ id });
  }
}

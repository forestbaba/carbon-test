import { Request, Response } from "express";
import { InventoryCore } from "../core/inventory.core";
import { customRequest } from "../interfaces/request.interface";
import { InventoryAdapter } from "../adapter/inventory.adapter";
import { OrderCore } from "../core/order.core";
import { OrderAdapter } from "../adapter/order.adapter";
import { OrderItemCore } from "../core/order.item.core";
import { OrderItemAdapter } from "../adapter/order.item.adapter";
import OrderTransaction from "../model/OrdersTransactionModel";

export class orderController {
  static async findAll(req: Request, res: Response) {
    try {
      const orderService = new OrderCore(new OrderAdapter());
      const order = await orderService.findAll();
      res.status(200).json(order);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }


  static async create(payload) {
    try {
      const orderRepository = new OrderCore(new OrderAdapter());

      const order = await orderRepository.create(payload);

      return order;
    } catch (error) {
      console.log(error)
    }
  }

  static async createOrder(req: customRequest, res: Response) {
    try {
      let payload = req.body;
      payload.created_by = req.user.id
      payload.business_id = req.body.business_id

      const inventoryService = new InventoryCore(new InventoryAdapter());
      const orderRepository = new OrderCore(new OrderAdapter());
      const orderItemRepository = new OrderItemCore(new OrderItemAdapter());

      payload.total_amount = 0;

      const order = await orderRepository.create(payload);

      let totalAmount = 0;

      for (let item of req.body.order_items) {
        const check = await inventoryService.findById(item.item_id)
        if (!check) {
          return res.status(404).json({ error: true, message: 'order item not found' })
        }
        if(check.quantity < item.quantity){
          return res.status(404).json({ error: true, message: `quantity required for ${check.name} is more than quantity available ` })
        }
      }

      for (let item of req.body.order_items) {
        const orderItem = await inventoryService.findById(item.item_id)
        if (orderItem) {
          totalAmount += (orderItem.price * item.quantity);

          item.order = order.id
          item.department_id = req.body.department_id
          item.price = orderItem.price

          await orderItemRepository.create(item)

          orderItem.quantity = orderItem.quantity - item.quantity;

          inventoryService.update(item.item_id, orderItem)
        }
      }

      order.total_amount = totalAmount

      await orderRepository.update(order.id, order);

      await orderController.createdOrderTransaction(req.body.business_id, totalAmount)

      res.status(201).json({
        error: false,
        message: "order created",
        order,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error });
    }
  }

  static async validateInventory(req: customRequest, res: Response){
    const inventoryService = new InventoryCore(new InventoryAdapter());

    for (let item of req.body.order_items) {
      const check = await inventoryService.findById(item.item_id)
      if (!check) {
        return res.status(404).json({ error: true, message: 'order item not found' })
      }
      if(check.quantity < item.quantity){
        return res.status(404).json({ error: true, message: `inventory with name ${check.name} is out of stock ` })
      }
    }

  }

  static async  createdOrderTransaction(business_id, totalAmount){
    const orderTransactions = new OrderTransaction({
      businessID: business_id,
      amount: totalAmount,
      status: "success"
    }).save()
  }

  static async update(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const inventory = await inventoryService.update(Number(req.params.id), req.body);
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());

      const inventory = await inventoryService.delete(Number(req.params.id));
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async findById(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const inventory = await inventoryService.findById(Number(req.params.id));
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findByNameAndId(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const inventory = await inventoryService.findById(Number(req.params.id));
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findByUserId(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const inventory = await inventoryService.findById(Number(req.params.id));
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async findByDepartment(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const department = await inventoryService.findByDepartment(Number(req.params.id));
      res.status(200).json({ error: false, message: "inventory fetch successful", inventory: department });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findByDepartmentHead(req: customRequest, res: Response) {
    try {
      const orderService = new OrderCore(new OrderAdapter());
      const orders = await orderService.findByDepartmentHeads(Number(req.user.id));
      res.status(200).json({ error: false, message: "Orders fetch successful", orders });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findByDepartmentHeadByBusiness(req: Request, res: Response) {
    try {
      const orderService = new OrderCore(new OrderAdapter());
      const orders = await orderService.findByDepartmentHeads(Number(req.params.id));
      res.status(200).json({ error: false, message: "Orders fetch successful", orders });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }


  static async processOrders(req: Request, res: Response) {
    try {
      
    const orderService = new OrderCore(new OrderAdapter());

    const orders = await orderService.findAllBusinessOrder(Number(req.params.id));

    const currentDate = new Date();
    const todayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayStart.getDate() + 1);

    const totalNumberOfOrders = orders.length;
    const totalAmountOfOrders = orders.reduce((acc, order) => acc + order.total_amount, 0);

    const ordersToday = orders.filter(order => {
      const orderDate = new Date(order.created_at);
      return orderDate >= todayStart && orderDate < todayEnd;
    });

    const totalNumberOfOrdersToday = ordersToday.length;
    const totalAmountOfOrdersToday = ordersToday.reduce((acc, order) => acc + order.total_amount, 0);

    let order_details = {
      total_number_of_orders:totalNumberOfOrders,
      total_amount_of_orders:totalAmountOfOrders,
      total_number_of_orders_today:totalNumberOfOrdersToday,
      total_amount_of_orders_today: totalAmountOfOrdersToday
    }

    return res.status(200).json({error: false, message:"order details fetched", order_details})
  } catch (error) {
    return res.status(500).json({error: false, message:"Error fetching order details"})

  }
  }
}

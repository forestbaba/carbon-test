import { Request, Response } from "express";
import { InventoryCore } from "../core/inventory.core";
import { customRequest } from "../interfaces/request.interface";
import { InventoryAdapter } from "../adapter/inventory.adapter";

export class inventoryController {
  static async findAll(req: Request, res: Response) {
    try {
      const inventoryService = new InventoryCore(new InventoryAdapter());
      const inventory = await inventoryService.findAll();
      res.status(200).json(inventory);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: customRequest, res: Response) {
    try {
      let payload = req.body;
      payload.created_by = req.user.id
      const inventoryService = new InventoryCore(new InventoryAdapter());
      
      const itemExist = await inventoryService.findByNameAndBusinessId(payload.name, payload.created_by)
      if(itemExist){
        return res.status(400).json({error: true, message:"item name already exist for this business"})
      }

      const inventory = await inventoryService.create(payload);

      res.status(201).json({
        inventory,
      });
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error });
    }
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
      res.status(200).json({error: false,message:"inventory fetch successful", inventory:department});
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

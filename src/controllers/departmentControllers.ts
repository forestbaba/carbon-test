import { Request, Response } from "express";
import { UserCore } from "../core/user.core";
import { UserAdapdter } from "../adapter/user.adapter";
import { DepartmentCore } from "../core/department.core";
import { DepartmentAdapdter } from "../adapter/department.adapter";

export class departmentControllers {
  static async findAll(req: Request, res: Response) {
    try {
      const departmentService = new DepartmentCore(new DepartmentAdapdter());
      const department = await departmentService.findAll();
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: any, res: Response) {
    try {

      let payload = req.body;
      payload.created_by = req.user.id
      const departmentService = new DepartmentCore(new DepartmentAdapdter());
      const userService = new UserCore(new UserAdapdter());
      const ownerExist = await userService.findById(req.body.owner_id)

      if (!ownerExist) {
        return res.status(400).json({ error: true, message: 'Owner does not exist' })
      }

      const department = await departmentService.create(req.body);

      res.status(201).json({
        department,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const departmentService = new DepartmentCore(new DepartmentAdapdter());
      const department = await departmentService.update(Number(req.params.id), req.body);
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const departmentService = new DepartmentCore(new DepartmentAdapdter());

      const department = await departmentService.delete(Number(req.params.id));
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findById(req: Request, res: Response) {
    try {
      const departmentService = new DepartmentCore(new DepartmentAdapdter());
      const department = await departmentService.findById(Number(req.params.id));
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

}

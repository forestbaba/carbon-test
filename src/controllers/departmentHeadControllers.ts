import { Request, Response } from "express";
import { DepartmentHeadsAdapdter } from "../adapter/department.head.adapter";
import { DepartmentHeadCore } from "../core/department.head.core";
import { DepartmentCore } from "../core/department.core";
import { DepartmentAdapdter } from "../adapter/department.adapter";
import bcrypt from "bcrypt";
import { encrypt } from "../helpers/encrypt";

export class departmentHeadControllers {
  static async findAll(req: Request, res: Response) {
    try {
      const departmentHeadService = new DepartmentHeadCore(new DepartmentHeadsAdapdter());
      const dhead = await departmentHeadService.findAll();
      res.status(200).json(dhead);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: any, res: Response) {
    try {

      let payload = req.body;
      payload.created_by = req.user.id
      const departmentHeadService = new DepartmentHeadCore(new DepartmentHeadsAdapdter());
      const department = new DepartmentCore(new DepartmentAdapdter());

      const departmentExist = await department.findById(req.body.department_id)

      if(!departmentExist){
        return res.status(400).json({error: true, message:"department does not exist"})
      }
      
      const departmentHead = await departmentHeadService.create(req.body);

      res.status(201).json({
        departmentHead,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const departmentHeadService = new DepartmentHeadCore(new DepartmentHeadsAdapdter());
      const department = await departmentHeadService.update(Number(req.params.id), req.body);
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const departmentHeadService = new DepartmentHeadCore(new DepartmentHeadsAdapdter());

      const department = await departmentHeadService.delete(Number(req.params.id));
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findById(req: Request, res: Response) {
    try {
      const departmentHeadService = new DepartmentHeadCore(new DepartmentHeadsAdapdter());
      const department = await departmentHeadService.findById(Number(req.params.id));
      res.status(200).json(department);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const deptUser = new DepartmentHeadCore(new DepartmentHeadsAdapdter());
    const user = await deptUser.findByEmail(email);

    if (!user) {
      return res.status(404).json({ error: "Department user not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const token = encrypt.generateToken({ id: user.id });
    res.status(200).json({ message: "Login successful", token , user});
  }

}

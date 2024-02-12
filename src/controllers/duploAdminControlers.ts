import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { encrypt } from "../helpers/encrypt";
import { DuploAdminCore } from "../core/duplo.admin.core";
import { DuploAdminAdapdter } from "../adapter/duplo.admin.adapter";

export class duploAdminControllers {
  static async findAll(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());
      const admins = await adminService.findAll();
      res.status(200).json(admins);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());
      const admin = await adminService.create(req.body);

      res.status(201).json({
        admin,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());
      const admin = await adminService.update(Number(req.params.id), req.body);
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());

      const admin = await adminService.delete(Number(req.params.id));
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findById(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());
      const admin = await adminService.findById(Number(req.params.id));
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findByEmail(req: Request, res: Response) {
    try {
      const adminService = new DuploAdminCore(new DuploAdminAdapdter());
      const admin = await adminService.findByEmail(req.params.email);
      res.status(200).json(admin);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const adminService = new DuploAdminCore(new DuploAdminAdapdter());
    const admin = await adminService.findByEmail(email);

    if (!admin) {
      return res.status(404).json({ error: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // generate token
    const token = encrypt.generateToken({ id: admin.id });
    res.status(200).json({ message: "Login successful", token });
  }
}

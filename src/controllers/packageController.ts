import { customRequest } from "../interfaces/request.interface";
import { PackageAdapdter } from "../adapter/package.adapter";
import { PackageCore } from "../core/package.core";
import { Request, Response } from "express";
import { Status } from "../entity/package.entity";
import { PackageStatusCore } from "../core/package.status.core";
import { PackageStatusAdapter } from "../adapter/package.status.adapter";

export class packageControllers {
  static async findAll(req: Request, res: Response) {
    try {
      const packageService = new PackageCore(new PackageAdapdter());
      const users = await packageService.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: customRequest, res: Response) {
    try {
      const packageService = new PackageCore(new PackageAdapdter());
      const payload = req.body;
      payload.created_by = req.user.id
      payload.status = Status.WAREHOUSE

      const pack = await packageService.create(payload);

      return res.status(201).json({
        pack,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }

  static async checkStatus(req: Request, res: Response) {
    const packgeStatusService = new PackageStatusCore(new PackageStatusAdapter());

    const status = req.body.status.toLowerCase();
    let itemToCheck

    let packageStatus = req.body
    packageStatus.item_id = Number(req.params.id)

    if (status === Status.PICKED_UP) {
      itemToCheck = await packgeStatusService.findByIdAndStatus(Number(req.params.id), status)
      packageStatus.status = Status.PICKED_UP

      if (itemToCheck) {
        return res.status(400).json({ error: true, message: "Package can only be picked up once" })
      }
      await packgeStatusService.create(packageStatus)
    }

    if (status === Status.DELIVERED) {
      packageStatus.status = Status.DELIVERED

      itemToCheck = await packgeStatusService.findByIdAndStatus(Number(req.params.id), status)
      if (itemToCheck) {
        return res.status(400).json({ error: true, message: "Package can only be delivered once" })
      }
      await packgeStatusService.create(packageStatus)

    }

  }

  static async update(req: Request, res: Response) {
    try {
      const packageService = new PackageCore(new PackageAdapdter());
      await packageControllers.checkStatus(req, res)
      const user = await packageService.update(Number(req.params.id), req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  // static async delete(req: Request, res: Response) {
  //   try {
  //     const userService = new UserCore(new UserAdapdter());

  //     const user = await userService.delete(Number(req.params.id));
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error });
  //   }
  // }
  // static async findById(req: Request, res: Response) {
  //   try {
  //     const userService = new UserCore(new UserAdapdter());
  //     const user = await userService.findById(Number(req.params.id));
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error });
  //   }
  // }
  // static async findByEmail(req: Request, res: Response) {
  //   try {
  //     const userService = new UserCore(new UserAdapdter());
  //     const user = await userService.findByEmail(req.params.email);
  //     res.status(200).json(user);
  //   } catch (error) {
  //     res.status(500).json({ error: error });
  //   }
  // }
  // static async login(req: Request, res: Response) {
  //   const { email, password } = req.body;

  //   const userService = new UserCore(new UserAdapdter());
  //   const user = await userService.findByEmail(email);

  //   if (!user) {
  //     return res.status(404).json({ error: "User not found" });
  //   }

  //   const isMatch = await bcrypt.compare(password, user.password);

  //   if (!isMatch) {
  //     return res.status(401).json({ error: "Invalid credentials" });
  //   }
  //   // generate token
  //   const token = encrypt.generateToken({ id: user.id });
  //   res.status(200).json({ message: "Login successful", token });
  // }
}

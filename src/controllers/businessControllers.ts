import { Request, Response } from "express";
import { BusinessCore } from "../core/business.core";
import { BusinessAdapdter } from "../adapter/business.adapter";
import { UserCore } from "../core/user.core";
import { UserAdapdter } from "../adapter/user.adapter";
import OrderTransaction from "../model/OrdersTransactionModel";

export class businessControllers {
  static async findAll(req: Request, res: Response) {
    try {
      const businessService = new BusinessCore(new BusinessAdapdter());
      const business = await businessService.findAll();
      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async create(req: any, res: Response) {
    try {

      let payload = req.body;
      payload.created_by = req.user.id
      const businessService = new BusinessCore(new BusinessAdapdter());
      const userService = new UserCore(new UserAdapdter());
      const ownerExist = await userService.findById(req.body.owner_id)

      if (!ownerExist) {
        return res.status(400).json({ error: true, message: 'Business owner does not exist' })
      }

      const business = await businessService.create(req.body);

      res.status(201).json({
        business,
      });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const businessService = new BusinessCore(new BusinessAdapdter());
      const business = await businessService.update(Number(req.params.id), req.body);
      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async delete(req: Request, res: Response) {
    try {
      const businessService = new BusinessCore(new BusinessAdapdter());

      const business = await businessService.delete(Number(req.params.id));
      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async findById(req: Request, res: Response) {
    try {
      const businessService = new BusinessCore(new BusinessAdapdter());
      const business = await businessService.findById(Number(req.params.id));
      res.status(200).json(business);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
  static async calculateCreditScore(req: Request, res: Response) {

    try {
      const businessID = req.params.id
      const pipeline = [
        { $match: { businessID: businessID } },
        { $group: { _id: null, totalAmount: { $sum: '$amount' }, totalCount: { $sum: 1 }, } }
      ];

      const result = await OrderTransaction.aggregate(pipeline);

      if (result.length > 0) {
        const creditScore = result[0].totalAmount / (result[0].totalCount * 100)
        return res.status(200).json({
          error: false,
          message: "Credit score calculated",
          credit_score: creditScore
        })
      }
    } catch (error) {
      res.status(500).json({ error: error });
    }
  }
}

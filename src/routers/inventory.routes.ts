import express from "express";
const Router = express.Router();

import { inventoryController } from "../controllers/inventoryController";
import { AuthMiddleware } from "../middlewares/authmid";

Router.get("/inventory", AuthMiddleware.isAuthenticated, inventoryController.findAll);
Router.post("/inventory", AuthMiddleware.isAuthenticated, inventoryController.create);
Router.put("/inventory/:id", AuthMiddleware.isAuthenticated, inventoryController.update);
Router.delete("/inventory/:id", AuthMiddleware.isAuthenticated, inventoryController.delete);
Router.get("/inventory/:id", AuthMiddleware.isAuthenticated, inventoryController.findById);

export { Router };

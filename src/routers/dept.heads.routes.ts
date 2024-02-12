import express from "express";
export const Router = express.Router();
import { userControllers } from "../controllers/userControlers";
import { validateCreateDepartmentHead, validateCreateInventory, validateCreateOrder, validateLogin } from "../middlewares/validation";
import { validateRequest } from "../middlewares";
import { encrypt } from "../helpers/encrypt";
import { departmentHeadControllers } from "../controllers/departmentHeadControllers";
import { inventoryController } from "../controllers/inventoryController";
import { orderController } from "../controllers/orderController";



Router.post("/login",validateRequest(validateLogin), departmentHeadControllers.login);
Router.get("/fetch-inventory/:id",[encrypt.verifyToken], inventoryController.findByDepartment);
Router.post("/create-inventory",[encrypt.verifyToken, validateRequest(validateCreateInventory)], inventoryController.create);
Router.post("/create-order",[encrypt.verifyToken, validateRequest(validateCreateOrder)], orderController.createOrder);
Router.get("/fetch-orders",[encrypt.verifyToken], orderController.findByDepartmentHead);

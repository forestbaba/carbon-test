import express from "express";
export const Router = express.Router();
import { userControllers } from "../controllers/userControlers";
import { validateCreateDepartmentHead, validateCreateInventory, validateLogin, validateSignup } from "../middlewares/validation";
import { validateRequest } from "../middlewares";
import { encrypt } from "../helpers/encrypt";
import { departmentHeadControllers } from "../controllers/departmentHeadControllers";
import { inventoryController } from "../controllers/inventoryController";
import { orderController } from "../controllers/orderController";


Router.get("/users", userControllers.findAll);
Router.post("/register",validateRequest(validateSignup), userControllers.create);
Router.post("/login",validateRequest(validateLogin), userControllers.login);
Router.post("/create-department-head",[encrypt.verifyToken, validateRequest(validateCreateDepartmentHead)], departmentHeadControllers.create);
Router.post("/create-inventory",[encrypt.verifyToken, validateRequest(validateCreateInventory)], inventoryController.create);
Router.get("/fetch-order-details/:id",encrypt.verifyToken, orderController.processOrders);


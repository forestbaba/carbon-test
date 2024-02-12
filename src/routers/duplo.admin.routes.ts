import express from "express";
export const Router = express.Router();
import { duploAdminControllers } from "../controllers/duploAdminControlers";
import { businessControllers } from "../controllers/businessControllers";
import { validateLogin, validateRegisterBusiness, validateSignup } from "../middlewares/validation";
import { validateRequest } from "../middlewares";
import { encrypt } from "../helpers/encrypt";
import { orderController } from "../controllers/orderController";
import { userControllers } from "../controllers/userControlers";


Router.post("/register", validateRequest(validateSignup), duploAdminControllers.create);
Router.post("/login", validateRequest(validateLogin), duploAdminControllers.login);
Router.post("/create-business-account", [encrypt.verifyToken, validateRequest(validateSignup)], userControllers.create);
Router.post("/register-business", [encrypt.verifyToken, validateRequest(validateRegisterBusiness)], businessControllers.create);
Router.post("/create-business", [encrypt.verifyToken, validateRequest(validateRegisterBusiness)], businessControllers.create);
Router.get("/fetch-orders", orderController.findByDepartmentHead);

Router.get("/get-business-credit-score/:id", [encrypt.verifyToken], businessControllers.calculateCreditScore);


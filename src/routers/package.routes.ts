import express from "express";
export const Router = express.Router();
import { validateChangeStatus, validateCreateInventory } from "../middlewares/validation";
import validateRequest  from "../middlewares/validateRequest";
import { encrypt } from "../helpers/encrypt";
import { packageControllers } from "../controllers/packageController";

Router.post("/create-package",[encrypt.verifyToken, validateRequest(validateCreateInventory)], packageControllers.create);
Router.put("/update-status/:id",[encrypt.verifyToken, validateRequest(validateChangeStatus)], packageControllers.update);
Router.get("/fetch-packages",[encrypt.verifyToken], packageControllers.findAll);

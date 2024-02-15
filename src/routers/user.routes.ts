import express from "express";
export const Router = express.Router();
import { userControllers } from "../controllers/userControlers";
import {  validateLogin, validateSignup } from "../middlewares/validation";
import validateRequest  from "../middlewares/validateRequest";


Router.post("/register",validateRequest(validateSignup), userControllers.create);
Router.post("/login",validateRequest(validateLogin), userControllers.login);


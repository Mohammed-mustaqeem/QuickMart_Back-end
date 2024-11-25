import express from "express";
import { resetPassoword, forgotPassword, loginControler, userRegister } from "../controllers/userController.js";
import  {loginValidation, signupValidation}  from "../middleware/userValidation.js";

const userRoute = express.Router();

userRoute.post("/signup",signupValidation, userRegister);
userRoute.post("/login", loginValidation, loginControler)
userRoute.post("/forgot-password",forgotPassword)
userRoute.post('/reset-password/:id/:token',resetPassoword)

export default userRoute;

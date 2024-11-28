import UserModel from "../model/userModel.js";
import {
  changePassowordService,
  forgotPassServic,
  loginServic,
  userRegisterService,
} from "../services/userServices.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { transport } from "../Utils/sendEmail.js";
import verifyToken_Middleware from "../middleware/Auth.js";
import dotenv from 'dotenv';
dotenv.config();


export const userRegister = async (req, res) => {
  try {
    const { name, email, mobileNumber, password, confirmPassword } = req.body;
    // find user from database
    const findUser = await userRegisterService(email);
    if (findUser) {
      return res.status(400).send({ message: "User already exist" });
    }
    // password hash using bcypt
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new UserModel({
      name,
      email,
      mobileNumber,
      password: hashpassword,
      confirmPassword,
    });

    // save user
    const saveUser = await user.save();
    return res
      .status(201)
      .send({ message: `user created successfully ${saveUser}` });
  } catch (error) {
    console.log(error.message);
  }
};

export const loginControler = async (req, res) => {
  try {
    const { email, password } = req.body;
    const dbUser = await loginServic(email);
    // check if user exist in database
    if (!dbUser) {
      return res
        .status(404)
        .send({ message: "you are not register please signUp" });
    }
    // compare password
    const comparePassword = await bcrypt.compare(password, dbUser.password);

    if (!comparePassword) {
      return res
        .status(404)
        .send({ message: "Auth faild email and password is worng" });
    }
    const jwtToken = jwt.sign(
      { email: dbUser.email },
      process.env.SECRATE_KEY,
      { expiresIn: "24hr" }
    );

    // console.log(jwtToken)
    return res.status(201).json({ message: "login successfully", jwtToken, email, name: dbUser.name  });
  } catch (error) {
    console.log(error.message);
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findUser = await forgotPassServic(email);
    if (!findUser) {
      res.status(404).send({ message: "Can’t find the email? " });
    }
    const secrate = findUser.id + process.env.SECRATE_KEY
    const token = jwt.sign(
      { email: findUser.email },
      secrate,
      { expiresIn: "15m" }
    );
     const link = `http://127.0.0.1:3000/user/reset-password/${findUser.id}/${token}`
    const Email = await transport.sendMail({
      from:process.env.EMAIL_FORM,
      to:findUser.email,
      subject:"QUick Mart - Reset your password",
      html:`<h2>Password Reset Request</h2>
      <p>Dear user,</p>
      <p>You recently requested to reset your password for your account at QuickMart. Click the link below to reset it.</p>
      <a href="${link}">Reset your password</a>
      <p>If you did not request a password reset, please ignore this email or contact support if you have questions.</p>
      <p>Thanks,<br>The QuickMart Team</p>`
    })
   res.status(202).send({message:'Please check your email', link})
  } catch (error) {
    console.log(error);
  }
};

export const resetPassoword = async(req,res)=>{
  try {
    const {password , confirmPassword}=req.body;
    const {id,token}=req.params;
    const user = await changePassowordService(id)
    const secrate = user.id + process.env.SECRATE_KEY
    await jwt.verify(token,secrate)
    if (password && confirmPassword) {
      if (password == confirmPassword) {
        const hash = await bcrypt.hash(password,10)
        await UserModel.findByIdAndUpdate(user.id,{password:hash})
        return res.status(200).send({message:'password changed successfully'})
      } else {
        return res.status(400).send({message:'password and confirm password does not match'})
      }
    }else{
      return res.status(400).send({message:'All feilds required'})
    }
  } catch (error) {
    console.log(error.message)
  }
}

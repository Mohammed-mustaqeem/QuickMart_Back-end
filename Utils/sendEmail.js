import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config()

export const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
  port: 587,
  secure: false,
    auth:{
        user:process.env.USER_EMAIL,
        pass:process.env.EMAIL_PASS

    }
})

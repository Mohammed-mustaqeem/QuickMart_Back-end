import express from "express";
import { connectDB } from "./db/connectdb.js";
import dotenv from "dotenv";
import userRoute from "./routers/UserRouter.js";
import cors from "cors";
dotenv.config();
const port = process.env.PORT;
const app = express();
const db_url = process.env.DB_URL;
const db_name = process.env.DB_NAME;

app.use(cors());

// connect database
connectDB(db_url, db_name);

app.use(express.json());

// route define
app.use("/user", userRoute);

app.listen(port, () => {
  console.log(`server connected successfully at ${port}`);
});

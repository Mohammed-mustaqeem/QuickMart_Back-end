import express from "express";
import { connectDB } from "./db/connectdb.js";
import dotenv from "dotenv";
import userRoute from "./routers/UserRouter.js";
import cors from "cors";
import productRoute from "./routers/productRoutes.js";
dotenv.config();
const port = process.env.PORT;
const app = express();
const db_url = process.env.DB_URL;


app.use(cors());

// connect database
connectDB(db_url);

app.use(express.json());

// route define
app.use("/user", userRoute);
app.use("/", productRoute);

app.listen(port, () => {
  console.log(`server connected successfully at ${port}`);
});

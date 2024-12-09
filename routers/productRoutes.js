import express from "express";
import multer from "multer";
import { CreateProduct } from "../controllers/productController.js";
const productRoute = express.Router();

let Upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
  limits: { fileSize: 5000000 },
});

productRoute.post("/create", Upload.array("files", 10), CreateProduct);

export default productRoute;

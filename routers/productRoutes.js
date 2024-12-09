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
  limits: { fileSize: 500000 },
});

productRoute.post("/create", Upload.array("file", 1), CreateProduct);

export default productRoute;

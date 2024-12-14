import express from "express";
import multer from "multer";
import {
  CreateProduct,
  deleteProductById,
  getProductById,
  getProductControl,
} from "../controllers/productController.js";
const productRoute = express.Router();

let Upload = multer({
  storage: multer.diskStorage({
    // destination: (req, file, cb) => {
    //   cb(null, "uploads");
    // },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});

productRoute.post("/create", Upload.array("files", 5), CreateProduct);
productRoute.get("/products", getProductControl);
productRoute.get("/product/:id", getProductById);
productRoute.delete("/delete/:id", deleteProductById);

export default productRoute;

import { uploadFile } from "../helpers/upload.js";
import ProductModel from "../model/productModel.js";
import {
  deleteProductByIdService,
  getProductByIdService,
  getProductService,
  productService,
} from "../services/productService.js";

export const CreateProduct = async (req, res) => {
  try {
    if (req.files.length === 0) {
      return res.status(400).send({ message: "No files uploaded" });
    }
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Missing product details" });
    }
    console.log("req files ", req.files);
    const productImage = await Promise.all(
      req.files.map((file) => uploadFile(file.path))
    );
    const imageurl = productImage.map((image) => {
      return image.url;
    });
    console.log("image url", imageurl);

    const status = await productService(req.body, imageurl);

    if (status == "successfull") {
      return res.send({ status: true, message: "successfully added   " });
    }
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      return res.status(500).send({
        status: false,
        message: "Server error. Please try again later.",
      });
    }
  }
};

export const getProductControl = async (req, res) => {
  try {
    const getProduct = await getProductService();
    if (!getProduct) {
      res
        .status(500)
        .send({ status: "error", message: "Error in getting products" });
    }
    res.status(200).send({ success: true, products: getProduct });
  } catch (error) {
    console.log(error);
  }
};

export const getProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (!product) {
      return res.status(500).send({
        status: "error",
        message: `Product not found for the given ID: ${id}`,
      });
    }
    return res.status(200).send({ status: true, product: product });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await deleteProductByIdService(id);
    if (!product) {
      return res.status(500).send({
        status: "error",
        message: `Product not delete for the given ID: ${id}`,
      });
    }
    return res.status(200).send({ status: true, message: "Product Delete" });
  } catch (error) {
    console.log(error);
  }
};

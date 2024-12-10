import { uploadFile } from "../helpers/upload.js";
import { productService } from "../services/productService.js";

export const CreateProduct = async (req, res) => {
  
  try {
    if (!req.files || req.files.length === 0) {
     return res.status(400).send({ message: "No files uploaded" });
    }
    if (!req.body || Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .send({ status: false, message: "Missing product details" });
    }
    const productImage = await Promise.all(
      req.files.map((file) => uploadFile(file))
    );
    const imageurl = productImage.map((image) => {
      return image.url;
    });
    console.log(imageurl);

    const status = await productService(req.body, imageurl);

    if (status == "successfull") {
      return res.send({ status: true, message: "successfully added   " });
    } 
    
  } catch (error) {
    console.log(error.message);
    if (!res.headersSent) {
      return res
        .status(500)
        .send({
          status: false,
          message: "Server error. Please try again later.",
        });
    }
  }
};

import { uploadFile } from "../helpers/upload.js";
import { productService } from "../services/productService.js";

export const CreateProduct = async (req, res) => {
  try {
    if (req.files && req.files.length > 0) {
      const productImage = await Promise.all(
        req.files.map((file) => uploadFile(file))
      );
      const imgUrl = productImage.map((image) => {
          return image;
        });
        console.log(imgUrl)

        const status = await productService(req.body , imgUrl)

        if (status == "successfull") {
            res.send({status : true , message : 'successfully added '})
        }
    }
    

  } catch (error) {
    console.log(error)
  }
};

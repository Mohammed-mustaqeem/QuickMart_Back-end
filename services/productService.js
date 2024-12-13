import ProductModel from "../model/productModel.js"


const generateProductId = () => {
  try {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hour = String(now.getHours()).padStart(2, "0");
    const second = String(now.getSeconds()).padStart(2, "0");

    const QUickMart = "QUickMart:";
    const orderId = `${QUickMart}${year}${hour}${second}`;

    return orderId;
  } catch (error) {
    throw new Error("Failed to generate order ID: " + error.message);
  }
};

export const productService =async (data, imageurl)=>{
try {
    const productId = await generateProductId();
    const newProduct = new ProductModel({
      ...data,
      imageURL: imageurl,
      productId: productId,
    });
    const saveProduct =await newProduct.save()
    console.log(saveProduct)
    return "successfull"
} catch (error) {
    console.error("Error adding product:", error);
}
}

export const getProductService =async ()=>{
  try {
    const Products = await ProductModel.find()
    return Products;
  
  } catch (error) {
    console.log(findProduct)
  }
}

export const getProductByIdService = async (_id)=>{
  try {
    const product = await ProductModel.findById(_id)

    return product
  } catch (error) {
    
  }
}
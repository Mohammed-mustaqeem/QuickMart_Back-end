import ProductModel from "../model/productModel.js"


export const productService =async (data, imageurl)=>{
try {
    const newProduct = new ProductModel({...data , imageURL: imageurl})
    const saveProduct =await newProduct.save()
    console.log(saveProduct)
    return "successfull"
} catch (error) {
    console.error("Error adding product:", error);
}
}
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, required: true, unique: true, trim: true },
    header: { type: String, required: true, trim: true },
    productCategory: { type: String, trim: true },
    otherCategory: { type: String, trim: true },
    productName: { type: String, required: true, trim: true },
    productType: { type: String, required: true, trim: true },
    productBrand: { type: String, required: true, trim: true },
    availableStockQty: { type: Number, required: true },
    mrp: { type: Number, required: true },
    offerPrice: { type: Number, required: true, trim: true },
    packetweight: { type: Number, trim: true },
    unitOfMeasure: { type: String, trim: true },
    description: { type: String, required: true, trim: true },
    createdBy: { type: String, required: true, trim: true },
    imageURL: { type: Array, required: true },
    manufactureDate: { type: String, trim: true },
    expiryDate: { type: String, trim: true },
    sellerInformation: { type: String },
    approved: { type: Boolean, required: true, default: false },
    dealOfDay: { type: Boolean, default: false },
    Price: { type: String },
    // New fields for clothing
    size: { type: String, trim: true },
    color: { type: String, trim: true },
    material: { type: String, trim: true },
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Product", productSchema);

export default ProductModel;

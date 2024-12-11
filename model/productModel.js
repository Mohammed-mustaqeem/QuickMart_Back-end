import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String, unique: true, trim: true },
    header: { type: String, trim: true },
    productCategory: { type: String, trim: true },
    otherCategory: { type: String, trim: true },
    productName: { type: String, trim: true },
    productType: { type: String, trim: true },
    productBrand: { type: String, trim: true },
    availableStockQty: { type: Number },
    mrp: { type: Number },
    offerPrice: { type: Number, trim: true },
    packetweight: { type: Number, trim: true },
    unitOfMeasure: { type: String, trim: true },
    description: { type: String, trim: true },
    createdBy: { type: String, trim: true },
    imageURL: { type: Array },
    manufactureDate: { type: String, trim: true },
    expiryDate: { type: String, trim: true },
    sellerInformation: { type: String },
    approved: { type: Boolean, default: false },
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

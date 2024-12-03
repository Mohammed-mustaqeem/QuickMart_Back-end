import express from 'express'
import multer from 'multer'
import { CreateProduct } from '../controllers/productController.js';
const productRoute = express.Router();

let Upload = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize : 500000}
})

productRoute.post('/create',Upload.array('file',5), CreateProduct )




export default productRoute;
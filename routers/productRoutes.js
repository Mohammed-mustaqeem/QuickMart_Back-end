import express from 'express'
import multer from 'multer'
const productRoute = express.Router();

let Upload = multer({
    storage:multer.diskStorage({}),
    limits:{fileSize : 500000}
})

productRoute.post('/create',Upload.array('file',5), )




export default productRoute;
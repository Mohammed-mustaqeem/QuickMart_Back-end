import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
})

export const uploadFile =async (file)=>{
    try {
        const result = await cloudinary.uploader.upload(file)
        console.log('Image upload Successfully ',result)
        return result
    } catch (error) {
        console.log(error.message)
        throw new Error("File Upload failed");
        
    }
}
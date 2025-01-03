import mongoose from "mongoose";

export const connectDB = async (db_url)=>{
    try {
        await mongoose.connect(db_url)
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}
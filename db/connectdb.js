import mongoose from "mongoose";

export const connectDB = async (db_url,db_name)=>{
    try {
        await mongoose.connect(db_url+db_name)
        console.log('database connected successfully')
    } catch (error) {
        console.log(error)
    }
}
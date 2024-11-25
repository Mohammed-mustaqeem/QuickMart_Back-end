import UserModel from "../model/userModel.js";

export const userRegisterService = async (email) => {
  try {
    const user = await UserModel.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error.message);
  }
};

export const loginServic = async (email) => {
  try {
    const user = await UserModel.findOne({ email: email });
    return user;
  } catch (error) {}
};

export const forgotPassServic =async (email)=>{
  try {
    const user = await UserModel.findOne({email:email})
    return user;
  } catch (error) {
   console.log(error) 
  }
}

export const changePassowordService =async (id)=>{
  try {
    const user = await UserModel.findById(id)
    return user
  } catch (error) {
    console.log(error)
  }
}
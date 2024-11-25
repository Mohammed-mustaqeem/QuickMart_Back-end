import UserModel from "../model/userModel.js";

 const verifyToken_Middleware = async(req,res,next)=>{
    try {
     // get token from header
     const authHeader = req.headers.authorization;
     // console.log(authHeader)
     if (!authHeader) {
         return res.status(401).send({ status: 'failed', message: 'Authorization header is missing' });
     }
     let bearer= authHeader.split(' ')[1]    
 
     // verify token
     let {id} = await jwt.verify(bearer,process.env.SECRATE_KEY)
     
     // get user from token
     req.user = await UserModel.findById( id)

     next()
    } catch (error) {
     console.log(error)
     res.status(404).send({status:'failed', message:'Unauthorized User, No Token'})
    }
 }
 export default verifyToken_Middleware
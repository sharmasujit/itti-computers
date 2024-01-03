import jwt from "jsonwebtoken";
import { Seller } from "../seller/seller.model.js";


export const validateAccessToken=async(req,res,next)=>{
    //extract token from req.headers
    const authorization=req.headers.authorization;
    const splittedToken=authorization?.split(" ");
    const token=splittedToken?.length ===2?splittedToken[1] :null;

    if(!token)
    {
        return res.status(401).send("Unauthorized access...")
    }

    let payload;
    //decrypt token using signature
    try {
        payload=jwt.verify(token, process.env.ACCESS_TOKEN_SECERET);
        //console.log(payload);
    } catch (error) {
        return res.status(401).send({message:error.message});
    }

    //find the user from the email which is stored inside payload
    const seller=await Seller.findOne({email:payload.email});
    
    //if not seller then throw error
    if(!seller)
    {
        return res.status(401).send({message:"Unauthorised Seller"})
    }
    req.sellerDetails=seller;
    next();
}
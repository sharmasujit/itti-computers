import express from "express";
import {Seller} from "./seller.model.js";
import { emailValidationSchema, registerSellerValidationSchema} from "./seller.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router=express.Router();

//register seller in the system
router.post("/seller/register",async(req,res)=>{
    //extract data from req.body
    const sellerData=req.body;

    //validate extracted data 
    try {
        await registerSellerValidationSchema.validate(sellerData);
    } catch (error) {
        //if validation fails then 
        return res.status(400).send({message:error.message});
    }

    //check if email exists in our system
    const registeredSellerEmail=await Seller.findOne({email:sellerData.email});

    //if user with the email exists then
    if(registeredSellerEmail)
    {
        return res.status(409).send({message:"User with this email exists in our system"})
    }

    //check if phoneNumber exists in our system
    const registeredSellerNumber=await Seller.findOne({phoneNumber:sellerData.phoneNumber});

    //if user with the phoneNumber exists then
    if(registeredSellerNumber)
    {
        return res.status(409).send({message:"User with this phone number exists in our system"})
    }

    //hash password using bcrypt
    const hashPassword=await bcrypt.hash(sellerData.password,10);
    sellerData.password=hashPassword;

    //store the data in the database or create the seller
    await Seller.create(sellerData);
    
    //proper response
    return res.status(201).send({message:"Seller has been registered successfully..."})
})

//login the seller in the system
router.post("/seller/login",async(req,res)=>{
    //extract data from req.body
    const sellerData=req.body;

    //validate data from req.body
    try {
        await emailValidationSchema.validate(sellerData);
    } catch (error) {
        //if validation fails then throw error
        return res.status(400).send({message:error.message});
    }
    //check the email provided by user is present in database or not
    const sellerDetails=await Seller.findOne({email:sellerData.email});

    //if not throw error
    if(!sellerDetails)
    {
        return res.status(404).send({message:"Invalid Credentials..."})
    }

    //if email exists then compare password present in database or not
    const passwordMatch=await bcrypt.compare(sellerData.password,sellerDetails.password);

    //if password doesnot match then throw error
    if(!passwordMatch)
    {
        return res.status(404).send({message:"Password doesnot match..."})   
    }
    sellerDetails.password=undefined;

    //if match then generate access token using encryption algorithm
    const token=jwt.sign({email:sellerDetails.email},process.env.ACCESS_TOKEN_SECERET);

    //response
    return res.status(200).send({sellerDetails,accessToken:token});
})

export default router;


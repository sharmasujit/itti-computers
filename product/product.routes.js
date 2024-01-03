import express from "express";
import { Product } from "./product.model.js";
import { productValidationSchema } from "./product.validation.js";
import { validateAccessToken } from "../middleware/authentication.middleware.js";


const router=express.Router();

//add/create a product 
router.post("/create",validateAccessToken,
async(req,res)=>{
    //extract data from req.body
    const productData=req.body;
    const seller=req.sellerDetails;

    productData.sellerId=seller._id;
    //validate extracted data
    try {
        await productValidationSchema.validate(productData);
    } catch (error) {
        //if fails then throw error
        return res.status(400).send({message:error.message});
    }
    //add the extracted data into the database
    await Product.create(productData);
    //send proper response
    return res.status(201).send({message:"Product has been created successfully.."});
    
})


export default router;
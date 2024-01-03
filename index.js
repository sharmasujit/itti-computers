import express from "express";
import { connectDb } from "./db.connect.js";
import sellerRoutes from "./seller/seller.routes.js";
import productRoutes from "./product/product.routes.js";


const app=express()

//use json 
app.use(express.json());

//connect database
connectDb();

//register routes
app.use("/seller",sellerRoutes);
app.use("/product",productRoutes);

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
})
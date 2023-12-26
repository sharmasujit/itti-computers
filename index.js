import express from "express";
import { connectDb } from "./db.connect.js";
import sellerRoutes from "./seller/seller.routes.js";


const app=express()

//use json 
app.use(express.json());

//connect database
connectDb();

//register seller routes
app.use(sellerRoutes);

const port=process.env.PORT
app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
})
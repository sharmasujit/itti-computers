import mongoose from "mongoose";

const sellerSchema=new mongoose.Schema({
    firstName:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:55,
        required:true
    },
    lastName:{
        type:String,
        trim:true,
        minlength:2,
        maxlength:55,
        required:true
    },
    email:{
        type:String,
        trim:true,
        lowerCase:true,
        required:true,
        unique:true, 
    },
    phoneNumber:{
        type:String,
        trim:true,
        minlength:10,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:["male","female","preferNotToSay"],
    },
    address:{
        type:String,
        required:true,
        maxlength:500,
    }
},
{
    timestamps:true
})

export const Seller=mongoose.model("Seller",sellerSchema);
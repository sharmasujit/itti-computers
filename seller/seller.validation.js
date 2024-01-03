import * as Yup from "yup";

export const registerSellerValidationSchema=Yup.object({
    firstName:Yup.string().trim().min(2,"First Name must be at least two character")
    .max(55,"First name should not exceed 55 characters")
    .required(),

    lastName:Yup.string().trim().min(2,"Last Name must be at least two character")
    .max(55,"Last name should not exceed 55 characters")
    .required(),

    email:Yup.string().email().trim().max(60,"Email should not exceed 60 character")
    .lowercase().required("Email is required"),

    phoneNumber:Yup.string().trim().min(10,"Phone number must be at least 10 character")
    .max(10,"Phone number must not exceed 10 character").required(),

    password:Yup.string().required(),

    gender:Yup.string().trim().oneOf(["male","female","preferNotToSay"]),

    address:Yup.string().max(500,"Address should not exceed 500 character"),
});

export const emailValidationSchema=Yup.object({
    email:Yup.string().email().trim().max(60,"Email should not exceed 60 character")
    .lowercase().required("Email is required"),
})
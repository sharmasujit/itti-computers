import * as Yup from "yup";

export const productValidationSchema=Yup.object({
    brand:Yup.string().
    min(1,"Brand name must be atleast one character")
    .max(55,"Brand name must not exceed 55 character")
    .trim().required(),

    model:Yup.string().
    min(1,"Model name must be atleast one character")
    .max(100,"Model name must not exceed 100 character")
    .trim().required(),

    processor:Yup.string().min(1,"Processor must be at least one character")
    .max(55,"Processor should not exceed 55 character")
    .trim().required(),

    graphics:Yup.string().min(1,"Graphics must be atleast one character")
    .max(55,"Graphics must not exceed 55 character")
    .trim().required(),

    ram:Yup.string().min(1,"RAM must be atleast one character")
    .max(55,"RAM should not exceed 55 character")
    .trim().required(),

    storage:Yup.string().min(1,"Storage must be atleast one character")
    .max(55,"Storage should not exceed 55 character")
    .trim().required(),

    price:Yup.number().min(1,"Price should be atleast one rupees")
    .required(),

})
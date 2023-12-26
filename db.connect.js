import mongoose from "mongoose";
const dbName=process.env.DB_NAME
const dbPassword=process.env.DB_PASSWORD
const dbUserName=process.env.DB_USERNAME
export const connectDb=async()=>{
    try {
        await mongoose.connect(`mongodb+srv://${dbUserName}:${dbPassword}@cluster0.3fthfcl.mongodb.net/${dbName}?retryWrites=true&w=majority`);
        console.log("Database has been connected successfully");
    } catch (error) {
        console.log({message:error.message});
        console.log("Database connection has been failed...");
    }
}
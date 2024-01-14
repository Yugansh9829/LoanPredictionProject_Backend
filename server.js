import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Routes from "./routes/user_routes.js";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());
app.use(Routes);

dotenv.config();

mongoose
.connect(process.env.URI)
.then(()=>{
    app.listen(process.env.PORT,(req,res,err)=>{
        if(err){
            console.log({ err : err.message});
        }else{
            console.log(`server is live at port ${process.env.PORT}`);
        }
    })
    console.log("successfully connected to database");
})
.catch((err)=>{
    console.log("error occured\n", err.message);
})





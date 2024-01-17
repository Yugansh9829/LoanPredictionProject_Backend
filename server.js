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
const port = process.env.PORT || 6010;

mongoose
.connect(process.env.URI)
.then(()=>{
    try{
        app.listen(port,(req,res)=>{
            console.log(`server is live at port ${port}`);
        })
        console.log("successfully connected to database");
    }catch(err){
        console.log('some error occured while setting app to listen on port :', err.message);
    }
    
})
.catch((err)=>{
    console.log("error occured while connecting to database\n", err.message);
})





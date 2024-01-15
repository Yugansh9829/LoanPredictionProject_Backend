import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/gfg_database");

const User_schema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
    },
}, {timestamps : true} );

const user = mongoose.model("user", User_schema);

export default user;
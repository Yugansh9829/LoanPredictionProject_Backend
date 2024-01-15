import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/gfg_database");
const loan_schema = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        unique : true
    },
    Gender :{
        type : String,
        required : true
    },
    Married : {
        type : String,
        required : true,
    },
    Dependents :{
        type : Number,
        required : true,
    },
    education :{
        type : String,
        required : true
    },
    Self_Employed : {
        type : String,
        required : true
    },
    
    ApplicantIncome:{
        type : Number,
        required : true
    },
    CoapplicantIncome :{
        type : Number,
        required : true,
    },
    LoanAmount:{
        type : Number,
        required : true
    },
    Loan_Amount_Term : {
        type : Number,
        required : true
    },
    Credit_History:{
        type : Number,
        required : true
    },
    Property_Area :{
        type : String,
        required : true
    }
});

const loan_model = mongoose.model("loan_model", loan_schema);

export default loan_model;

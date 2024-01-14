import express from "express";
const app = express();
import user from "../models/user_model.js";
import loan_data from "../models/loan_model.js";
import runPythonScript from "./ML_model/python-runner.js";
const routes = express.Router();
app.use(express.json());

//to take the data from database
routes.get("/", async (req,res)=>{
    try{
        const showAll = await user.find();
        res.send(showAll);
    }catch(err){
        console.log("error occured while taking data from database\n",err.message);
    } 
});

//to take a specific data
routes.get("/:email", async (req,res)=>{
    try{
        const email = (req.params.email);
        const data = await user.find({email: email});
        console.log(data);
        res.json(data);
    }catch(err){
        console.log("error occured while getting data from an particular id: \n", err.message);
        res.sendStatus(404);
    }
    
})

//to  give the data to database
routes.post("/", async (req,res)=>{
    const{name,email,password} = req.body;
    try{
        const data = await user.create({
            name : name,
            email : email,
            password : password
        });
        res.send(data);
    }
    catch(err){
        console.log("error while posting user data on database : ",err.message);
        res.send(404);
    }
   
});

routes.get("/loan/:email",async (req,res)=>{
    const email = req.params.email;
    try{
        const data  = await loan_data.find({email : email});
        console.log(data);
        res.send(data);
    }catch(err){
        console.log("error occured while checking entry for email in loan data",err.message);
        res.sendStatus(400);
    }
})

routes.post("/loan", async (req,res)=>{
    const { email,Gender, Married, Dependents, education, Self_Employed,  ApplicantIncome, CoapplicantIncome, LoanAmount, Loan_Amount_Term,Credit_History, Property_Area }= req.body;
    try{
        const data_ = await loan_data.create({
            email : email,
            Gender : Gender,
            Married : Married,
            Dependents : Dependents,
            education : education,
            Self_Employed : Self_Employed,
            ApplicantIncome : ApplicantIncome,
            CoapplicantIncome : CoapplicantIncome,
            LoanAmount: LoanAmount,
            Loan_Amount_Term : Loan_Amount_Term,
            Credit_History : Credit_History,
            Property_Area : Property_Area
        })
        res.send(data_);
    }catch(err){
        console.log("error occured during adding loan details ; \n", err.message);
        res.sendStatus(404);
    }
});

routes.post('/predict', async (req, res) => {
    try {
        const inputData = req.body; // Assumes input data is sent in the request body
        const prediction = await runPythonScript('predictor.py', inputData);
        if(prediction.prediction[0] == 1){
            console.log("Congrates you are information meets our requirements for loan");
        }else{
            console.log("Your application dosen't meets our loan condition");
        }
        res.send({ans : prediction.prediction[0]});
    } catch (error) {
        console.error('Error occured while posting data on ML :\n', error);
        res.status(400).json({ error: 'Internal Server Error' });
    }
});

export default routes;

//now to delete or update something we need to pass some extra params to our routes.
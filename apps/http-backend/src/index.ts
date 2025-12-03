import express from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECERT_KEY } from './config/config';
import { authenticate} from './middleware/authMiddleware';

const app = express();


app.post("/signup",async (req,res)=>{
    const {username,email,password} = req.body;

    //add vadlition
    //insert into user table

    res.json({
        "message":"user is created"
    })
})

app.post("/signin",async (req,res)=>{
const {username,email} =req.body;

//
const userId = 1;

   const token =  jwt.sign({userId},JWT_SECERT_KEY)


   res.status(200).json({
    "success":true,
    "token":token
   })


})

app.post("/create-room",authenticate,async (req,res)=>{

    res.json({
        "roomid":"123"
    })
})


app.listen(5000,()=>{
    console.log("running 5000")
})
import jwt, { JwtPayload } from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'
import { JWT_SECERT_KEY } from '../config/config';


export const authenticate =async  (req:Request,res:Response,next:NextFunction)=>{
    const token= req.headers["authorization"];

    if (token){
        try{
    const decodeData = jwt.verify(token, JWT_SECERT_KEY);
               if ((decodeData as JwtPayload).userId){
                //@ts-ignore
                  req.userId = decodeData.userId;
                  next()
               }else{
                res.status(401).json({
                    "sucess":false,
                    "message":"unauthorized"
                })
               }
        }
        catch(err){
            console.log("JWT ERROR",err)
        }
    }

}
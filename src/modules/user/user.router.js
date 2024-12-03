import * as userController  from './controller/user.js'
import { Router } from "express";
const router = Router()




router.get('/', (req ,res)=>{
    res.status(200).json({message:"User Module"})
})



export default router
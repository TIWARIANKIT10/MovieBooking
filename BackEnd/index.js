import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./innngest/index.js"

const app = express();
const port = 4080;

//data base
await connectDB();




//middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())


//api Routes
app.get('/',(req,res)=>{
    res.send('server is live');

})
app.use("/api/inngest", serve({ client: inngest, functions }));

app.listen(port ,()=>{
    console.log(`http://localhost:${port}`);
     
})

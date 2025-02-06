import express from 'express';
import mongoose from 'mongoose';
import authRoutes from "./Routes/authRoutes.js"
import openAIRoutes from './Routes/openAIRoutes.js';
import userRoutes from './Routes/userRoutes.js';
import cors from "cors";
const app = express();
const port=5100;
app.use(cors());
app.use(express.json());
try{
    await mongoose.connect('mongodb://localhost:27017')
    app.listen(port, ()=>{
      console.log(`server running on PORT ${port}...`);
    });
  }catch(error){
    console.log(error);
    process.exit(1);
}


app.use('/api/auth', authRoutes);
app.use('/api/openAI',openAIRoutes);
app.use('/api/user',userRoutes);
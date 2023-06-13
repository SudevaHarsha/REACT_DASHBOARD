import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import User from "./models/User.js";
import {dataUser} from "./data/index.js";

dotenv.config();
const connectDB = async () =>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL , {
            useNewUrlParser : true,
            useUnifiedTopology : true,
        });
        console.log(`connected to mongodb successfully`);
        User.insertMany(dataUser);
    }catch(err){
        console.log(`error in mongodb ${err}`);
    }
}

export default connectDB;

import app from "./app.js";
import { conectDb } from "./config/database.js";
import cloudinary from 'cloudinary'
import Razorpay from "razorpay"

import Nodecron from 'node-cron'
import { Stat } from "./model/stats.js";
conectDb();
cloudinary.v2.config({
   cloud_name: process.env.Cloud_Name,
   api_key: process.env.API_Key,
   
   api_secret: process.env.API_Secret
});


//Razorpay

export const instance = new Razorpay({
   key_id: process.env.razorpay_APIkey,
   key_secret: process.env.razorpay_SecretKey,
});

//statt
Nodecron.schedule("0 0 0 1 * *", async()=>{
  try {
   await Stat.create({});
  } catch (error) {
   console.log("nodcroleer errer");
  }
})



app.listen(process.env.PORT, () => {
   console.log(`server is up on ${process.env.PORT} `);
}
)
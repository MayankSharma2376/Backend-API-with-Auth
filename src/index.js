// import dotenv from "dotenv"
// import connectDB from "./config/database.js";
// import app from "./app.js";
// dotenv.config({
//     path: "./.env"

// });

// const startServer = async()=>{
//     try{
//         await connectDB();

//         app.on("error", (error)=>{
//             console.log("Error", error)
//             throw error
//         })

//         app.listen(process.env.PORT || 8000, ()=>{
//             console.log(`Server is running on port ${process.env.PORT}`)
//         })

//     }catch(error){
//         console.log("MongoDB connection failed!!", error)
//         throw error;

//     }

// }

import express from "express";
import dotenv from "dotenv";
import app from "./app.js";
import mongoose from "mongoose";
dotenv.config({
  path: "./.env",
});

import connectDB from "./config/database.js";

const startServer = async () => {
  try {
    await connectDB();
    app.use(express.json());

    app.get("/", (req, res) => {
      res.send("API is Working");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Not Connected ", err)
  }
};


startServer()
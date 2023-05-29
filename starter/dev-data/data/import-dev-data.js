import mongoose from "mongoose";
import dotenv from "dotenv";
import { readFileSync } from 'fs';
dotenv.config({ path: "./config.env" });
import Tour from "./../../models/tourModel.js";
import app from '../../index.js';






const PORT = process.env.PORT || 8080;

const DB = process.env.DATA_BASE;

mongoose
   .connect(DB)
   .then(() => {
      app.listen(PORT, () => {
         console.log("Db connected and server running on port: ", PORT);
      });
   })
   .catch((err) => {
      console.log("Error connecting to MongoDB", err);
   });


//Rede JSON FILE

const tours = JSON.parse(readFileSync('./dev-data/data/tours-simple.json', 'utf-8'))


//import data to dataBase

const importData = async () => {
   try {
      const tour = await Tour.create(tours);
      console.log("data successfully loaded")
      process.exit();

   }
   catch (err) {
      console.log(err)
   }
}
//DELETE ALL DATA FROM DB 

const deleteData = async () => {
   try {
      const tour = await Tour.deleteMany();
      console.log("data successfully deleted !")
      process.exit();
   }
   catch (err) {
      console.log(err)
   }
}

if (process.argv[2] === '--import') {
   importData();
} else if (process.argv[2] === '--delete') {
   deleteData()
}
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });
import app from "./index.js";

const PORT = process.env.PORT || 8080;

const DB = process.env.DATA_BASE;

mongoose
   .connect(DB, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      // useFindAndModify: false
   })
   .then(() => {
      app.listen(PORT, () => {
         console.log("Db connected and server running on port: ", PORT);
      });
   })
   .catch((err) => {
      console.log("Error connecting to MongoDB", err);
   });

   //
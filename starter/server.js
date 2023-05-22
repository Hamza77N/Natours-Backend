


import app from './index.js';
import dotenv from 'dotenv';
dotenv.config({path:'./config.env'});

import mongoose from 'mongoose';
const PORT = process.env.PORT || 8080

const DB = process.env.DATA_BASE 


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



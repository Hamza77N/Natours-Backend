import express from "express";
import morgan from "morgan";
import tourRouter from '../starter/routes/tourRoutes.js';
import userRouter from '../starter/routes/userRoutes.js';

const app = express();

// 1 middleware 
app.use(morgan("dev"));

app.use(express.json())

app.use((req, res, next) => {
  console.log("hello from middleware")
  next();
})

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
})

//ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//Start the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
})

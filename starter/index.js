import express from "express";
import morgan from "morgan";
import tourRouter from '../starter/routes/tourRoutes.js';
import userRouter from '../starter/routes/userRoutes.js';

const app = express();

// 1 middleware 
if (process.env.NODE_ENV === 'development') {
   app.use(morgan("dev"));

}

app.use(express.json())

app.use(express.static('./public'))

app.use((req, res, next) => {
   // console.log("hello from middleware")
   next()
})

app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
})

//ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)

//Start the server
export default app;
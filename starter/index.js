import express from "express";
import morgan from "morgan";
import tourRouter from '../starter/routes/tourRoutes.js';
import userRouter from '../starter/routes/userRoutes.js';
import { AppError } from "./utils/appError.js";
import {globalErrorhandler} from './controllers/errorController.js';

const app = express();

// 1 middleware 
if (process.env.NODE_ENV === 'development') {
   app.use(morgan("dev"));

}

app.use(express.json())

app.use(express.static('./public'))


app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   // console.log(req.headers)
   next();
})

//ROUTES
app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)


app.all('*', (req, res, next) => {

   next(new AppError(`cant find ${req.originalUrl} on this server `, 404))

   // const err = new Error(`cant find ${req.originalUrl} on this server `)
   // err.status = 'fail'
   // err.statusCode = 404
});


app.use(globalErrorhandler)


//Start the server
export default app;
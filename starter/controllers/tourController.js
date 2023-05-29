// import { writeFile, readFileSync } from 'fs';
import { query } from 'express';
import Tour from '../models/tourModel.js';

// const tours = JSON.parse(readFileSync("./dev-data/data/tours-simple.json"));

// export const checkID = (req, res, next, val) => {
//   const tour = req.params.id

//   if (tour * 1 > tours.length) {
//     return res.status(404).json({
//       status: "fail",
//       message: "invalid ID"
//     });
//   }
//   next();
// }


// export const checkBody = (req, res, next, val) => {
//    if (!req.body.name || req.body.price) {
//       return res
//          .status(400)
//          .json({
//             status: "fail",
//             message: "missing name or price "
//          })
//    }
//    next()
// }

export const getAllTours = async (req, res) => {
   try {
      //BUILD QUERY
      const queryObj = { ...req.query }
      const excludedFields = ['page', 'sort', 'limit', 'fields']
      excludedFields.forEach(field => delete queryObj[field])
      console.log(req.query, queryObj)
      
      const query =  Tour.find(queryObj)


      // const query = Tour.find()
      // .where('duration')
      // .equals(5)
      // .where('difficulty')
      // .equals('easy')
      
      //EXECUTE QUERY
      const tours = await query
      
      // send response 
      res.status(200).json({
         status: "success",
         results: tours.length,
         data: {
            tours
         }
      });
   }


   catch (err) {
      res.status(500).json({
         status: "error",
         message: err.message
      })
   }


}


export const getTour = async (req, res) => {

   try {

      const tour = await Tour.findById(req.params.id)

      res.status(200).json({
         status: "success",
         data: {
            tour
         }
      });



   }
   catch (err) {
      res.status(500).json({
         status: "error",
         message: err.message,
      })
   }



}

export const createTour = async (req, res) => {
   try {

      const newTour = await Tour.create(req.body)
      res.status(201).json({
         status: 'success',
         data: {
            tour: newTour,
         }
      })
   }
   catch (err) {
      res.status(400).json({
         status: 'fail',
         message: err.message
      })
   }
}

export const updateTour = async (req, res) => {
   try {
      const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      })
      res.status(200).json({
         status: "success",
         data: {
            tour: tour
         }
      })

   } catch (err) {
      res.status(400).json({
         status: "error",
         message: err.message,
      })
   }


}

export const deleteTour = async (req, res) => {
   try {
      await Tour.findByIdAndDelete(req.params.id)
      // status code = no Content
      res.status(204).json({
         status: "success",
         data: null
      })

   }
   catch (err) {
      res.status(400).json({
         status: "error",
         message: err.message
      })
   }


}

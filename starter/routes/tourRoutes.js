import express from "express";

import { getAllTours, createTour, getTour, updateTour, deleteTour, aliasTopTours, getToursStats , getMonthlyPlan } from '../controllers/tourController.js';


const tourRouter = express.Router();


// tourRouter.param('id', checkID)
tourRouter
   .route('/tour-stats')
   .get(getToursStats)

   tourRouter
   .route('/monthly-plan/:year')
   .get(getMonthlyPlan)

tourRouter
   .route('/top-5-cheap')
   .get(aliasTopTours, getAllTours)


tourRouter
   .route('/')
   .get(getAllTours)
   .post(createTour)  // checkBody


tourRouter
   .route('/:id')
   .get(getTour)
   .patch(updateTour)
   .delete(deleteTour);

export default tourRouter;
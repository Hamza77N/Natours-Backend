import express from "express";

import { readFileSync, writeFile } from 'fs';

const tours = JSON.parse(readFileSync("./dev-data/data/tours-simple.json"));

const tourRouter = express.Router();



const getAllTours = (req, res) => {
  console.log(req.requestTime)
  res.status(200).json({
    status: "success",
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours
    }
  });
}

const getTour = (req, res) => {
  // console.log(req.params);
  const id = req.params.id * 1;
  const tour = tours.find(el => el.id === id);

  // if (id > tours.length) 

  if (!tour) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour
    }
  });
}

const createTour = (req, res) => {

  const Tour = req.body;
  // console.log(tour)
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, Tour)
  tours.push(newTour);


  writeFile("./dev-data/data/tours-simple.json", JSON.stringify(tours), err => {
    //status cod = created
    res.status(201).json({

      status: 'success',
      data: {
        tour: newTour,
      }

    })
  })
}

const updateTour = (req, res) => {
  const tour = req.params.id
  if (tour * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    });
  }

  res.status(200).json({
    status: "success",
    data: {
      tour: "<Updated tour here ....."
    }
  })
}

const deleteTour = (req, res) => {
  const tour = req.params.id
  if (tour * 1 > tours.length) {
    return res.status(404).json({
      status: "fail",
      message: "invalid ID"
    });
  }
  // status code = no Content
  res.status(204).json({
    status: "success",
    data: null
  })
}





tourRouter 
  .route('/')
  .get(getAllTours)
  .post(createTour)


  tourRouter 
  .route('/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour);

export default tourRouter;
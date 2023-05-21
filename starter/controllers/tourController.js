import { writeFile ,readFileSync  } from 'fs';
const tours = JSON.parse(readFileSync("./dev-data/data/tours-simple.json"));

export const getAllTours = (req, res) => {
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

export const getTour = (req, res) => {
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

export const createTour = (req, res) => {

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

export const updateTour = (req, res) => {
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

export const deleteTour = (req, res) => {
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
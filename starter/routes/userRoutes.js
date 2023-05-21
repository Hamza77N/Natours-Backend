import express from "express";

const getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route is not defined"
  })
}

const getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route is not defined"
  })
}

const createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route is not defined"
  })
}

const updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route is not defined"
  })
}

const deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: "This route is not defined"
  })
}

const userRouter = express.Router();





userRouter 
  .route('/')
  .get(getAllUsers)
  .post(createUser)

  userRouter 
  .route('/:id')
  .get(getUser)
  .patch(updateUser)
  .delete(deleteUser);

export default userRouter ;
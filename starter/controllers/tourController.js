import { Tour } from '../models/tourModel.js';
import { APIFeatures } from '../utils/APIFeatures.js';
import{ AppError} from '../utils/appError.js';
import { catchAsync } from '../utils/catchAsync.js';



export const aliasTopTours = async (req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
   next()
}




export const getAllTours = catchAsync(async (req, res, next) => {

   //EXECUTE QUERY
   const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
   // console.log(features)
   // console.log(features.query._conditions);

   const tours = await features.query
   // console.log(tours)

   // send response 
   res.status(200).json({
      status: "success",
      results: tours.length,
      data: {
         tours
      }
   });
})


export const getTour = catchAsync(async (req, res, next) => {
   const tour = await Tour.findById(req.params.id);
   // Tour.findOne({ _id: req.params.id })

   if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
   }

   res.status(200).json({
      status: 'success',
      data: {
         tour,
      }
   });
})



export const createTour = catchAsync(async (req, res, next) => {

   const newTour = await Tour.create(req.body)
   res.status(201).json({
      status: 'success',
      data: {
         tour: newTour,
      }
   })
})

export const updateTour = catchAsync(async (req, res, next) => {

   const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
   })

   if (!tour) {
      return next(new AppError('No tour found with that ID', 404));
   }

   res.status(200).json({
      status: "success",
      data: {
         tour: tour
      }
   })


})

export const deleteTour = catchAsync(async (req, res, next) => {

   const tour = await Tour.findByIdAndDelete(req.params.id)

   if (!tour) {
      return next(new AppError('No such resource found', 404))
   }

   // status code = no Content
   res.status(204).json({
      status: "success",
      data: null
   })
})


export const getToursStats = catchAsync(async (req, res, next) => {

   const stats = await Tour.aggregate([
      {
         $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
         $group: {
            _id: { $toUpper: '$difficulty' },
            numTours: { $sum: 1 },
            numRatings: { $sum: '$ratingsQuantity' },
            avgRating: { $avg: '$ratingsAverage' },
            avgPrice: { $avg: '$price' },
            minPrice: { $min: '$price' },
            maxPrice: { $max: '$price' },

         }
      },
      {
         $sort: { avgPrice: 1 }
      },
      // {
      //    $match :{_id:{$ne :'EASY'}}
      // }
   ]);
   res.status(200).json({
      status: "success",
      data: {
         tour: stats
      }
   })
})

export const getMonthlyPlan = catchAsync(async (req, res, next) => {

   const year = req.params.year * 1
   const plan = await Tour.aggregate([
      {
         $unwind: '$startDates'
      },
      {
         $match: {
            startDates: {
               $gte: new Date(`${year}-01-01`),
               $lte: new Date(`${year}-12-31`),
            }
         }
      },
      {
         $group: {
            _id: { $month: '$startDates' },
            numToursStart: { $sum: 1 },
            tours: { $push: '$name' }
         }
      },
      {
         $addFields: { month: '$_id' }
      },
      {
         $project: {
            _id: 0
         }
      },
      {
         $sort: { numTourStarts: -1 }
      },
      {
         $limit: 12
      }

   ])
   res.status(200).json({
      status: "success",
      data: {
         plan,
      }
   })
})

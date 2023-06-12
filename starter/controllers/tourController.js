import { Tour } from '../models/tourModel.js';
import { APIFeatures } from '../utils/APIFeatures.js';



export const aliasTopTours = async (req, res, next) => {
   req.query.limit = '5';
   req.query.sort = '-ratingsAverage,price';
   req.query.fields = 'name,price,ratingsAverage,summary,difficulty'
   next()
}




export const getAllTours = async (req, res) => {
   try {
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


export const getToursStats = async (req, res) => {
   try {
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



   }
   catch (err) {
      res.status(400).json({
         status: "error",
         message: err.message
      })
   }
}

export const getMonthlyPlan = async (req, res) => {
   try {
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
            $sort: {numTourStarts : -1}
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
   }
   catch (error) {
      res.status(400).json({
         status: "error",
         message: err.message
      })
   }
}

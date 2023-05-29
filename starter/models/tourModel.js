import mongoose from 'mongoose';


const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'a tour must have a name '], unique: true,
      trim: true,
   },
   ratingsAverage: {
      type: Number,
      default: 4.5,
   },
   ratingsQuantity: {
      type: Number,
      default: 0,
   },
   price: {
      type: Number,
      required: [true, 'a tour must have a price ']
   },
   priceDiscount: {
      type: Number,
   },
   summary: {
      type:String,
      trim: true,
   },
   difficulty: {
      type: String,
      required: [true, 'a tour must have a difficulty ']
   },
   duration: {
      type: Number,
      require: [true, 'A tour must have a duration']
   },
   maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
   },
   description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description']
   },
   imageCover: {
      type: String,
      required: [true, 'A tour must have an image cover']
   },
   images: [String],
   createdAt: {
      type: Date,
      default: Date.now()
   },
   startDates: [Date]

});

// add tour Schema to tour model
const Tour = mongoose.model('Tour', tourSchema);


export default Tour
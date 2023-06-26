import mongoose from 'mongoose';
import validator from 'validator'
import bcrypt from 'bcryptjs';
import crypto from 'crypto';


//name,email,photo,password,passconfirm 
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Please tell us your name '],
      unique: true
   },
   email: {
      type: String,
      required: [true, 'please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please provide a valid email']
   },
   photo: String,
   role: {
      type: String,
      enum: ['user', 'guide', 'lead-guid', 'admin'],
      default: 'user'
   },
   password: {
      type: String,
      minlength: [8, 'Password must be at least 8 characters long'],
      unique: true,
      required: true,
      select: false,
   },
   passwordConfirm: {
      type: String,
      require: true,
      validate: {
         //!This only works on Create / SAVE !!!
         validator: function (el) {
            return el === this.password
         },
         messages: 'password not the same '
      }
   },
   passwordChangedAt: {
      type: Date,
   },
   passwordResetToken: String,
   passwordResetExpires: Date,

});



userSchema.pre('save', async function (next) {
   // only run this fun if password is Modified 
   if (!this.isModified("password")) return next();
   // hash the password 
   this.password = await bcrypt.hash(this.password, 12)
   this.passwordConfirm = undefined;
   next();
})

userSchema.pre('save', function (next) {
   if (!this.isModified('password') || this.isNew) return next()
   this.passwordChangedAt = Date.now() - 1000
   next();
})


userSchema.methods.correctPassword = async function (
   candidatePassword,
   userPassword
) {
   return await bcrypt.compare(candidatePassword, userPassword)
}



userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

   if (this.passwordChangedAt) {
      const changedTimestamp = parseInt(
         this.passwordChangedAt.getTime() / 1000, 10);

      // console.log(changedTimestamp, JWTTimestamp)
      return JWTTimestamp < changedTimestamp // 100 < 200
   }
   // False mean NOT changed 
   return false;

};

userSchema.methods.createPasswordResetToken = function () {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

   console.log({ resetToken }, this.passwordResetToken);

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000

   return resetToken

}


export const User = mongoose.model('User', userSchema);
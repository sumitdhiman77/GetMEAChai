import mongoose from "mongoose";
const { Schema, model } = mongoose;

// Define the schema
const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      match: /.+\@.+\..+/, // simple email regex
    },
    name: {
      type: String,
      // required: true,
    },
    username: {
      type: String,
      required: true,
      // minlength: 6,
    },
    razorpayid: {
      type: String,
    },
    razorpaysecret: {
      type: String,
    },
    profilepic: {
      type: String,
    },
    coverpic: {
      type: String,
    },
  },
  { timestamps: true }
);
export default mongoose.models.User || model("User", UserSchema);

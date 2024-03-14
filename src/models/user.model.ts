import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  avatar: String,
});

// Defining Mongoose model
export default mongoose.models.User || mongoose.model('User', userSchema);

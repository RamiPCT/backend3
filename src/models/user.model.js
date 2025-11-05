// src/models/user.model.js
import mongoose from "mongoose";

const userCollection = "users";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  pets: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pets",
    },
  ],
});

export const UserModel = mongoose.model(userCollection, userSchema);

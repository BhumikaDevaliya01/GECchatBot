// import mongoose from "mongoose";
import { randomUUID } from "crypto";

const chatSchema = new mongoose.Schema({
  id: {
    type: String,
    default: randomUUID(),
  },
  role: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});


// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   chats: [chatSchema],
// });

// export default mongoose.model("User", userSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface IUser extends Document {
  name : string;
  email : string;
  password: string;
  chats: ChatMessage[];
  // Add any other properties you need for the User model
}

const userSchema: Schema = new Schema({
  name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
  chats: [
    {
      role: {
        type: String,
        enum: ['user', 'assistant'],
        required: true,
      },
      content: {
        type: String,
        required: true,
      },
    },
  ],
  // Add any other properties you need for the User model
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;

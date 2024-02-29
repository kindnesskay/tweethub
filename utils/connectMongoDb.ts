import mongoose from "mongoose";
let isConnected = false;
export const connectToDb = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_DB_URI) return console.log("mogodb url not found");
  if (isConnected) return console.log("already connected");
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    isConnected = true;
    console.log("connection successfull");
  } catch (error) {
    isConnected = false;
    console.log("connection failed",error);
  }
};

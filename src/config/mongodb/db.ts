import mongoose from "mongoose";
require('dotenv').config();
export const connectMongoDB = async () => {
  try {
    const URI = process.env.MONGO_URL;
    if (!URI) {
      console.error("MongoDB URI is not defined in the .env file.");
      process.exit(1);
    }
    const connOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions;
    const conn = await mongoose.connect(URI, connOptions);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error: ${error.message}`);
    } else {
      console.error(`Unknown Error: ${error}`);
    }
    process.exit(1);
  }
};

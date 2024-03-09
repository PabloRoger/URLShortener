import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' })

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
  } catch (error) {
    console.log(err.message);
    process.exit(1)
  }
};

export default connectDB;
import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoHost = process.env.MONGO_HOST;
const mongoDb = process.env.MONGO_DB;
const mongoAuthSource = process.env.MONGO_AUTH_SOURCE;

const mongoUri = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}/${mongoDb}?authSource=${mongoAuthSource}`;

mongoose.connect(mongoUri)
  .then(() => {
    console.log('*Connected to MongoDB*');
  })
  .catch((error) => {
    console.error('Error:', error);
  });


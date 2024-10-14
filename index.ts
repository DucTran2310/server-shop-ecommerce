import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import userRouter from '@routes/user.router'
import productRouter from '@routes/product.router'
import cors from 'cors'

dotenv.config()

const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.z9tcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const app = express()
app.use(express.json())
app.use(cors())

app.use('/auth', userRouter)
app.use('/product', productRouter)

const PORT = process.env.PORT || 8081;

const connectDB = async () => {
  try {
    await mongoose.connect(dbURL);
    console.log(':::Connected to MongoDB successfully!');
  } catch (error) {
    console.error(':::Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

connectDB() 
  .then(() => {
    app.listen(PORT, () => {
      console.log(`:::Server is running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log(':::Server startup failed:', error);
  });
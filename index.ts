import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const dbUrl = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@cluster0.z9tcw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const app = express()

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(`:::Server is starting at http://localhost:${PORT}`)
}).on('error', (err: any) => {
  console.log(':::ERROR: ', err)
  throw new Error(err)
})
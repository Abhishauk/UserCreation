import express from 'express';
import router from '../server/routes/route';
import cors from 'cors';
import bodyParser from 'body-parser'; 
import mongoose from 'mongoose';


const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port : Number = 6001;

app.get("/" , router)
app.post('/signup',router)
app.post('/signin',router)


mongoose.connect('mongodb://127.0.0.1:27017/Users');

const db = mongoose.connection;

db.on('error', (error: Error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', () => {
  console.log('MongoDB connected successfully');
});

db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

app.listen(port , () => {
    console.log("port connected");
    
})


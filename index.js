import express from 'express';
import connectDB from './config/db.js';
import dotenv from 'dotenv';
import urlsRouter from './routes/urls.js';
import indexRouter from './routes/index.js';

const app = express();

dotenv.config({ path: './config/.env' });

connectDB();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', indexRouter);
app.use('/api', urlsRouter);


// Server Setup
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`)
});
import express, { Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import NodeCache from 'node-cache';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes/index.js';
import {connectDB} from './utils/features.js';
import {errorMiddleware} from './middlewares/error.js';

dotenv.config({
  path:"./.env"
});
// console.log(process.env.PORT);
const mongoUrl = process.env.MONGO_URL || "";
const port = process.env.PORT || 4000;
const app = express();

/* 
--> parse requests of content-type - application/json to accept data from payload. 
--> all our routes should be below the `express.json()`.
*/
app.use(express.json());

connectDB(mongoUrl);

export const myCache = new NodeCache();

app.use(morgan("dev"));//to show log and api calls

app.use('/api/v1',routes());

/*
-->by going to /uploads path, we can access uploads folder
-->express.static("uploads") is the middleware function. It serves static files from the "uploads" directory.
*/
app.use('/uploads',express.static('uploads'));

app.use(errorMiddleware);


app.listen(port,()=>{
  console.log(`Server is working on http://localhost:${port}`);
  
})
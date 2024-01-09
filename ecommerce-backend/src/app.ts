import express, { Request,Response,NextFunction } from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index.js';
import {connectDB} from './utils/features.js';
import {errorMiddleware} from './middlewares/error.js';

const port = 4000;
const app = express();

/* 
--> parse requests of content-type - application/json to accept data from payload. 
--> all our routes should be below the `express.json()`.
*/
app.use(express.json());

connectDB();

app.use('/api/v1',routes());

app.use(errorMiddleware);


app.listen(port,()=>{
  console.log(`Server is working on http://localhost:${port}`);
  
})
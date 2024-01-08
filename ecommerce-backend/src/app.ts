import express from 'express';
import routes from './routes/index.js';
import {connectDB} from './utils/features.js';

const port = 4000;
const app = express();

connectDB();
app.use('/api/v1',routes());

app.listen(port,()=>{
  console.log(`Server is working on http://localhost:${port}`);
  
})
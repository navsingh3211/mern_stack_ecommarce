import mongoose from "mongoose";


const mongoUrl = 'mongodb://127.0.0.1:27017/inventory';


export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(mongoUrl, {
      dbName:'mern-e-commerce'
    });

    console.log(`🔗🔗🔗🔗 MongoDB Connected: ${conn.connection.host} 🔗🔗🔗🔗`);
    console.log('Connection to the database is successful✅.');
  } catch (error) {
    console.error(
      `🔗‍💥🔗‍💥🔗‍💥🔗‍💥  ${error} 🔗‍💥🔗‍💥🔗‍💥🔗‍💥`
    );
    console.log('Could not connect to the database.', error);
    process.exit(1);
  }
}


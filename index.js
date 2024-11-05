import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
import userRouter from './Routes/UserRouter.js'
dotenv.config();

const app = express()

app.use(express.json())
app.use(bodyParser.json())

// Middleware
app.use(express.json());
app.use(bodyParser.json());

// CORS configuration
const corsOptions = {
    origin: [process.env.CLIENT_BASE_URL],
    methods: ["GET", "POST", "PATCH", "DELETE"],
};
app.use(cors(corsOptions));

// Routes
app.use('/', userRouter);

//servcer connection
const port = process.env.port
app.listen(port, () => {
    console.log(`server running on ${port}`)
})


//database connection
const mongourl = process.env.MONGO_URI
mongoose.connect(mongourl)
.then(() => console.log('databse connected'))
.catch(err => console.log(err,"daatabase erororr"))

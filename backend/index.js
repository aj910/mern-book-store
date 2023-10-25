import express, { request } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js"
import cors from "cors"

const app = express();

app.use(express.json());

// handling cors policy with middleware
app.use(cors());

app.get('/', (request, response) => {
    response.setHeader("Access-Control-Allow-Credentials","true")
    console.log(request);
    return response.status(234).send("Welcome to mern book store app!")
})

app.use('/books', bookRoute);


const connectWithRetry = () => {
    mongoose.connect(mongoDBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("App connection with database")
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    }).catch((error) => {
        console.log('MongoDB Connection Error: ', error);
        setTimeout(connectWithRetry, 5000)
    });
};

connectWithRetry();



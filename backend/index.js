import express, { request } from "express";
import { PORT, mongoDBURL } from "../backend/config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import bookRoute from "./routes/bookRoute.js"

const app = express();

app.use(express.json())

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to mern book store app!")
})

app.use('/books', bookRoute)


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



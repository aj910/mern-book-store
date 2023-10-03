import express from "express";
import { PORT } from "../backend/config.js";

const app = express();
app.listen(PORT, () => {
    console.log(`App is listening to port: ${PORT}`);
})
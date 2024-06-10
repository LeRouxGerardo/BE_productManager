import express from "express";

import router from "./routes/index.js";
import { connectMongoDB } from "./config/mongoDb.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";

connectMongoDB();


const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://lerouxgerardo:admin123456@cluster0.xee7vf4.mongodb.net/ecommerce",
    ttl: 15
    }),
    secret: "CodigoSecreto",
    resave: true
}))


app.use("/api",router);


app.listen(port, ready);


  
  
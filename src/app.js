import express from "express";

import router from "./routes/index.js";
 
const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api",router);


app.listen(port, ready);


  
  
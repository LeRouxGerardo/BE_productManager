import express from "express";

import {
    getProducts,
    getProductById,
  } from "./data/FS/index.js"; 
 
const app = express();

const port = 8080;
const ready = console.log("server ready on port " + port);

app.listen(port, ready);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get ("/", index);
app.get("/products", read);
app.get("/products/:nid", readOne);

function index(req, res) {
    try {
      const message = "Bienvenido al Sistema de Control de Stock";
      return res.json({ status: 200, response: message });
    } catch (error) {
      console.log(error);
      return res.json({ status: 500, response: error.message });
    }
  }
  
  async function read(req, res) {
    try {
      let limit = req.query.limit;
      let all = await getProducts();
  
      if (limit && !isNaN(limit)) {
        all = all.slice(0, parseInt(limit));
      }
  
      return res.json({ status: 200, response: all });
    } catch (error) {
      console.log(error);
      return res.json({
        status: error.status || 500,
        response: error.message || "ERROR",
      });
    }
  }
  
  async function readOne(req, res) {
    try {
      const { nid } = req.params;
      const one = await getProductById(nid);

      if (one) {
        return res.json({ status: 200, response: one });
      }  else {
        const error = new Error("Not found");
        error.status = 404;
        throw error;
      }
    } catch (error) {
      console.log(error);
      return res.json({
        status: error.status || 500,
        response: error.message || "ERROR",
      });
    }
  }
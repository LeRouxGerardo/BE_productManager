import { Router, response } from "express";
import productDao from "../dao/mongoDao/product.dao.js";

const router = Router();


router.post("/", create);
router.get("/", read);
router.get("/:pid", readOne);
router.delete("/:pid", destroy);
router.put("/:pid", update);





async function read(req, res) {
    try {
      /* const {limit} = req.query; */
      const products = await productDao.getAll();
  
      // if (limit && !isNaN(limit)) {
     //   products = products.slice(0, parseInt(limit));
     // } 
  
      return res.status(200).json({ status: "success", payload: products });
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
      const { pid } = req.params;
      const product = await productDao.getById(pid);
      
      if (product) {
        return res.status(200).json({ status: "success", payload: product });
      }  else {
        const error = res.status(404).json({status: "Error", msg: `Producto con el id ${pid} no encontrado`})
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


async function create(req, res) {

  try {
    const product = req.body;
    const newProduct = await productDao.create(product);

    return res.status(200).json({ status: "success", payload: product });
   
  } catch (error) {
      console.log(error);
      return res.json({
        status: error.status || 500,
        response: error.message || "ERROR",
      });
  }


}

async function update(req, res) {

  try {
    const {pid} = req.params
    const productData = req.body
    const updatedProduct = await productDao.update(pid, productData);
    
    if (updatedProduct) {
    return res.status(200).json({ status: "success", payload: updatedProduct });
  } else {
    const error = res.status(404).json({status: "Error", msg: `Producto con el id ${pid} no encontrado`})
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


async function destroy(req, res) {

  try {
    const { pid } = req.params;

    const product = await productDao.deleteOne(pid);  
    if (!product) return res.status(404).json({status: "Error", msg: `Producto con el id ${pid} no encontrado`})
    
      res.status(200).json({message:"Producto Eliminado"});
    
  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
}


}
export default router;




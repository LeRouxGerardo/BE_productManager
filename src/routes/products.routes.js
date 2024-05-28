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
      const product = await productDao.getById(+pid);
      
      if (product) {
        return res.status(200).json({ status: "success", payload: product });
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
    const data = req.body
    const updatedProduct = await productManager.updateProduct(+pid, data);
    
    if (updatedProduct) {
    return res.json({ status: 201, response: updatedProduct});
  }
  const error = new Error( "Producto No encontrado!");
  error.status = 404;
  throw error;
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
    const{pid} = req.params;

    const productToDelete = await productManager.getProductById(+pid);


    if (productToDelete) {

      await productManager.deleteProduct(+pid)

      return res.json({ status: 200, response : productToDelete})
    }
      const error = new Error( "Producto No encontrado!");
      error.status = 404;
      throw error;

  } catch (error) {
    console.log(error);
    return res.json({
      status: error.status || 500,
      response: error.message || "ERROR",
    });
}


}
export default router;




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
      const { limit, page, sort, category, status } = req.query;
      const options = {
        limit: limit || 10, 
        page: page || 1,
        sort: {
          price: sort === "asc" ? 1 : -1, 
        },
        lean: true,
      };
      if(status) { 
        const products = await productDao.getAll({status:status }, options);
        return res.status(200).json({ products});
      }
      if(category) { 
        const products = await productDao.getAll({category:category }, options);
        return res.status(200).json({ products});
      }
      const products = await productDao.getAll({}, options);

      res.status(200).json({ status: "success", products });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
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
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
    }
  }


async function create(req, res) {

  try {
    const product = req.body;
    const newProduct = await productDao.create(product);

    return res.status(201).json({ status: "success", payload: newProduct });
   
  } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
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
      res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
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
    res.status(500).json({ status: "Error", msg: "Error interno del servidor"});
}


}
export default router;




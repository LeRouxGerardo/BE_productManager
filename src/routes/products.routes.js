import { Router } from "express";
import productManager from "../../data/FS/productManager.js"; 

const router = Router();

router.get ("/", index);
router.get("/", read);
router.get("/:nid", readOne);



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
      let all = await productManager.getProducts();
  
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
      const one = await productManager.getProductById(nid);

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


router.post("/",async (req, res) => {

  try {
    const product = req.body;

    const newProduct = await productManager.addProduct(product);

    res.status(201).json(newProduct);
  } catch(error) {
    console.log(error);
  }


})

router.put("/:pid",async (req, res) => {

  try {
    const{pid} = req.params;
    const product = req.body;

    const updateProduct = await productManager.updateProduct(pid, product);

    res.status(201).json(updateProduct);
  } catch(error) {
    console.log(error);
  }


})

router.delete("/:pid",async (req, res) => {

  try {
    const{pid} = req.params;
  
    await productManager.deleteProduct(pid);

    res.status(201).json({message: "Producto eliminado"});
  } catch(error) {
    console.log(error);
  }


})
export default router;




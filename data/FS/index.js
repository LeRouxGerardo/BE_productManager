import fs from "fs";



let products = [];
let pathFile = "./data/fs/files/products.json";

const addProduct = async (title, description, price, thumbnail, code, stock) => {

   const newProduct = {
    id: products.length +1,
    title,
    description,
    price,
    thumbnail,
    code,
    stock

   }

   console.log(Object.values(newProduct));
   if (Object.values(newProduct).includes(undefined)) {
    console.log("Todos los campos son obligatorios");
    return;
   }

   const productExists = products.find( product => product.code === code);
   if(productExists) {
    console.log(`El producto ${title} con el código ${code} ya existe]`);
    return;
   }

   products.push(newProduct);

  await fs.promises.writeFile(pathFile, JSON.stringify(products));
}

const getProducts = async () => {
    
    
    const productsJson = await fs.promises.readFile(pathFile, "utf8");

    products = JSON.parse(productsJson) || [];

    return products;
};

const getProductById = async (id) => {
    const products = await getProducts();
    const product = products.find( product => product.id == id);
    if(!product) {
        console.log(`No se encontró el producto con el id ${id}`);
        return;
    }
    console.log(product);
    return product;
};

const updateProduct = async (id, dataProduct) => {
    await getProducts();
    const index = products.findIndex( product => product.id === id);
    products[index] = {
        ...products[index],
        ...dataProduct
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(products));


};

const deleteProduct = async (id) => {
    await getProducts();
    products = products.filter( product => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));
}


export { getProducts, getProductById, updateProduct, deleteProduct };

/*  //Test
addProduct("AZUCAR BELLA VISTA X 1 KG.", "Azucar marca Bella Vista x 1 Kg", 899, "https://statics.dinoonline.com.ar/imagenes/large_460x460/2000027_l.jpg", "2000027", 800);
addProduct("YERBA VERDEFLOR COMPUESTA X 1 KG.", "Yerba marca Verdeflor tipo Compuesta x 1 KG.", 2098, "https://statics.dinoonline.com.ar/imagenes/large_460x460/2010294_l.jpg", "2010294", 1200);
addProduct("AGUA SABORIZADA LIVRA NARANJA BOTELLA X 1.500 CC.", "Agua saborizada marca Livra sabor naranja en botella de 1.5 cc", 990, "https://statics.dinoonline.com.ar/imagenes/large_460x460/3040735_l.jpg", "3040735", 600);

 */

// getProducts ()

//getProductById(3); 

/* updateProduct(3, {
    "id": 3,
    "title": "AGUA SABORIZADA LIVRA NARANJA DULCE BOTELLA X 1.500 CC.",
}) */

// deleteProduct(2); 
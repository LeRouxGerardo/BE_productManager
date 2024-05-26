import { productModel } from "../models/product.model.js";

const getAll = async () => {
    const products = await productModel.find();
    return products;
};
const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
}
const create = async (data) => {
    const product = await productModel.create(data);
    return product;
}
const update = async (id, data) => {
    await productModel.findByIdAndUpdate(id, data);
    const product = await productModel.findById(id)
    return product;
}
const deleteOne = async (id) => {
    const product = await productModel.deleteOne({_id: id});
    return true;
}

export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
}
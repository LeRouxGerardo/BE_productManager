import mongoose from "mongoose";

const urlDb = "mongodb+srv://lerouxgerardo:admin123456@cluster0.xee7vf4.mongodb.net/ecommerce";

export const connectMongoDB = async => {
    try {
        mongoose.connect(urlDb);
        console.log("Mongo DB Conectado");
        } catch (error) {
            console.log(error);
        }
};
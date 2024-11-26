import mongoose from "mongoose";

export const connectDB = async () => {

    // Definir a conexão
    mongoose.connection.on('connected', () => {
        console.log('MongoDB Connected...')
    })

    // Conectar-se com MongoDB
    await mongoose.connect(`${process.env.MONGODB_URL}e-commerce`)
}
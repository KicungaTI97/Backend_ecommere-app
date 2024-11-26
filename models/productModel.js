import mongoose from "mongoose";

// Define um esquema (schema) para o documento do MongoDB chamado `productSchema`.
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: Array, required: true },
    category: { type: String, required: true },
    subCategory: {type: String, require: true},
    size: {type: Array, require: true},
    bestseller: {type: Boolean},
    date: {type: Number, require: true}
})

// Exporta o modelo `productModel`, que é uma instância do `mongoose.model` com base no `productSchema`.
// O operador lógico `||` é usado para evitar criar múltiplas instâncias do mesmo modelo se ele já existir.
// Se o modelo `product` já existir em `mongoose.models`, ele será reutilizado; caso contrário, um novo modelo é criado.
export const productModel = mongoose.models.product || mongoose.model('product', productSchema)

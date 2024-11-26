import mongoose from "mongoose";

 const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cartData: {type: Object, default: {}}
}, {
// `minimize: false`: Garante que objetos vazios no `cartData` sejam armazenados
// como `{}` em vez de serem minimizados para `null` ou removidos.
    minimize:false
})

// Cria um modelo `userModel` a partir do esquema `userSchema`.
// Verifica se o modelo `user` já existe (`mongoose.models.user`), 
// e se não existir, cria um novo modelo (`mongoose.model('user', userSchema)`).
export const userModel = mongoose.models.user || mongoose.model('user', userSchema)
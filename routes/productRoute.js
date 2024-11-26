import express from 'express'

import { listProducts,addProduct,removeProduct,singleProduct } from '../controllers/productController.js'
import { upload } from '../middleware/multer.js';


export const productRouter = express.Router();


// Rota para adicionar um novo produto
productRouter.post('/add', 
    upload.fields([
        {name: 'image1', maxCount: 1}, // maxCount: 1 significa que só pode ser enviado uma imagem
        {name: 'image2', maxCount: 1},
        {name: 'image3', maxCount: 1},
        {name: 'image4', maxCount: 1},
]), 
    addProduct
)

// Rota para listar todos os produtos
productRouter.get('/list', listProducts)

// Rota para deletar um produto específico
productRouter.delete('/remove/:id', removeProduct)

// Rota para visualizar informações de um produto específico
productRouter.get('/single/:id', singleProduct)

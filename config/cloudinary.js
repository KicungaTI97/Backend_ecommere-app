// Importa a biblioteca `cloudinary` e a desestrutura para pegar a versão `v2`,
import {v2 as cloudinary} from 'cloudinary'

// Exporta uma função assíncrona chamada `connectCloudinary`, que será usada para configurar a conexão com o serviço Cloudinary.
export const connectCloudinary = async () => {

    // Configura as credenciais do Cloudinary usando a função `config`.
    cloudinary.config({

        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    })
}
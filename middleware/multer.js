// Importa a biblioteca multer, que é utilizada para lidar com o upload de arquivos em aplicações Node.js.
import multer from "multer";

// Configurando o armazenamento dos arquivos localmente, com uso do método `diskStorage` de multer.
const storage = multer.diskStorage({
 
    // Define o nome do arquivo que será salvo no disco.
    filename: function (req, file, callback) {
        // Adiciona um timestamp ao nome original do arquivo para evitar conflitos
        callback(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '-')}`);
    }
});

const fileFilter = (req, file, callback) =>{
    // Define os tipos de arquivos permitidos (imagem)
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    // Verifica se o tipo de arquivo é permitido (imagem) e executa o callback com o resultado
    if(allowedMimeTypes.includes(file.mimetype)){
        callback(null, true);
    } else{
        callback(new Error("Tipo de arquivo não suportado. Use apenas PNG, JPG ou JPEG."), false);
    }
}
// Configurações de upload
export const upload = multer({

    storage,
    // Configurações de upload
    limits: {
        fileSize: 1024 * 1024 * 5 // 5MB
    },

    fileFilter

})
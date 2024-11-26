
//Função para adicionar produto
const addProduct = async (req, res) => {
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);
    try{
        const {
            name, 
            description, 
            price, 
            category, 
            subCategory, 
            sizes, 
            bestseller
        } = req.body;

          // Verifica se os campos obrigatórios estão presentes e mostrar qual campo está ausente
          if (!name || !description || !price || !category || !subCategory || !sizes || !bestseller) {
            return res.status(400).json({
                success: false,
                message: 'Todos os campos obrigatórios devem ser preenchidos.'
            });
        }
             // Verifica se os arquivos foram enviados
             if (!req.files) {
                return res.status(400).json({
                    success: false,
                    message: 'Nenhum arquivo foi enviado'
                });
            }
        
    
         // Extrai os arquivos enviados no formulário (imagens do produto).
            // O `req.files` contém os arquivos enviados através de um middleware como `multer`.
            const image1 = req.files.image1 ? req.files.image1[0] : null;
            const image2 = req.files.image2 ? req.files.image2[0] : null;
            const image3 = req.files.image3 ? req.files.image3[0] : null;
            const image4 = req.files.image4 ? req.files.image4[0] : null;
            
        // verificar se pelo menos uma imagem foi enviada
        if(!image1 && !image2 && !image3 && !image4){
            return res.status(400).json({
                success: false,
                message: 'Pelo menos uma imagem deve ser enviada'
            })
        }

        console.log('Campos extraídos:', {
            name, 
            description, 
            price, 
            category, 
            subCategory, 
            sizes, 
            bestseller
        });
        console.log('Imagens recebidas:', { image1, image2, image3, image4 });

           
    
        res.json(
            {
                success: true,
                message: 'Produto adicionado com sucesso',
                data: req.body
            }
        )

    } catch(error){
        console.error('Erro ao adicionar produto',error)
        res.status(500).json({
            success: false,
            message: 'Erro ao adicionar produto',
            error: error.message
        })
    }
}

//Função para listar produtos
const listProducts = async (req, res) => {

}

//Função para deletar produto
const removeProduct = async (req, res) => {

}

//Função para informacões de produto único
const singleProduct = async (req, res) => {

}

export {
    addProduct,
    listProducts,
    removeProduct,
    singleProduct,
}
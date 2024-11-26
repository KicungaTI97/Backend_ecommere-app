import validator from "validator";
import bcrypt from "bcrypt"
import { userModel } from "../models/userModel.js";
import jwt from 'jsonwebtoken'

const createToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, 
        { 
            expiresIn: '1h' 
        })
}
//Rota para login do usuario
const loginUser = async (req, res) =>{
    try{

        const { email, password } = req.body; //req.body: Contém os dados enviados pelo cliente no formato JSON

        // Verificar se o email já está cadastrado
        const user = await userModel.findOne({ email });
        
        // se o ususuário não existe, retornar uma mensagem de erro
        if(!user) return res.status(400).json(
            { 
                success: false, 
                message: 'Usrio não encontrado!' 
            });
        
        // Verificar se a senha está correta
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        
        if(!isPasswordCorrect) return res.status(400).json({ success: false, message: 'Senha incorreta!' });

        // Se o login for bem sucedido, gerar um token
        const token = createToken(user._id);

        // Retornar o token para o cliente
        res.status(200).json(
            { 
                success: true, 
                message: 'Login bem sucedido!', 
                token 
            });
        // Se o login for mal sucedido, retornar uma mensagem de erro
        res.status(400).json(
            { 
                success: false, 
                message: 'Credenciais inválidas!' 
            });

    } catch(error){
        return res.status(500).json(
            {
                success:false, 
                message: 'Erro ao fazer login!' 
            });
    }
}

//Rota para registrar usuario
const registerUser = async (req, res) =>{
    try{
        // Validar dados do formulário
        const { name, email, password } = req.body;


        // Verificar se o email já está cadastrado
        const existingUser = await userModel.findOne(
            { 
                email
             });
        if(existingUser) return res.status(400).json(
            {
                success:false, 
                message: 'Email já existe!' 
            });

        // Validar o formato email e uma senha forte usando o validator
        if(!validator.isEmail(email)) return res.status(400).json({ success:false, message: 'Email invalido!' });

        if(!validator.isStrongPassword(
            password, 
            { 
                minLength: 8, 
                minUppercase: 1, 
                minLowercase: 1, 
                minNumbers: 1, 
                minSymbols: 1 
            })) 
            return res.status(400).json(
                { 
                    success: false, 
                    message: 'Porfavor, introduz uma senha forte!' 
                });

        // Validar se o nome não é vazio
        if(!name) return res.status(400).json(
            { 
                success: false, 
                message: 'Porfavor, introduz o nome!' 
            });

        // Validar se a senha não é vazia
        if(!password) 
            return res.status(400).json(
        { 
            success: false, 
            message: 'Porfavor, introduz a senha!' 
        });

        // Criptografar a senha do usuário
        const hashedPassword = await bcrypt.hash(password, 10);

        // Criar um novo usuário
        const newUser = new userModel({
            name, 
            email, 
            password: hashedPassword
         });

        // Salvar o novo usuário no MongoDB
        const user = await newUser.save();

        // Verificar se o usuário foi criado com sucesso
        if(!user) return res.status(400).json(
            { 
                success: false, 
                message: 'Não foi possível criar o usuário!' 
            });

        // Comparar a senha fornecida com a senha armazenada
        const isMatched = await bcrypt.compare(password, user.password);

        // Verificar se a senha está correta
        if(isMatched){
            // Gerar um token de autenticação
            const token = createToken(user._id);
            
            // Retornar o token e os dados do usuário
            res.status(201).json(
                {
                    success:true, 
                    message: token 
                });
        } else{
            // Caso a senha não seja correta, retornar a mensagem de erro
            res.status(400).json(
                { 
                    success: false, 
                    message: 'Senha incorreta!' 
                });
        }

    } catch(error){
        console.log(error)
        // Caso haja algum erro, retornar a mensagem de erro
        res.status(500).json(
            { 
                success: false, 
                message: error.message 
            });
    }
} 

//Rota para login do administrador
const loginAdmin = async (req, res) =>{

}

export {
    loginUser, 
    registerUser, 
    loginAdmin
}

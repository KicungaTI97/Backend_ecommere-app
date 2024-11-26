import express from 'express'
import { loginAdmin,loginUser,registerUser } from '../controllers/userControllers.js'

export const userRoute = express.Router();

userRoute.post('/register', registerUser)
userRoute.post('/login', loginUser)
userRoute.post('/login/admin', loginAdmin)

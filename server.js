import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { connectDB } from './config/mongodb.js'
import { connectCloudinary } from './config/cloudinary.js'
import { userRoute } from './routes/userRoute.js'
import { productRouter } from './routes/productRoute.js'

//App config
const app = express()
const port = process.env.PORT || 3000 

// Connect to MongoDB
connectDB() 
// Connect to Cloudinary
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())


// API endpoints
app.use('/api/user', userRoute)
app.use('/api/product', productRouter)

app.get('/', (req, res) =>{
    res.send('API Working')
})
app.listen(port, () => console.log('Server start on PORT: '+ port))
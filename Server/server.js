import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDb from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js';
import cors from "cors";
//configure env
dotenv.config();


//database config 
connectDb();

// rest obj
const app= express();



//middleware
app.use(cors());
app.use(express.json()); 
app.use(morgan('dev'));


//routes
app.use("/api/v1/auth",authRoutes);

app.use("/api/v1/category",categoryRoutes);
app.use('/api/v1/product',productRoutes)

//rest api
app.get('/',(req,res)=>{
    res.send({
        message:'welcome to ecommerce app'
    })
})


// PORT
const PORT = process.env.PORT || 8080;


app.listen(PORT,()=>{
    console.log(` Server running on ${PORT}`.bgCyan.white);
});
require('dotenv').config()
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000
const app  = express()
const authRouter = require('./routes/auth/auth-routes')
const  shopOrderRouter = require('./conroller/shop/order-routes')
const mongodbConn = process.env.MONGODBCONSECRET
mongoose.connect(mongodbConn)
.then(()=>console.log('Successfuly Connected to Cloud MongoDB')).catch(err=>console.error('Could not connect to Cloud MongoDB', err));


app.use(
    cors({
        origin: 'https://get78store.onrender.com',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization','Cache-Control','expires','pragma'],
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
// app.use('/api/shop/address', shopAdressRouter )
app.use('/api/shop/order', shopOrderRouter )
app.listen(PORT, ()=>console.log('Server is running on port', PORT))
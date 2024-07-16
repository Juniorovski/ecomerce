const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(cors({credentials:true,origin:`*`}));

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

const userRouter = require('./routers/userRouter');
app.use('/users',userRouter);

const produtoRouter = require('./routers/produtoRouter');
app.use('/produto', produtoRouter);

const categoriaRouter = require('./routers/categoriaRouter');
app.use('/categoria',categoriaRouter);

app.get('/',(req,res)=>{
    res.send('Hello, world!')})

app.listen(5001,(req,res)=>{
    console.log('Servidor online!');
});


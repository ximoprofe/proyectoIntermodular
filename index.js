'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.Promise = global.Promise;
const Product = require('./models/product')
const app = express()
const port = process.env.PORT || 3000
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/book',(req,res)=>{
  //res.send({message:`Hola ${req.params.name}`})
  res.send(200, {products:[]})
  res.end()
})


//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
//https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest
//curl -s -o /dev/null -w "%{http_code}" "Content-Type: applicatz","password":"xyz"}' http://localhost:3000/api/product
app.post('/api/product',(req,res)=>{
  //res.status(200).send({message: 'POST /api/prdocut'})
  console.log(req.body)
  let p = new Product(req.body)
  //p.name = req.body.name   
  //p.picture= req.body.picture
  //p.price= req.body.price
  //product.category= req.body.category
  //product.description= req.body.description

  console.log(p)
  p.save(function (err, productStored){
    if(err) res.status(500).send({message:'error al guardar en bd'})
    res.status(200).send({producto: productStored})
  }) 
})

app.get('/api/product/:productId',(req,res)=>{
  let productId = req.params.productId
  console.log("productID " + productId)
  Product.findById(productId, (err, product)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
    if (!product) return res.status(404).send({message:'el producto no existe'})
    //res.status(200).send({product: product})
    res.status(200).send({product: product})
  })
})

app.get('/api/product',(req,res)=>{
  Product.find({}, (err, products)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
    if (!products) return res.status(404).send({message:'el producto no existe'})
    res.status(200).send({products})
  })
  //res.send({message:`Hola ${req.params.name}`})
  //res.end()
})

app.delete('/api/product/:productId',(req,res)=>{
  let productId = req.params.productId
  Product.findById(productId, (err, product)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
   if(product){  
     product.remove((err)=>{
      if (err) return res.status(500).send({message:'error al realizar la peticion'})
      res.status(200).send({message:'el producto ha sido borrado'})
     }) 
   }else{
      res.status(500).send({message: 'El producto no existe en la BD'}) 
   }
   res.end()
  })
})

app.put('/api/product/:productId',(req,res)=>{
   let productId = req.params.productId
   let update = req.body
   Product.findByIdAndUpdate(productId, update, (err, productUpdated)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
    res.status(200).send({product: productUpdated})
   })
})


mongoose.connect('mongodb://localhost:27017/shop',(err)=>{
  if(err) throw err
  console.log('Conectado a mongod')
  
  //Levantar puerto 
  app.listen(3000,()=>{
    console.log("api rest ")
  })
})

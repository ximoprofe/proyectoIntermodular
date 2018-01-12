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
app.get('/api/product',(req,res)=>{
  //res.send({message:`Hola ${req.params.name}`})
  res.send(200, {products:[]})
  res.end()
})
app.get('/api/product/:productId',(req,res)=>{
  //res.send({message:`Hola ${req.params.name}`})
  res.end()
})
//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
//https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest
//curl -s -o /dev/null -w "%{http_code}" "Content-Type: applicatz","password":"xyz"}' http://localhost:3000/api/product
app.post('/api/product',(req,res)=>{
  //res.status(200).send({message: 'POST /api/prdocut'})
  console.log(req.body)
  let product = new Product()
  product.name = req.body.name   
  product.picture= req.body.picture
  product.price= req.body.price
  product.category= req.body.category
  product.description= req.body.description
 
  product.save(function (err, productStored){
    if(err) res.status(500).send({message:'error al guardar en bd'})
    //res.status(200).send({product: productStored})
    //res.end()
  }) 
})
app.put('/api/product/:productId',(req,res)=>{
  //res.send({message:`Hola ${req.params.name}`})
  res.end()
})
app.delete('/api/product/:productId',(req,res)=>{
  //res.send({message:`Hola ${req.params.name}`})
  res.end()
})

mongoose.connect('mongodb://localhost:27017/shop',(err)=>{
  if(err) throw err
  console.log('Conectado a mongod')
  
  //Levantar puerto 
  app.listen(3000,()=>{
    console.log("api rest ")
  })
})

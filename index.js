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

//curl -H "Content-Type: application/json" -X POST -d '{"username":"xyz","password":"xyz"}' http://localhost:3000/api/login
//https://stackoverflow.com/questions/7172784/how-to-post-json-data-with-curl-from-terminal-commandline-to-test-spring-rest
//curl -s -o /dev/null -w "%{http_code}" "Content-Type: applicatz","password":"xyz"}' http://localhost:3000/api/product
app.post('/api/user',(req,res)=>{
  let u= new Shop()
  u.name = req.body.name   
  u.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('User inserted!');
    }
  });

})
app.post('/api/shop',(req,res)=>{
  let s= new Shop()
  s.name = req.body.name   
  s.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Shop inserted!');
    }
  });
}

})
app.post('/api/product',(req,res)=>{})
  let p = new Product()
  console.log(req.body.name)
  p.name = req.body.name   
  p.save(function (err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Product inserted!');
    }
  });
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

app.get('/api/user/:userId',(req,res)=>{
  let userId = req.params.userId
  console.log("productID " + userId)
  User.findById(userId, (err, user)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
    if (!user) return res.status(404).send({message:'el useer no existe'})
    //res.status(200).send({product: product})
    res.status(200).send({user: user})
  })
})

app.get('/api/shop/:shopId',(req,res)=>{
  let shopId = req.params.shopId
  console.log("shopId" + shopId)
  Shop.findById(shopId, (err, shop)=>{
    if (err) return res.status(500).send({message:'error al realizar la peticion'})
    if (!shop) return res.status(404).send({message:'el shop no existe'})
    //res.status(200).send({product: product})
    res.status(200).send({user: user})
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


mongoose.connect('mongodb://localhost:27017/shop', { useMongoClient: true },(err)=>{
  if(err) throw err
  console.log('Conectado a mongod')
  //Levantar puerto 
  app.listen(3000,()=>{
    console.log("api rest ")
  })
})

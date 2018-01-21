'use strict'
const mongoose = require('mongoose')
const app = require('./app')
const port = process.env.PORT || 3000
mongoose.connect('mongodb://localhost:27017/shop', { useMongoClient: true },(err)=>{
  if(err) throw err
  console.log('Conectado a mongod')
  //Levantar puerto 
  app.listen(3000,()=>{
    console.log("Levantada API Rest en el puerto 3000")
  })
})

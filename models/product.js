'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = Schema({
  name: String, 
<<<<<<< HEAD
  picture: String, 
  price: Number
  //category: {type: String, enum: ['', 'b', 'c']}, 
  //description: String
=======
  //picture: String, 
  //price: Number,
  //category: {type: String, enum: ['a', 'b', 'c']}, 
  ////////////////description: String
>>>>>>> f2cb89f0abbbb9dac59d2a86836b07668bbb2ccf
})
module.exports = mongoose.model('Product', ProductSchema)

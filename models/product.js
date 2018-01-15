'use strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ProductSchema = Schema({
  name: String, 
  //picture: String, 
  //price: Number,
  //category: {type: String, enum: ['a', 'b', 'c']}, 
  ////////////////description: String
})
//ERROR mongoose.model('Product', ProductSchema)
module.exports = mongoose.model('Product', ProductSchema)

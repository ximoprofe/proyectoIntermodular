'use strict'
const Product = require('../models/product')
function getProduct(id){}
function getProducts(req, res){
  Product.find({}, (err, products)=>{
    if (err) return res.status(500).send({message:'Error al intentar ejecutar la peticion'})
    if (!products) return res.status(404).send({message:'No existen productos'})
    res.status(200).send({products})
  })
}
function updateProduct(id){}
function deleteProduct(id){}
function saveProduct(){}
module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}


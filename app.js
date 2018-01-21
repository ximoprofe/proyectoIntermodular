'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.env.PORT || 3000
const productCtrl = require('./controllers/product')
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/api/product', productCtrl.getProducts)
app.get('/api/product/:productId', productCtrl.getProduct)
app.post('/api/product', productCtrl.saveProduct)
app.put('/api/product/:productId', productCtrl.updateProduct)
app.delete('/api/product/:productId', productCtrl.deleteProduct)

module.exports = app

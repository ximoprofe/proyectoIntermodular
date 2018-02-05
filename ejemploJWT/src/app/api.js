const dotenv = require('dotenv').config({path: './src/.env'});
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/testjwt', () => {
  console.log('\nMongoDB successfully connected.');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Connect API routes to "/api" prefix
const routes = require('./routes');
app.use('/api', routes);

app.listen('3000', () => {
  console.log('\nServer running on http://localhost:%d', 3000);
});

//BASE DE DATOS testjwt
//curl localhost:3000/api/auth
//{"message":"Send a POST request here with user credentials to authenticate."}
//Autorizarse: 
//curl -H "Content-Type: application/json" -X POST -d '{"email":"test@test.com","password":"xyz"}' http://localhost:3000/api/auth
//Crear usuario: 
//http://localhost:3030/api/users/
//curl -H "Content-Type: application/json" -X POST -d '{"email":"test@test.com","password":"xyz"}' http://localhost:3000/api/users/
//GET USUARIO:
//curl http://localhost:3000/api/users/5a780e6104210d98e6d87ce1
//{"message":"You need to provide a token to access this resource."}
//------------> ¡¡¡ TE PIDE EL TOKEN !!!
// ¿Cómo COGEMOS el token? ¿Donde lo tenemos?
//curl -H "Content-Type: application/json" -X POST -d '{"email":"test@test.com","password":"xyz"}' http://localhost:3000/api/auth
//Y me devuelve el token: 
//--------------> LO COPIO
//{"message":"JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwic2VsZWN0ZWQiOnt9LCJnZXR0ZXJzIjp7fSwid2FzUG9wdWxhdGVkIjpmYWxzZSwiYWN0aXZlUGF0aHMiOnsicGF0aHMiOnsicGFzc3dvcmQiOiJpbml0IiwiZW1haWwiOiJpbml0IiwiX192IjoiaW5pdCIsIl9pZCI6ImluaXQifSwic3RhdGVzIjp7Imlnbm9yZSI6e30sImRlZmF1bHQiOnt9LCJpbml0Ijp7Il9fdiI6dHJ1ZSwicGFzc3dvcmQiOnRydWUsImVtYWlsIjp0cnVlLCJfaWQiOnRydWV9LCJtb2RpZnkiOnt9LCJyZXF1aXJlIjp7fX0sInN0YXRlTmFtZXMiOlsicmVxdWlyZSIsIm1vZGlmeSIsImluaXQiLCJkZWZhdWx0IiwiaWdub3JlIl19LCJlbWl0dGVyIjp7ImRvbWFpbiI6bnVsbCwiX2V2ZW50cyI6e30sIl9ldmVudHNDb3VudCI6MCwiX21heExpc3RlbmVycyI6MH19LCJpc05ldyI6ZmFsc2UsIl9kb2MiOnsiX192IjowLCJwYXNzd29yZCI6IiQyYSQxMCRsTi5LTEhlWHVQVHdoVzdpaUVCVjkubXZlTUg1MXZUTlBydzhEYnBJWFJGMnVZS0lVUGcvLiIsImVtYWlsIjoidGVzdEB0ZXN0LmNvbSIsIl9pZCI6IjVhNzgwZTYxMDQyMTBkOThlNmQ4N2NlMSJ9LCIkaW5pdCI6dHJ1ZSwiaWF0IjoxNTE3ODE3NzM3LCJleHAiOjE1MTc4Mjc4MTd9.nxxjW8k8XC5bE7gKdYC3lIfVteEPFE1qQ6o5YJz7uJk"}
//---Enviaremos entonces la petición esta: curl http://localhost:3000/api/users/5a780e6104210d98e6d87ce1 con el TOKEN
//
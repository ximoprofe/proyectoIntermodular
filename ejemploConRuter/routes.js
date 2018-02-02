const routes = require('express').Router();

// http://localhost:3030/api
routes.get('/', (req, res) => {
    res.send('api');
});
// http://localhost:3030/api/auth
const authUser = require('../auth').authUser;
routes
    .get('/auth', (req, res) => {
        res.json({ message: 'Send a POST request here with user credentials to authenticate.' });
    })
    .post('/auth', authUser);

// http://localhost:3030/api/users and nested routes
const userRoutes = require('../objects/user/user.routes');
routes.use('/users', userRoutes);

module.exports = routes;

/*
 * @file Defines the user routes and connects them with the appropriate controller.
 * @author John Char <yannosx@gmail.com> 
 */

// Dependencies
    const userRoutes = require('express').Router();
    const isAuth = require('../../auth').isAuth;
    const userController = require('./user.controller');
// =============

// Connecting user routes to user controllers
userRoutes
    .post('/', userController.createUser)                  // creates a new user
    .get('/:id', isAuth, userController.getSingleUser)     // returns a single user
    .get('/', isAuth, userController.getAllUsers)          // returns all users
    .put('/:id', isAuth, userController.updateUser)        // updates a single user
    .delete('/:id', isAuth, userController.deleteUser);    // deletes a signle user
// ==========================================

module.exports = userRoutes;

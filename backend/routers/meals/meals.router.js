const express = require("express");
const  mealsController  = require('./meals.controller')
const mealsRouter = express.Router();

mealsRouter.get('/', mealsController.getAllData);

mealsRouter.post('/create', mealsController.postData);

module.exports = mealsRouter;

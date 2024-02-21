const express = require("express");
const orderControleer = require('./orders.controller')
const orderRouter = express.Router();

orderRouter.post('/email', orderControleer.fetchOrderByEmail);
orderRouter.post('/create', orderControleer.postOrder);

module.exports = orderRouter;

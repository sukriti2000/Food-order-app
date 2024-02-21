const express = require('express')
const userRouter = express.Router();
const userController = require('./user.controller')

userRouter.post('/login',userController.LoginUser)
userRouter.post('/register',userController.ResgisterUser)

module.exports=userRouter
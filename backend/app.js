const express = require("express");
const app = express();
require("dotenv").config();
const path = require("path");
//extra security packages
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimiter = require("express-rate-limit");
const authentication = require("./middleware/authentication");

//general setting for front-end
app.use(express.static("public"));
app.use(express.json()); //middleware for json body parsing

//importing routers
const mealsRouter = require("./routers/meals/meals.router");
const orderRouter = require("./routers/orders/orders.router");
const userRouter = require("./routers/user/user.router");

console.log("server initialized");
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

//setting limits to send request for any hacking or span just for security
app.set("trust proxy", 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, //15 mins
    max: 100, //limit each Ip to 100 request per windowMS
  })
);
//security modules
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("Welcome to the Food Order App"); // You can modify this response as needed
});

//assiging routers
app.use("/meals", authentication, mealsRouter);
app.use("/orders", authentication, orderRouter);
app.use("/auth", userRouter);
app.use("/*", (req, res) => {
  res.redirect("/meals/");
});

module.exports = app;
